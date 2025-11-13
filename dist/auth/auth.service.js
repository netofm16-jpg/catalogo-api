"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const users_service_1 = require("../users/users.service");
const revoked_tokens_service_1 = require("./revoked-tokens.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    usersService;
    jwtService;
    revokedTokensService;
    constructor(usersService, jwtService, revokedTokensService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.revokedTokensService = revokedTokensService;
    }
    async register(params) {
        const { name, email, password } = params;
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new common_1.ConflictException('E-mail já está em uso');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.usersService.createUser({ name, email, passwordHash });
        return { id: user.id, name: user.name, email: user.email, role: user.role };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email, true);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        return user;
    }
    async login(user) {
        const jti = (0, crypto_1.randomUUID)();
        const payload = { sub: user.id, email: user.email, role: user.role, jti };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
    async logout(token) {
        const decoded = this.jwtService.decode(token);
        if (!decoded || !decoded.jti || !decoded.exp)
            return;
        const expiresAt = new Date(decoded.exp * 1000);
        await this.revokedTokensService.revoke(decoded.jti, expiresAt);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        revoked_tokens_service_1.RevokedTokensService])
], AuthService);
//# sourceMappingURL=auth.service.js.map