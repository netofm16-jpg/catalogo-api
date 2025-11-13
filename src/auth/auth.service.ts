import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';
import { RevokedTokensService } from './revoked-tokens.service';
import { randomUUID } from 'crypto';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly revokedTokensService: RevokedTokensService,
  ) {}

  async register(params: { name: string; email: string; password: string }): Promise<{ id: string; name: string; email: string; role: UserRole }>
  {
    const { name, email, password } = params;
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('E-mail já está em uso');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({ name, email, passwordHash });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isMatch = await bcrypt.compare(password, (user as any).passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async login(user: User): Promise<{ access_token: string }>
  {
    const jti = randomUUID();
    const payload: JwtPayload & { jti: string } = { sub: user.id, email: user.email, role: user.role, jti };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async logout(token: string): Promise<void> {
    const decoded = this.jwtService.decode(token) as (JwtPayload & { jti?: string; exp?: number }) | null;
    if (!decoded || !decoded.jti || !decoded.exp) return;
    const expiresAt = new Date(decoded.exp * 1000);
    await this.revokedTokensService.revoke(decoded.jti, expiresAt);
  }
}


