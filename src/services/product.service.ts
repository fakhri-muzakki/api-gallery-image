import { AppError } from '../errors/AppError';
import prisma from '../libs/prisma';
import { deleteImageFromSupabase } from '../utils/deleteImage';
import { uploadImageToSupabase } from '../utils/uploadImage';

export const getProductService = async () => {
  return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
};

interface AddProductPayload {
  name: string;
  description: string;
  image: string;
}

export const addProductService = async ({
  description,
  name,
  image,
}: AddProductPayload) => {
  // Insert user ke database
  const newUser = await prisma.product.create({
    data: {
      name,
      description,
      image,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      // Jangan return password
    },
  });

  return newUser;
};

export const deleteProductService = async (id: string) => {
  await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });

    if (!product) throw new AppError('Product not found', 404);
    await deleteImageFromSupabase(product.image);
    await tx.product.delete({ where: { id } });
  });
};

interface UpdateProductPayload {
  id: string;
  name?: string;
  description?: string;
  file?: Express.Multer.File;
}

export const updateProductService = async ({
  id,
  name,
  description,
  file,
}: UpdateProductPayload) => {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);

    let imageUrl = product.image;

    if (file) {
      const newImageUrl = await uploadImageToSupabase(file);

      await deleteImageFromSupabase(product.image);
      imageUrl = newImageUrl;
    }

    return await tx.product.update({
      where: { id },
      data: {
        name,
        description,
        image: imageUrl,
      },
    });
  });
};
