import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { updateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Product from "./products.entity";
import UploadedRemvover from "src/utils/uploadedRemover";
import ApiResponse from "src/helpers/ApiResponse";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>
    ) { }

    public async createProduct(params: any, images: string[]) {
        const product = await this.repo.save({ ...params, images });
        return ApiResponse(`Product ${params?.title} has been added`, product)
    }
    public getOne(id: number) {
        const product = this.repo.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product not found with id ${id}`);
        return ApiResponse('Product finded', {
            product
        });

    }

    public async getAll(
        query: {
            search?: string;
            category?: string;
            minPrice?: number;
            maxPrice?: number;
            sortBy?: string;
            order?: 'ASC' | 'DESC';
            selectFields?: string;
            joins?: string;
            page?: number;
            limit?: number;
        }
    ) {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            sortBy = 'createdAt',
            order = 'DESC',
            selectFields,
            joins = '',
            page,
            limit
        } = query;

        const qb = this.repo.createQueryBuilder('product');

        // SEARCH
        if (search) {
            const fields = ['title', 'description'];
            const query = fields.map((field) => `LOWER(product.${field}) LIKE LOWER(:search)`).join(" OR ");
            qb.andWhere(query, {
                search: `%${search}%`
            })
        }

        // FILTER BY CATEGORY
        if (category) {
            qb.leftJoinAndSelect('product.category', 'category')
            qb.andWhere('category.id = :id', {
                id: category,
            });
        }
        if (joins) {
            const joinCols = joins.split(',');
            joinCols.forEach(col => {
                qb.leftJoinAndSelect(`product.${col}`, col)
            })
        }

        // FILTER BY PRICE RANGE
        if (minPrice !== undefined) {
            qb.andWhere('product.price >= :minPrice', {
                minPrice,
            });
        }

        if (maxPrice !== undefined) {
            qb.andWhere('product.price <= :maxPrice', {
                maxPrice,
            });
        }
        if (selectFields) {
            const selected = selectFields.split(',');
            qb.select(selected.map((field) => `product.${field}`))
        }

        // pagination
        if (page) qb.skip((+page - 1) * (limit || 10))
        if (limit) qb.take(limit)


        // SORTING
        qb.orderBy(`product.${sortBy}`, order);

        const products = await qb.getMany();

        return ApiResponse(`Products retrieved successfully`, {
            total: products.length,
            products,
        })
    }
    public async delete(id: number) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        product.images.forEach(image => {
            UploadedRemvover('products', image)
        })
        this.repo.delete(id);
        return ApiResponse(`Product ${product.title} has been deleted successfully`);

    }
    public async updateOne(id: number, data: updateProductDto) {
        const product = await this.repo.findOne({ where: { id } })
        if (!product) throw new BadRequestException(`Product not found by this id ${id}`);
        Object.keys(data).forEach((field) => {
            product[field] = data[field]
        })
        this.repo.save(product)
        return ApiResponse("Product updated successfully", { product })
    }
    public getNameOfUserinProducts() {
        // const products = this.getAll(undefined);
        // const users = this.usersService.getAllUsers();
        // const productsWithUserName = products.map((product) => {
        //     const user = users.find((u) => u.id === product.userId);
        //     return {
        //         ...product,
        //         userName: user ? user.name : "Unknown User"
        //     }
        // })
        // if (productsWithUserName.length === 0) throw new NotFoundException("No products found");
        return [];
    }
}