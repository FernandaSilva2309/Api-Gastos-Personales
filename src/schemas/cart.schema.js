import { z } from 'zod';

export const addToCarritoSchema = z.object({
  params: z.object({
    iduser: z.string().transform(Number).refine(val => Number.isInteger(val) && val > 0, {
      message: 'El ID del usuario debe ser un número entero positivo',
    }),
    idproducto: z.string().transform(Number).refine(val => Number.isInteger(val) && val > 0, {
      message: 'El ID del producto debe ser un número entero positivo',
    }),
  }),
  body: z.object({
    peso: z.string().transform(Number).refine(val => !isNaN(val) && val > 0, {
      message: 'El peso debe ser un número válido mayor a 0',
    }).refine(val => val <= 10, {
      message: 'El peso no puede exceder 10 kg',
    }),
  }),
});

// Esquema para eliminar un producto del carrito
export const deleteFromCarritoSchema = z.object({
  params: z.object({
    iduser: z.string().transform(Number).refine(val => Number.isInteger(val) && val > 0, {
      message: 'El ID del usuario debe ser un número entero positivo',
    }),
    idproducto: z.string().transform(Number).refine(val => Number.isInteger(val) && val > 0, {
      message: 'El ID del producto debe ser un número entero positivo',
    }),
  }),
});