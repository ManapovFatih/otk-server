import { UploadsFolder } from '../../types/folderTypes';
import { v4 as uuidv4 } from 'uuid';
import { resolve, join } from 'path';
import { DEVELOPMENT_IMAGES, ERROR_SAVING_FILE } from '../../config/constants';
import { UPLOADS_PATH } from '../../config/paths';
import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileService } from './file.service';
@Injectable()
export class ImageService {
  constructor(private readonly fileService: FileService) {}
  public async updateImage(
    image: Express.Multer.File,
    folder: UploadsFolder,
    oldImgPath: string | null = null,
    setImageToNull = false,
  ) {
    let filename: string | null;
    if (image && process.env.NODE_ENV == 'development') {
      throw new ForbiddenException(DEVELOPMENT_IMAGES);
    }
    if (setImageToNull) {
      if (oldImgPath) {
        const oldImgDest = resolve(UPLOADS_PATH, oldImgPath);
        await this.fileService.delete(oldImgDest);
      }
      filename = null;
    } else if (image) {
      if (oldImgPath) {
        const oldImgDest = resolve(UPLOADS_PATH, oldImgPath);
        await this.fileService.delete(oldImgDest);
      }
      filename = join(folder, uuidv4() + '-' + image.originalname);
      const destName = resolve(UPLOADS_PATH, filename);
      try {
        await this.fileService.save(destName, image.buffer);
      } catch (error) {
        throw new InternalServerErrorException(ERROR_SAVING_FILE);
      }
    }
    return filename;
  }
  public async deleteImage(imagePath: string) {
    const destName = resolve(UPLOADS_PATH, imagePath);
    await this.fileService.delete(destName);
  }
}
