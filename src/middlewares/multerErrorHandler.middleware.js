import multer from "multer";
function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Errores específicos de multer (por ejemplo, límite de tamaño)
    return res.status(400).json({ message: `Error de subida: ${err.message}` });
  } else if (err) {
    // Otros errores relacionados con multer (tipo de archivo inválido, etc.)
    return res.status(400).json({ message: err.message });
  }
  next();
}

export default multerErrorHandler;
