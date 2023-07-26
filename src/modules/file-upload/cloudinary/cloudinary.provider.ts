import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from '../constants';
import { ConfigService } from '@nestjs/config/dist';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    const cloudinaryConfig = configService.get('cloudinary');
    cloudinary.config(cloudinaryConfig);
    return cloudinary;
  },
  inject: [ConfigService],
};
