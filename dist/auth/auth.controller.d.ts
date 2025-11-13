import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../users/user.entity").UserRole;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<{
        loggedOut: boolean;
    }>;
}
