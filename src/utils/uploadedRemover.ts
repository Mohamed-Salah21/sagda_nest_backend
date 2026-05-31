import * as path from "path";
import * as fs from "fs";

const UploadedRemvover = (folder: string, file: string) => {
    if (file) {
        const oldImagePath = path.join(
            process.cwd(),
            'images',
            folder,
            file,
        );

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }
}
export default UploadedRemvover;