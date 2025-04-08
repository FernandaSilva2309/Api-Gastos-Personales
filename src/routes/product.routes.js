import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getAllProductos, createProducto, editProducto, deleteProducto, getProducto } from '../controllers/product.controller.js';
import { registerProductoSchema, editProductoSchema } from '../schemas/product.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import uploadImage from '../middlewares/imagesProducts.middleware.js';
import multerErrorHandler from '../middlewares/multerErrorHandler.middleware.js';

const router = Router();

//Obtiene todos los productos
router.get('/products', getAllProductos);

//Obtiene un producto en especifico
router.get('/product/:id', getProducto);

//Crea un nuevo producto
router.post('/create/product', authRequired, uploadImage.single('image'), multerErrorHandler, validateSchema(registerProductoSchema), createProducto);

//Edita un producto en especifico
router.put('/edit/product/:id', authRequired, uploadImage.single('image'), multerErrorHandler, validateSchema(editProductoSchema), editProducto);

//Elimina un producto especifico
router.delete('/delete/product/:id', authRequired, deleteProducto);

export default router;