import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RevokedTokensService } from './revoked-tokens.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService, private readonly revokedTokensService: RevokedTokensService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'change-me-in-production',
    });
  }

  async validate(payload: { sub: string; jti?: string; email?: string }): Promise<User | null> {
    if (payload.jti) {
      const revoked = await this.revokedTokensService.isRevoked(payload.jti);
      if (revoked) throw new UnauthorizedException('Token revogado');
    }
    const user = await this.usersService.findByEmail((payload as any).email);
    return user ?? null;
  }
}


