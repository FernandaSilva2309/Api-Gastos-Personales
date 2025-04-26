export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json(error.errors.map((error) => error.message));
    }
  };

  import { z } from 'zod';

export const validateParamsSchema = (schema) => (req, res, next) => {
  try {
    schema.parse({
      params: req.params,
      body: req.body,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json(error.errors.map((error) => error.message));
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};