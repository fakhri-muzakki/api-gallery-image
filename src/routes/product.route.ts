import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/product.controller';
import { validate } from '../middlewares/validate';
import {
  createProductSchema,
  idParamsSchema,
  updateProductSchema,
} from '../validations/product.validation';
import { upload } from '../config/multer';
import { requireUpdateData } from '../middlewares/requireUpdateData';

const router = Router();
router.get('/', getProduct);
router.post(
  '/',
  upload.single('image'),
  validate(createProductSchema, 'body'),
  addProduct
);
router.delete('/:id', validate(idParamsSchema, 'params'), deleteProduct);

router.put(
  '/:id',
  validate(idParamsSchema, 'params'),
  upload.single('image'),
  requireUpdateData,
  validate(updateProductSchema, 'body'),
  updateProduct
);

// router.put('/:id', upload.single('image'), updateProduct);

export default router;
