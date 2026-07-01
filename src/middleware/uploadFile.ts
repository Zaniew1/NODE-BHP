import { RequestHandler } from 'express';
import multer, { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';
import AppError from '../utils/helpers/appError';
import { HttpErrors } from '../utils/constants/http';

type UploadDestination = 'company' | 'worker';

export class MulterHandler {
  public static uploadFile(destination: UploadDestination = 'company', fieldName = 'file'): RequestHandler {
    const storage = MulterHandler.createStorageEngine(destination);
    const upload = multer({ storage }).single(fieldName);

    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    };
  }
  public static uploadFiles(destination: UploadDestination = 'company', fieldName = 'file', maxCount = 10): RequestHandler {
    const storage = MulterHandler.createStorageEngine(destination);
    const upload = multer({ storage }).array(fieldName, maxCount);

    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    };
  }
  public static getFile(destination: UploadDestination): RequestHandler {
    return (req, res, next) => {
      const { id, name } = req.params;
      const filePath = path.join(MulterHandler.getDestinationDir(destination, id), name);

      if (!fs.existsSync(filePath)) {
        return next(new AppError(HttpErrors.NOT_FOUND, `File "${name}" not found.`));
      }

      res.locals.filePath = filePath;
      next();
    };
  }

  private static getDestinationDir(destination: UploadDestination, elementId: string): string {
    return `uploads/${destination}/${elementId}/`;
  }
  private static createStorageEngine(destination: UploadDestination): StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const dir = MulterHandler.getDestinationDir(destination, req.params.id);
        fs.mkdirSync(dir, { recursive: true }); // multer does NOT create dirs itself
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const dir = MulterHandler.getDestinationDir(destination, req.params.id);
        const filePath = path.join(dir, file.originalname);

        if (fs.existsSync(filePath)) {
          cb(new Error(`File "${file.originalname}" already exists.`), file.originalname);
          return;
        }

        cb(null, file.originalname);
      },
    });
  }
}
