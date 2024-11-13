import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import stream from 'stream';
import sharp from 'sharp';
import path from 'path';
import S3Manager from '@@/services/s3';
import * as DocumentRepository from '@@/services/mongo/repositories/Document';
import { Roles } from '@@/constants/user';
import { DocumentTypes } from '@@/constants/document';
import HttpError from '@@/utils/HttpError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleUploadMiddleware = <any>multer({
  storage: multer.memoryStorage(),
  fileFilter: (
    _req: Request,
    _file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => cb(null, true),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).single('file');

export const multipleUploadMiddleware = <any>multer({
  storage: multer.memoryStorage(),
  fileFilter: (
    _req: Request,
    _file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => cb(null, true),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).array('file', 100);

type ResizeDimensions = {
  width: number;
  height?: number;
};

const profileDimensions: ResizeDimensions = {
  width: 400,
  height: 300,
};

const resizeImage = (
  file: Express.Multer.File,
  { width, height }: ResizeDimensions,
) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  const transformer = sharp()
    .resize({
      width,
      height,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    })
    .jpeg({ mozjpeg: true })
    .withMetadata();

  return bufferStream.pipe(transformer);
};

export const handleUserDocuments = async (
  req: Request & {
    files: Express.Multer.File[];
  },
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.files) {
      return next();
    }

    const isWard = req.sh.verifiedToken?.role === Roles.WARD;
    const userId = isWard ? req.sh.verifiedToken?.id : req.sh.user?._id;

    const folder = `documents/${userId}`;
    req.sh.documents = [];
    const relevantDocumentIds = [];

    for (const file of req.files) {
      const filename = file.originalname
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s.])/g, '');

      await S3Manager.uploadFile({
        key: `${folder}/${filename}`,
        contentType: file.mimetype,
        body: file.buffer,
      });
      const document = await DocumentRepository.createDocument({
        userId,
        createdBy: req.sh.verifiedToken?.id,
        name: filename,
        key: `${folder}/${filename}`,
        mimetype: file.mimetype,
      });
      req.sh.documents.push(document);
    }

    return next();
  } catch (e) {
    return next(e);
  }
};

export const handleUserAvatar = async (
  req: Request & { file: Express.Multer.File },
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return next();
    }

    const { user } = req.sh;
    if (!user) {
      return next(new HttpError('User not found', 404));
    }

    const userId = user._id;

    const folder = 'photos';
    const fileName = `${userId}${path.extname(req.file.originalname)}`;
    const key = `${folder}/${fileName}`;

    if (user.photoDocumentId) {
      await Promise.all([
        S3Manager.deleteFile(key),
        DocumentRepository.deleteDocumentById(user.photoDocumentId),
      ]);
    }

    const [document] = await Promise.all([
      DocumentRepository.createDocument({
        userId,
        createdBy: req.sh.verifiedToken?.id,
        name: fileName,
        key,
        mimetype: req.file.mimetype,
        type: DocumentTypes.AVATAR,
      }),
      S3Manager.uploadFile({
        key,
        contentType: req.file.mimetype,
        body: resizeImage(req.file, profileDimensions),
      }),
    ]);

    user.photoDocumentId = document._id;

    return next();
  } catch (e) {
    return next(e);
  }
};

export const handleUserSignature = async (
  req: Request & { file: Express.Multer.File },
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return next();
    }

    const { user } = req.sh;
    if (!user) {
      return next(new HttpError('User not found', 404));
    }

    const userId = user._id;

    const folder = 'signatures';
    const fileName = `${userId}${path.extname(req.file.originalname)}`;
    const key = `${folder}/${fileName}`;

    if (user.signatureDocumentId) {
      await Promise.all([
        S3Manager.deleteFile(key),
        DocumentRepository.deleteDocumentById(user.signatureDocumentId),
      ]);
    }

    const [document] = await Promise.all([
      DocumentRepository.createDocument({
        userId,
        createdBy: req.sh.verifiedToken?.id,
        name: fileName,
        key,
        mimetype: req.file.mimetype,
        type: DocumentTypes.SIGNATURE,
      }),
      S3Manager.uploadFile({
        key,
        contentType: req.file.mimetype,
        body: req.file.buffer,
      }),
    ]);

    user.signatureDocumentId = document._id;

    return next();
  } catch (e) {
    return next(e);
  }
};
