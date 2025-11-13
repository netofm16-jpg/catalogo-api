import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevokedToken } from './entities/revoked-token.entity';

@Injectable()
export class RevokedTokensService {
  constructor(
    @InjectRepository(RevokedToken)
    private readonly revokedRepo: Repository<RevokedToken>,
  ) {}

  async revoke(jti: string, expiresAt: Date): Promise<void> {
    const exists = await this.revokedRepo.findOne({ where: { jti } });
    if (!exists) {
      const entity = this.revokedRepo.create({ jti, expiresAt });
      await this.revokedRepo.save(entity);
    }
  }

  async isRevoked(jti: string): Promise<boolean> {
    const found = await this.revokedRepo.findOne({ where: { jti } });
    if (!found) return false;
    return found.expiresAt.getTime() > Date.now();
  }

  async purgeExpired(): Promise<void> {
    await this.revokedRepo.createQueryBuilder()
      .delete()
      .from(RevokedToken)
      .where('"expiresAt" < NOW()')
      .execute();
  }
}


