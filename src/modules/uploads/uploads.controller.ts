import { BadRequestException, Controller, Get, NotFoundException, Param, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import express from "express";
import { UploadFileInterceptor } from "src/common/interceptors/upload.interceptor";


@Controller('/api/uploads')

class UploadsController {
    @Post()
    @UseInterceptors(UploadFileInterceptor())
    public uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No file provided');
        return { message: "File uploaded successfully" }
    }

    @Get("/:dir/:image")
    public previewUploadImage(@Param("image") image: string, @Param("dir") dir: string, @Res()
    res: express.Response) {
        try {
            res.sendFile(image, {
                root: `images/${dir}`
            })
        } catch (error: any) {
            throw new NotFoundException(error?.message || 'Image is not existed')
        }
    }

}

export default UploadsController;