import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';
import { RevokedTokensService } from './revoked-tokens.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly revokedTokensService;
    constructor(usersService: UsersService, jwtService: JwtService, revokedTokensService: RevokedTokensService);
    register(params: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        role: UserRole;
    }>;
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    logout(token: string): Promise<void>;
}
