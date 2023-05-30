import { Injectable } from '@nestjs/common';
import { writeFile, rm } from 'fs/promises';
@Injectable()
export class FileService {
  async save(filePath: string, file: Buffer) {
    try {
      await writeFile(filePath, file);
    } catch (error) {
      throw error;
    }
  }
  async delete(pathToFile: string) {
    try {
      await rm(pathToFile);
    } catch (error) {
      throw error;
    }
  }
}
