import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import RegisterDto from "./dto/register-dto";
import * as bcrypt from 'bcryptjs';
import loginDto from "./dto/login-dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import User from "../users/users.entity";
import { UserRoles } from "src/utils/enums";
import ApiResponse from "src/helpers/ApiResponse";



@Injectable()
class AuthService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    private async genToken(user: User): Promise<string> {
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') });
        return token;
    }
    public async register(body: RegisterDto) {
        const user = await this.repo.findOne({ where: { email: body.email } });
        if (user) {
            throw new BadRequestException('User with this email already exists');
        }
        let newUser = this.repo.create({
            ...body,
            password: await bcrypt.hash(body.password, 10)
        });
        newUser = await this.repo.save(newUser);
        const token = await this.genToken(newUser);
        return ApiResponse(`User registered successfully`, {
            token,
            user: newUser,
        })
    }
    private async loginByRole(body: loginDto, role: UserRoles) {
        const user = await this.repo.findOneBy({ email: body.email, role });
        if (!user) {
            throw new NotFoundException('Invalid email or password');
        }
        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            throw new NotFoundException('Invalid email or password');
        }
        const token = await this.genToken(user);
        return ApiResponse("User logged in successfully", {
            token,
            user,
        })
    }
    public async loginClient(body: loginDto) {
        return await this.loginByRole(body, UserRoles.USER);

    }
    public async loginAdmin(body: loginDto) {
        return await this.loginByRole(body, UserRoles.ADMIN);
    }


}
export default AuthService;