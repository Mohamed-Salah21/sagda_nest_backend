import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import UsersService from "./users.service";
import CurrentUser from "../../common/decorators/currentUser.decorator";
import User from "./users.entity";
import Roles from "../../common/decorators/roles.decorator";
import { UserRoles } from "src/utils/enums";
import { ResponseInterceptor } from "../../common/interceptors/response.interceptor";
import AuthRolesGuard from "src/common/guards/authRole.guard";
import AuthGuard from "src/common/guards/autGuard.guard";

@Controller('/api/users')
class UsersController {
    constructor(private readonly service: UsersService) { }
    @Get()
    @Roles(UserRoles.ADMIN, UserRoles.USER)
    @UseGuards(AuthRolesGuard)
    getAllUsers() {
        return this.service.getAll();
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    @UseInterceptors(ResponseInterceptor)
    getProfile(@CurrentUser() user: User) {
        return this.service.getProfile(user.id);
    }

    @Put('/update/:id')
    @UseGuards(AuthGuard)
    updateUserData(@CurrentUser() user: User, @Body() userData: any) {
        return this.service.updateOne(user.id, userData);
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    deleteUser(@CurrentUser() user: User) {
        return this.service.deleteOne(user.id)
    }
}
export default UsersController;