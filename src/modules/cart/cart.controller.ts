import { Controller, Get, UseGuards } from "@nestjs/common";
import CartService from "./cart.service";
import AuthGuard from "src/common/guards/autGuard.guard";
import CurrentUser from "src/common/decorators/currentUser.decorator";
import User from "../users/users.entity";

@Controller('/api/cart')
class CartController {
    constructor(
        private readonly service: CartService
    ) { }
    @Get('/user')
    @UseGuards(AuthGuard)
    public getUserCart(@CurrentUser() user: User) {
        return this.service.getUserCart(user.id);
    }
}
export default CartController;