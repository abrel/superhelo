import { Request, Response, NextFunction } from 'express';
import { pipeline } from 'stream';
import { promisify } from 'util';
import S3Manager from '@@/services/s3';
import * as DocumentRepository from '@@/services/mongo/repositories/Document';
import HttpError from '@@/utils/HttpError';
import { DocumentTypes } from '@@/constants/document';
import validator from '@@/validation/validator';
import { patchDocumentValidationSchema } from '@@/validation/schemas';

export const fetchDocument = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.sh.document = await DocumentRepository.findDocumentByIdOrThrow(
      req.params.documentId,
    );

    return next();
  } catch (e) {
    return next(e);
  }
};

export const renderDocuments = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => res.json(req.sh.documents || req.sh.document);

export const deleteDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { document } = req.sh;

  if (!document) {
    return next(new HttpError('Document not found', 404));
  }

  try {
    await S3Manager.deleteFile(document.key);
    await DocumentRepository.deleteDocumentById(document.id);

    return res.json({});
  } catch (e) {
    return next(e);
  }
};

const asyncPipeline = promisify(pipeline);
export const viewDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { document } = req.sh;

  try {
    if (!document) {
      throw new HttpError('Document not found', 404);
    }
    res.setHeader('Content-Type', document.mimetype);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(document.name)}"`,
    );

    const s3Stream = S3Manager.getObject(document.key).createReadStream();
    s3Stream.on('error', (err: Error) => {
      return next(err);
    });

    await asyncPipeline(s3Stream, res);
  } catch (e) {
    return next(e);
  }
};

export const fetchUserDocuments = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.sh.documents = await DocumentRepository.findAllDocumentsBy({
      userId: req.params.userId,
      type: {
        $nin: [DocumentTypes.SIGNATURE, DocumentTypes.AVATAR],
      },
    });

    return next();
  } catch (e) {
    return next(e);
  }
};

export const patchDocument = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.sh.document) {
    return next(new HttpError('Document not found', 404));
  }

  try {
    const data = validator(req.body, patchDocumentValidationSchema) as {
      label?: string;
      isPrivate?: boolean;
      type?: DocumentTypes;
    };

    req.sh.document = await DocumentRepository.updateDocumentById(
      req.params.documentId,
      data,
    );

    return next();
  } catch (e) {
    return next(e);
  }
};
