import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UploadedRemvover from "src/utils/uploadedRemover";
import ApiResponse from "src/helpers/ApiResponse";
import SubCategory from "./subCategory.entity";
import CreateSubCategoryDto from "./dto/createCategory.dro";


@Injectable()
class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory) private readonly repo: Repository<SubCategory>
    ) { }
    public async getAll() {
        const subCategories = await this.repo.find();
        return ApiResponse("Sub Categories retrived successfully", { subCategories });

    }

    public async createOne(body: CreateSubCategoryDto, imageUrl: string | undefined) {
        const subCategory = await this.repo.findOne({ where: { name: body.name } })
        if (subCategory) throw new ConflictException('Category with this name already exists');
        const newSub = await this.repo.save({ ...body, image: imageUrl });
        return ApiResponse("category created successfully", { category: newSub });

    }


    public async deleteOne(id: number) {
        const subCategory = await this.repo.findOne({ where: { id } })
        if (!subCategory) throw new NotFoundException(`Sub Category not found`)
        UploadedRemvover('subCategories', subCategory.image)
        this.repo.delete(subCategory.id);
        return ApiResponse(`Sub Category ${subCategory.name} deleted successfully`);

    }

    async updateOne(
        id: number,
        body: any,
        newFileName?: string,
    ) {
        const subCategory = await this.repo.findOne({
            where: { id },
        });
        if (!subCategory) {
            throw new NotFoundException('Sub Category not found');
        }
        if (subCategory.image && newFileName) {
            UploadedRemvover('categories', subCategory.image)
        }

        await this.repo.update(subCategory.id, {
            ...body,
            ...(newFileName && { image: newFileName }),
        });

        return ApiResponse("updated successfully", { subCategory });

    }


}
export default SubCategoryService;
