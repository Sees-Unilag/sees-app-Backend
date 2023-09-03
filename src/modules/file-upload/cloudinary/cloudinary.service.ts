import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { FileUploadService } from '../file_upload.interface';

@Injectable()
export class CloudinaryService extends FileUploadService{

  /**
   * Uploads the file as a stream to cloudinary
   * @param file
   * @returns the url of the uploaded file
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: file.originalname.split('.')[0], // removes the extension from the file name
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );
    toStream(file.buffer).pipe(upload);
    });
  }

  /**
   * Upload multiple files as a stream at once
   * @param files
   * @returns the list of urls of file uploaded
   */
  async uploadFiles(files: Express.Multer.File[]) {
    const urls = await Promise.all(
      files.map(async (file): Promise<string> => {
        return await this.uploadFile(file);
      }),
    );
    return urls;
  }
}
