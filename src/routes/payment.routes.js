import { Router } from "express";
import { checkout } from '../controllers/payments.controller.js';
import { getCompras } from '../controllers/payments.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post("/payments/checkout", authRequired, checkout);
router.get('/compras/:id', authRequired, getCompras);

export default router;