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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/user.entity");
const users_service_1 = require("./users/users.service");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const category_entity_1 = require("./categories/category.entity");
const products_module_1 = require("./products/products.module");
const product_entity_1 = require("./products/product.entity");
const revoked_token_entity_1 = require("./auth/entities/revoked-token.entity");
const orders_module_1 = require("./orders/orders.module");
const order_entity_1 = require("./orders/order.entity");
const bcrypt = __importStar(require("bcryptjs"));
let AppModule = class AppModule {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async onModuleInit() {
        const adminPassword = 'Admin@123';
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        await this.usersService.ensureAdminSeed({
            name: 'Administrador',
            email: 'admin@catalogo.local',
            passwordHash,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASS || 'root',
                database: process.env.DB_NAME || 'api_catalogo',
                entities: [user_entity_1.User, category_entity_1.Category, product_entity_1.Product, revoked_token_entity_1.RevokedToken, order_entity_1.Order, order_entity_1.OrderItem],
                synchronize: true,
                logging: false,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AppModule);
//# sourceMappingURL=app.module.js.map