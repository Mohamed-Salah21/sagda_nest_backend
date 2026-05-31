import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import AuthService from "./auth.service";
import RegisterDto from "./dto/register-dto";
import loginDto from "./dto/login-dto";


@Controller('/api/auth')
class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }
    
    @Post('login-client')
    public loginClient(@Body(new ValidationPipe()) body: loginDto) {
        return this.service.loginClient(body);
    }

    @Post('login-admin')
    public loginAdmin(@Body(new ValidationPipe()) body: loginDto) {
        return this.service.loginAdmin(body);
    }

    @Post('register')
    public register(@Body(new ValidationPipe()) body: RegisterDto) {
        return this.service.register(body);
    }

}
export default AuthController;