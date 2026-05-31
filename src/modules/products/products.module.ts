import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './products.entity';
import UsersService from '../users/users.service';
import User from '../users/users.entity';
@Module({
    controllers: [ProductsController],
    providers: [ProductsService, UsersService],
    exports: [ProductsService],
    imports: [TypeOrmModule.forFeature([Product, User])]
})
class ProductModule {}
export default ProductModule;