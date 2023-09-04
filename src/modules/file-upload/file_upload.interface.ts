export abstract class FileUploadService {
  abstract uploadFile(file: Express.Multer.File): Promise<string>;
  abstract uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
}
