import type { NextFunction, Request, Response } from 'express';

import {
  addProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from '../services/product.service';
import { uploadImageToSupabase } from '../utils/uploadImage';

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getProductService();

    return res.status(200).json({
      success: true,
      message: 'Get product successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const imageUrl = await uploadImageToSupabase(file);
    const data = await addProductService({
      name,
      description,
      image: imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: 'Add product successfully',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;
    await deleteProductService(params.id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const file = req.file;
    const id = req.params.id;

    const data = await updateProductService({ id, name, description, file });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
