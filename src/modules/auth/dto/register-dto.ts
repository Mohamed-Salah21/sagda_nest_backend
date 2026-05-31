import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class RegisterDto {

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
export default RegisterDto;