import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const urls = await Promise.all(
      files.map(async (file): Promise<string> => {
        return await this.uploadFile(file);
      })
    );
    return urls;
  }
}
