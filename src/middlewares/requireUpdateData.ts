import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const requireUpdateData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hasBodyData = Object.keys(req.body).length > 0;
  const hasFile = !!req.file;

  if (!hasBodyData && !hasFile) {
    throw new AppError('Minimal satu field harus diisi untuk update', 400);
  }

  next();
};
