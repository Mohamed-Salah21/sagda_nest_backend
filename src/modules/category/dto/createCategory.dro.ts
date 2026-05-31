import { IsNotEmpty, IsString } from "class-validator";

class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

}
export default CreateCategoryDto;