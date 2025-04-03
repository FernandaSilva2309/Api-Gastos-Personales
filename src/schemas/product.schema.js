import { z } from 'zod';

export const registerProductoSchema = z.object({
  nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  precio: z.number().min(0.01, { message: 'El precio debe ser mayor a 0' }),
  descripcion: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
  categoriaId: z.number().int().min(1, { message: 'El ID de la categoría debe ser un número entero positivo' }),
});

export const editProductoSchema = registerProductoSchema.partial(); // Hace que todos los campos sean opcionales
