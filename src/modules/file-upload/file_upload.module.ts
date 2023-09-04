import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import {FileUploadService} from './file_upload.interface';
import { FileValidationPipe } from './file_upload.pipe';

@Module({
  providers: [
    {
      provide: FileUploadService,
      useClass: CloudinaryService,
    },
    CloudinaryProvider, FileValidationPipe
  ],
  exports: [FileUploadService, CloudinaryProvider, FileValidationPipe],
})
export class FileUploadModule {}
