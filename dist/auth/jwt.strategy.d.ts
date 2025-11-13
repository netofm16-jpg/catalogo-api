import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RevokedTokensService } from './revoked-tokens.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    private readonly revokedTokensService;
    constructor(usersService: UsersService, revokedTokensService: RevokedTokensService);
    validate(payload: {
        sub: string;
        jti?: string;
        email?: string;
    }): Promise<User | null>;
}
export {};
