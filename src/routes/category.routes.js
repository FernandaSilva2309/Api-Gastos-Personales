import { Router } from 'express';
import { getAllCategories } from '../controllers/category.controller.js';

const router = Router();

router.get('/categories', getAllCategories);

export default router;
