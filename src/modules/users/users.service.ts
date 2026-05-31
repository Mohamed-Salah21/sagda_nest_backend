import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import User from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import ApiResponse from "src/helpers/ApiResponse";

@Injectable()
class UsersService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) { }
    async getAll() {
        const users = await this.repo.find();
        return ApiResponse(`Users are fetched successfully`, {
            users,
        })
    }

    async getProfile(userId: number) {
        const user = await this.repo.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return ApiResponse(`User data is fetched successfully`, {
            user,
        })
    }

    async updateOne(id: number, userData: any) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) throw new BadRequestException('User not found');
        Object.assign(user, userData);
        this.repo.save(user);
        return ApiResponse(`User data is updated successfully`, {
            user,
        })

    }

    async deleteOne(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.repo.remove(user);
        return ApiResponse(`User deleted successfully`)
    }
}
export default UsersService;