import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { env } from 'src/config';
  
  @Injectable()
  export class FileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File, _metadata: ArgumentMetadata) {
      const fileSizeInMegaBytes = file.size / (1024 * 1024);
      if (fileSizeInMegaBytes > env.maxfile_size) {
        throw new BadRequestException(
          `File size is beyond the limit, Max size for File Uploads is ${env.maxfile_size}MB`,
        );
      }
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
      const fileName = file.originalname;
      const extension = fileName.split('.').pop().toLowerCase();
      if (!extension || !allowedExtension.includes(extension)) {
        throw new BadRequestException(
          'Invalid File Format, We only support pdfs, images, documents and presentations',
        );
      }
      return file;
    }
  }