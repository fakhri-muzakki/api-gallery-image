import multer from 'multer';
import { AppError } from '../errors/AppError';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new AppError('File harus berupa image', 400));
      return;
    }
    cb(null, true);
  },
});
