import { forwardRef, Inject, Injectable } from "@nestjs/common";
import UsersService from "../users/users.service";

@Injectable()
class RevirewService {
    constructor(@Inject(forwardRef(() => UsersService)) private readonly UsersService: UsersService) { }
    private reviews = ["Review 1", "Review 2", "Review 3"];
    getAllReviews() {
        return this.UsersService.getAll()
    }
}
export default RevirewService;