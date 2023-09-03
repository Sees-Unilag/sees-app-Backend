import { Module } from '@nestjs/common';
import { CloudinaryService, CloudinaryProvider} from './cloudinary';
import {FileUploadService, FileValidationPipe} from './';

@Module({
  providers: [
    {
      provide: FileUploadService,
      useClass: CloudinaryService,
    },
    CloudinaryProvider, FileValidationPipe
  ],
  exports: [FileUploadService,FileValidationPipe,CloudinaryProvider],
})
export class FileUploadModule {}
