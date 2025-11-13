import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string, withPassword = false): Promise<User | null> {
    if (withPassword) {
      return await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.passwordHash')
        .where('user.email = :email', { email })
        .getOne();
    }
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(params: {
    name: string;
    email: string;
    passwordHash: string;
    role?: UserRole;
  }): Promise<User> {
    const { name, email, passwordHash, role = UserRole.USER } = params;
    const entity = this.userRepository.create({ name, email, passwordHash, role });
    return await this.userRepository.save(entity);
  }

  async ensureAdminSeed(admin: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<void> {
    const existing = await this.findByEmail(admin.email, false);
    if (!existing) {
      await this.createUser({ ...admin, role: UserRole.ADMIN });
    }
  }
}


