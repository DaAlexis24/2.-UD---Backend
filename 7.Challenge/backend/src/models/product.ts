import * as z from 'zod';

const categories = ['Galletas', 'Abarrotes', 'Verduras', 'Legumbres'];

export const ProductSchemaDTO = z.object({
  productName: z.string(),
  description: z.string(),
  category: z.enum(categories),
  price: z.number(),
  image: z.string(),
});

export const ProductSchema = ProductSchemaDTO.extend({
  id: z.uuid(),
});

export type Product = z.infer<typeof ProductSchema>;

export type ProductDTO = z.infer<typeof ProductSchemaDTO>;
