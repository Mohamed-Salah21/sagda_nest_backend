import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Category from "./category.entity";
import { Repository } from "typeorm";
import CreateCategoryDto from "./dto/createCategory.dro";
import UploadedRemvover from "src/utils/uploadedRemover";
import ApiResponse from "src/helpers/ApiResponse";


@Injectable()
class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly repo: Repository<Category>
    ) { }
    public async getAll() {
        const categories = await this.repo.find();
        return ApiResponse("categories retrived successfully", { categories });

    }

    public async createOne(body: CreateCategoryDto, imageUrl: string | undefined) {
        const category = await this.repo.findOne({ where: { name: body.name } })
        if (category) throw new ConflictException('Category with this name already exists');
        const newCategory = await this.repo.save({ ...body, image: imageUrl });
        return ApiResponse("category created successfully", { category: newCategory });

    }


    public async deleteOne(id: number) {
        const category = await this.repo.findOne({ where: { id } })
        if (!category) throw new NotFoundException(`Category not found`)
        UploadedRemvover('categories', category.image)
        this.repo.delete(category.id);
        return ApiResponse(`Category ${category.name} deleted successfully`);

    }

    async updateOne(
        id: number,
        body: any,
        newFileName?: string,
    ) {
        const category = await this.repo.findOne({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        if (category.image && newFileName) {
            UploadedRemvover('categories', category.image)
        }

        await this.repo.update(category.id, {
            ...body,
            ...(newFileName && { image: newFileName }),
        });

        return ApiResponse("updated successfully", { category });

    }


}
export default CategoryService;
