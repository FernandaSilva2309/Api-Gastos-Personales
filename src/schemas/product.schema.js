import { z } from 'zod';

export const registerProductoSchema = z.object({
  nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  precio: z.string().transform(Number).refine(val => !isNaN(val) && val > 0, {
    message: 'El precio debe ser un número válido mayor a 0',
  }),
  descripcion: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
  categoriaId: z.string().transform(Number).refine(val => Number.isInteger(val) && val > 0, {
    message: 'El ID de la categoría debe ser un número entero positivo',
  }),
});

export const editProductoSchema = registerProductoSchema.partial(); // Hace que todos los campos sean opcionales
