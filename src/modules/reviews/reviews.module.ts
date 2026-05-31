import { forwardRef, Module } from "@nestjs/common";
import ReviewController from "./Review.controller";
import RevirewService from "./Review,Service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Review from "./review.entity";
import UsersModule from "../users/users.module";
@Module({
    controllers: [ReviewController],
    providers: [RevirewService],
    imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Review])],
    exports: [RevirewService]
})
class ReviewsModule {}
export default ReviewsModule;