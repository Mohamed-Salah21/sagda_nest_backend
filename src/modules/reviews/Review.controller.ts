import { Controller, Get } from "@nestjs/common";
import RevirewService from "./Review,Service";

@Controller("/api/reviews")
class ReviewController {

    constructor(private readonly service: RevirewService) { }

    @Get()
    getAllReviews() {
        return this.service.getAllReviews();
    }
}
export default ReviewController;