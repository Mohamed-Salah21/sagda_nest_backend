import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AuthService from './auth.service';
import AuthController from './auth.controller';
import User from '../users/users.entity';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
})
export default class AuthModule { }