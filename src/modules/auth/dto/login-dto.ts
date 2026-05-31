import { IsNotEmpty, IsString } from "class-validator";

class loginDto {

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
export default loginDto;