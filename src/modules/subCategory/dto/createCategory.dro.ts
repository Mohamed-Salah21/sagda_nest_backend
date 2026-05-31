import { IsNotEmpty, IsString } from "class-validator";

class CreateSubCategoryDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

}
export default CreateSubCategoryDto;