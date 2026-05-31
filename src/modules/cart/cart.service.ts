import { Injectable } from "@nestjs/common";
import ApiResponse from "src/helpers/ApiResponse";

@Injectable()
class CartService {
    constructor() { }
    public getAll() { }

    public getUserCart(userId: number) {
        return ApiResponse(`Cart is fetched`, { userId })
    }

    public updateQuantity() { }
}
export default CartService;