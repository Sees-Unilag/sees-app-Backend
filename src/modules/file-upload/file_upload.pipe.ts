import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { env } from 'src/config';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(
    files: Express.Multer.File[] | Express.Multer.File,
    _metadata: ArgumentMetadata,
  ) {
    if (!files) {
      throw new BadRequestException('Please upload a file!');
    }
    if (Array.isArray(files)) {
      for (const file of files) {
        this.validateFileSize(file);
        const allowedExtension = [
          'doc',
          'jpg',
          'jpeg',
          'png',
          'docx',
          'ppt',
          'pptx',
          'pdf',
        ];
        const errorMessage =
          'Invalid File Format, We only support pdfs, images, documents and presentations';
        this.validateExtension(file, errorMessage, allowedExtension);
      }
    }
    return files;
  }
  protected validateExtension(
    file: Express.Multer.File,
    errorMessage: string,
    extensions: string[],
  ) {
    const fileName = file.originalname;
    const extension = fileName.split('.').pop().toLowerCase();
    if (!extension || !extensions.includes(extension)) {
      throw new BadRequestException(errorMessage);
    }
  }
  protected validateFileSize(file: Express.Multer.File) {
    const fileSizeInMegaBytes = file.size / (1024 * 1024);
    if (fileSizeInMegaBytes > env.maxfile_size) {
      throw new BadRequestException(
        `File size is beyond the limit, Max size for File Uploads is ${env.maxfile_size}MB`,
      );
    }
  }
}

@Injectable()
export class ImageValidationPipe extends FileValidationPipe {
  transform(
    file: Express.Multer.File,
    _metadata: ArgumentMetadata,
  ): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('Please upload an image!');
    }
    this.validateFileSize(file);
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const errorMessage = 'Invalid File Format, Only images are allowed';
    this.validateExtension(file, errorMessage, allowedExtensions);
    return file;
  }
}
