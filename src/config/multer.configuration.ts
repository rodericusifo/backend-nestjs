import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export class MulterConfiguration {
  static uploadPaymentProofConfig(): MulterOptions {
    return {
      storage: diskStorage({
        destination: (
          _req: Request,
          file: Express.Multer.File,
          cb: CallableFunction,
        ) => {
          const uploadDir = `uploads/payment-proof/${file.mimetype}`;
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
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    };
  }

  static uploadOtherConfig(): MulterOptions {
    return {
      storage: diskStorage({
        destination: (
          _req: Request,
          file: Express.Multer.File,
          cb: CallableFunction,
        ) => {
          const uploadDir = `uploads/other/${file.mimetype}`;
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
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    };
  }
}
