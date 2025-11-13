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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const category_entity_1 = require("../categories/category.entity");
let ProductsService = class ProductsService {
    productRepository;
    categoryRepository;
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(params) {
        const category = await this.categoryRepository.findOne({ where: { id: params.categoryId } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        const entity = this.productRepository.create({
            name: params.name,
            price: params.price,
            description: params.description,
            imageUrl: params.imageUrl ?? '/placeholder.svg',
            imageBase64: params.imageBase64,
            category,
            featured: params.featured ?? false,
            published: params.published ?? false,
        });
        return await this.productRepository.save(entity);
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findOne(id) {
        const found = await this.productRepository.findOne({ where: { id } });
        if (!found)
            throw new common_1.NotFoundException('Produto não encontrado');
        return found;
    }
    async update(id, params) {
        const product = await this.findOne(id);
        if (typeof params.name === 'string')
            product.name = params.name;
        if (typeof params.price === 'number')
            product.price = params.price;
        if (typeof params.description === 'string')
            product.description = params.description;
        if (typeof params.imageUrl === 'string')
            product.imageUrl = params.imageUrl;
        if (typeof params.imageBase64 === 'string')
            product.imageBase64 = params.imageBase64;
        if (typeof params.featured === 'boolean')
            product.featured = params.featured;
        if (typeof params.published === 'boolean')
            product.published = params.published;
        if (params.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: params.categoryId } });
            if (!category)
                throw new common_1.NotFoundException('Categoria não encontrada');
            product.category = category;
        }
        return await this.productRepository.save(product);
    }
    async remove(id) {
        const result = await this.productRepository.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Produto não encontrado');
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map