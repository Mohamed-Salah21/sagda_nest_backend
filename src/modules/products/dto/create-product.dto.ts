import { Type } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, Min, Max, IsArray } from "class-validator"
export class CreateProductDto {

    @IsString({
        message: "Title must be a string"
    })
    @IsNotEmpty({
        message: "Title is required"
    })
    title!: string;

    @IsString({
        message: "Description must be a string"
    })
    @IsNotEmpty({
        message: "Description is required"
    })
    description!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0, {
        message: "Price must be a positive number"
    })
    @Max(100, {
        message: "Price must not exceed 100"
    })
    price!: number;


    @Type(() => Number)
    @IsNumber()
    category!: number;


    


}