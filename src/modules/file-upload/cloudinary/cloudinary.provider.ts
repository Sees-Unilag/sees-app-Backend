import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { env } from 'src/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: env.cloudinary_cloudname,
      api_key: env.cloudinary_apikey,
      api_secret: env.cloudinary_apisecret,
    });
  },
};
