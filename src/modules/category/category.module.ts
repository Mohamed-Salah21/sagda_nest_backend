import { Module } from "@nestjs/common";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Category from "./category.entity";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [],
    imports: [TypeOrmModule.forFeature([Category])],
})
export default class CategoryModule {}