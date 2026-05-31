import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { CURRENT_USER_KEY } from 'src/utils/constants';

@Injectable()
class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers['token'] as string;
        if (!token) return false;
        try {
            const payload = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            request[CURRENT_USER_KEY] = payload;
            return true;
        }
        catch (error: any) {
            throw new UnauthorizedException(error.message || 'Invalid token');
        }
    }
}

export default AuthGuard;