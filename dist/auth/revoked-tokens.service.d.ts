import { Repository } from 'typeorm';
import { RevokedToken } from './entities/revoked-token.entity';
export declare class RevokedTokensService {
    private readonly revokedRepo;
    constructor(revokedRepo: Repository<RevokedToken>);
    revoke(jti: string, expiresAt: Date): Promise<void>;
    isRevoked(jti: string): Promise<boolean>;
    purgeExpired(): Promise<void>;
}
