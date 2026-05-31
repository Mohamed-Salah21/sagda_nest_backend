import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PrimaryColumn } from "typeorm";

export class updateProductDto {
    @IsString()
    @IsNotEmpty({
        message: "Name is required"
    })
    name!: string;

    @IsNumber()
    @IsNotEmpty({
        message: "Price is required"
    })
    price!: number;

    @IsString({
        message: "Description must be a string"
    })
    @IsNotEmpty({
        message: "Description is required"
    })
    description!: string;

}