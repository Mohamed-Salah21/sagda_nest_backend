import { BadRequestException, ConflictException } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

export const UploadFileInterceptor = (des = "", fileSize = 1024 * 1024 * 4): any => {
    try {
        return FileInterceptor('image', {
            storage: diskStorage({
                destination: `images${des}`,
                filename: (req, file, cb) => {
                    const fileName = `${Date.now()}-` + file.originalname;;
                    cb(null, fileName);
                },


            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith(('image'))) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException(`Unsported file`), false);
                }
            },
            limits: { fileSize }
        })
    } catch (error: any) {
        throw new BadRequestException(error?.message || `Error while uploading image to ${des}`)
    }
}

export const UploadFilesInterceptor = (des = "", maxCount = 5, fileSize = 1024 * 1024 * 4) => {
    try {
        return FilesInterceptor('images', maxCount, {
            storage: diskStorage({
                destination: `images${des}`,
                filename: (req, file, cb) => {
                    const fileName = `${Date.now()}-` + file.originalname;;
                    cb(null, fileName);
                },


            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith(('image'))) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException(`Unsported file`), false);
                }
            },
            limits: { fileSize }
        })
    }
    catch (error: any) {
        throw new BadRequestException(error.message || `Error while uploading the images to ${des}`)
    }
}



