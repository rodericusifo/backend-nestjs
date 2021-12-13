import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const multerConfiguration: MulterOptions = {
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: CallableFunction,
    ) => {
      let subUploadDir: string;
      if (req.url.includes('payment-proof')) {
        subUploadDir = 'payment-proof';
      } else {
        subUploadDir = 'others';
      }
      const uploadDir = `uploads/${subUploadDir}/${file.mimetype}`;
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (
      _req: Request,
      file: Express.Multer.File,
      cb: CallableFunction,
    ) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
};
