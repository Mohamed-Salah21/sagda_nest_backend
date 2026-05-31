import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import Product from './modules/products/products.entity';
import Review from './modules/reviews/review.entity';
import User from './modules/users/users.entity';
import ProductModule from './modules/products/products.module';
import ReviewsModule from './modules/reviews/reviews.module';
import UsersModule from './modules/users/users.module';
import AuthModule from './modules/auth/auth.module';
import CategoryModule from './modules/category/category.module';
import Category from './modules/category/category.entity';
import UploadsModule from './modules/uploads/uploads.module';
import SectionsModule from './modules/sections/sections.module';
import Section from './modules/sections/sections.entity';
import SubCategoryModule from './modules/subCategory/subCategory.module';
import SubCategory from './modules/subCategory/subCategory.entity';
import CartModule from './modules/cart/cart.module';
import Cart from './modules/cart/cart.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        synchronize: config.get('Node_ENV') === 'development',
        entities: [Product, Cart, Review, User, Category, SubCategory, Section]
      })
    }),
    SectionsModule,
    ProductModule,
    CartModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    SubCategoryModule,
    UploadsModule,
  ],
})
export class AppModule { }
