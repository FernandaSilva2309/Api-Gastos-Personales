import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para imágenes de productos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/products'); // Directorio para productos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  });
  
  const uploadImage = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Sólo se permiten imágenes JPEG, PNG o GIF para productos.'));
      }
    },
  });
  
  export default uploadImage;