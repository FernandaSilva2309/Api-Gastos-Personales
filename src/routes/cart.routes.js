import { Router } from 'express';
import { getCarritoByUserId, addProductToCart, deleteProductFromCart } from '../controllers/cart.controller.js';
import { addToCarritoSchema, deleteFromCarritoSchema } from '../schemas/cart.schema.js';
import { validateParamsSchema } from '../middlewares/validator.middleware.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

//Obtener los productos del carrito de un usuario
router.get('/cart/:id', getCarritoByUserId);

//Agregar productos al carrito de un usuario
router.post('/cart/user/:iduser/product/:idproducto', authRequired, validateParamsSchema(addToCarritoSchema), addProductToCart);

//Eliminar un producto del carrito del usuario
router.delete('/cart/user/:iduser/product/:idproducto', authRequired, validateParamsSchema(deleteFromCarritoSchema), deleteProductFromCart);

export default router;