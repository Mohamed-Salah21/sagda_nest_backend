import { ParseIntPipe, Body, Param, Controller, Get, Post, ValidationPipe, Query, Delete, Put, UseGuards, Patch, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { updateProductDto } from "./dto/update-product.dto";
// import Roles from "src/common/decorators/roles.decorator";
// import { UserRoles } from "src/utils/enums";
// import AuthRolesGuard from "src/common/guards/authRole.guard";
import { UploadFilesInterceptor } from "src/common/interceptors/upload.interceptor";

@Controller("/api/products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    //GET  api/products
    @Get()
    public getProducts(@Query() query) {
        return this.productsService.getAll(query);
    }

    //POST  api/products 
    @Post()
    // @Roles(UserRoles.ADMIN)
    // @UseGuards(AuthRolesGuard)
    @UseInterceptors(UploadFilesInterceptor('/products'))
    public createProduct(
        @Body(new ValidationPipe()) body: CreateProductDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.productsService.createProduct(body, files.map(file => file.filename));
    }

    //GET  api/products/:id
    @Get("/:id")
    public getProductById(@Param("id", ParseIntPipe) id: number) {
        return this.productsService.getOne(id);
    }

    // DELETE  api/products/:id
    @Delete("/:id")
    // @Roles(UserRoles.ADMIN)
    // @UseGuards(AuthRolesGuard)
    public deleteProductById(@Param("id", ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }

    @Put("/:id")
    // @Roles(UserRoles.ADMIN)
    // @UseGuards(AuthRolesGuard)
    public updateById(@Param("id", ParseIntPipe) id: number, @Body(new ValidationPipe()) body: updateProductDto) {
        return this.productsService.updateOne(id, body);

    }

    @Get("/users/names")
    public getUsersNames() {
        return this.productsService.getNameOfUserinProducts();
    }
} 