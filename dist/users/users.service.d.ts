import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string, withPassword?: boolean): Promise<User | null>;
    createUser(params: {
        name: string;
        email: string;
        passwordHash: string;
        role?: UserRole;
    }): Promise<User>;
    ensureAdminSeed(admin: {
        name: string;
        email: string;
        passwordHash: string;
    }): Promise<void>;
}
