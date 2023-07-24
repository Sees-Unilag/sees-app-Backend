import { registerAs } from '@nestjs/config';

export default registerAs('cloudinary', () => ({
  cloudName: process.env.CLOUDINARY_CLOUDNAME,
  apiKey: process.env.CLOUDINARY_APIKEY,
  apiSecret: process.env.CLOUDINARY_APISECRET,
}));
