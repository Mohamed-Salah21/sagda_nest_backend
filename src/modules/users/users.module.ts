import { forwardRef, Module } from "@nestjs/common";
import UsersController from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./users.entity";
import UsersService from "./users.service";
import ReviewsModule from "../reviews/reviews.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        forwardRef(() => ReviewsModule),
        TypeOrmModule.forFeature([User]),
    ]
})
class UsersModule {}
export default UsersModule;