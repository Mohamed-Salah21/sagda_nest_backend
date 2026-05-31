import { Module } from "@nestjs/common";
import SectionsController from "./sections.controller";
import SectionsService from "./sections.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Section from "./sections.entity";

@Module({
    controllers: [SectionsController],
    providers: [SectionsService],
    imports: [TypeOrmModule.forFeature([Section])]

})
export default class SectionsModule { }