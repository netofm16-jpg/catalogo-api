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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const product_entity_1 = require("../products/product.entity");
const user_entity_1 = require("../users/user.entity");
let OrdersService = class OrdersService {
    orderRepo;
    itemRepo;
    productRepo;
    userRepo;
    constructor(orderRepo, itemRepo, productRepo, userRepo) {
        this.orderRepo = orderRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }
    async create(params) {
        const user = await this.userRepo.findOne({ where: { id: params.userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const products = await this.productRepo.findBy(params.items.map((i) => ({ id: i.productId })));
        const productMap = new Map(products.map((p) => [p.id, p]));
        const items = [];
        let total = 0;
        for (const input of params.items) {
            const product = productMap.get(input.productId);
            if (!product)
                throw new common_1.NotFoundException(`Produto não encontrado: ${input.productId}`);
            const unitPrice = product.price;
            const item = this.itemRepo.create({ product, quantity: input.quantity, unitPrice });
            total += unitPrice * input.quantity;
            items.push(item);
        }
        const order = this.orderRepo.create({ user, items, total, paymentMethod: params.paymentMethod, status: 'paid' });
        return await this.orderRepo.save(order);
    }
    async findMy(userId) {
        return await this.orderRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
    }
    async findMyById(userId, orderId) {
        const order = await this.orderRepo.findOne({ where: { id: orderId, user: { id: userId } } });
        if (!order)
            throw new common_1.NotFoundException('Pedido não encontrado');
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map