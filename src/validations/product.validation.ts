import z from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const idParamsSchema = z.object({
  id: z.string().length(36),
});

export type IdParamsSchema = z.infer<typeof idParamsSchema>;

export const updateProductSchema = z.object({
  name: z.string().min(5).max(50).optional(),
  description: z.string().optional(),
});
