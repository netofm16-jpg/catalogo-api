"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokedTokensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const revoked_token_entity_1 = require("./entities/revoked-token.entity");
let RevokedTokensService = class RevokedTokensService {
    revokedRepo;
    constructor(revokedRepo) {
        this.revokedRepo = revokedRepo;
    }
    async revoke(jti, expiresAt) {
        const exists = await this.revokedRepo.findOne({ where: { jti } });
        if (!exists) {
            const entity = this.revokedRepo.create({ jti, expiresAt });
            await this.revokedRepo.save(entity);
        }
    }
    async isRevoked(jti) {
        const found = await this.revokedRepo.findOne({ where: { jti } });
        if (!found)
            return false;
        return found.expiresAt.getTime() > Date.now();
    }
    async purgeExpired() {
        await this.revokedRepo.createQueryBuilder()
            .delete()
            .from(revoked_token_entity_1.RevokedToken)
            .where('"expiresAt" < NOW()')
            .execute();
    }
};
exports.RevokedTokensService = RevokedTokensService;
exports.RevokedTokensService = RevokedTokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(revoked_token_entity_1.RevokedToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RevokedTokensService);
//# sourceMappingURL=revoked-tokens.service.js.map