import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import CreateCategoryDto from "./dto/createCategory.dro";
import { UploadFileInterceptor } from "src/common/interceptors/upload.interceptor";
import SubCategoryService from "./subCategory.service";


@Controller('/api/subCategories')
class SubCategoryController {
    constructor(
        private readonly service: SubCategoryService
    ) { }

    @Get()
    public getAllCategories() {
        return this.service.getAll();
    }

    @Post()
    @UseInterceptors(UploadFileInterceptor('/categories'))
    public createCategory(@Body(new ValidationPipe()) body: CreateCategoryDto, @UploadedFile() image: Express.Multer.File) {
        return this.service.createOne(body, image?.filename)
    }

    @Delete('/:id')
    public deleteCategory(@Param("id", ParseIntPipe) id: number) {
        return this.service.deleteOne(id)
    }

    @Put('/:id')
    @UseInterceptors(UploadFileInterceptor('/subCategories'))
    public updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.service.updateOne(id, body, file?.filename);
    }

}
export default SubCategoryController;