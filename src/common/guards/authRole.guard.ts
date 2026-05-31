import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { CURRENT_USER_KEY } from 'src/utils/constants';
import { UserRoles } from 'src/utils/enums';
import UsersService from 'src/modules/users/users.service';
import User from 'src/modules/users/users.entity';

@Injectable()
class AuthRolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles: UserRoles[] = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles || roles.length === 0) throw new UnauthorizedException('No roles defined for this route');
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers['token'] as string | undefined;;
        if (!token) throw new UnauthorizedException('No token provided');
        try {
            const payload = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });
            const user = await this.usersService.getProfile(payload.id);
            if (!user) throw new UnauthorizedException('this token can not find any user');
            if (!roles.includes((user as any).role)) throw new ForbiddenException('You do not have permission to access this resource');
            request[CURRENT_USER_KEY] = payload;
        } catch (error: any) {
            throw new ForbiddenException(error.message || 'Invalid token');
        }
        return true;
    }
}

export default AuthRolesGuard;