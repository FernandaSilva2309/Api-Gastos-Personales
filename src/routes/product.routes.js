import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/products', authRequired, (req, res) => {
    res.sendStatus(200);
});

router.get('/product', authRequired, (req, res) => {
    res.sendStatus(200);
});

router.post('/create/product', authRequired, (req, res) => {
    res.sendStatus(200);
});

router.put('/edit/product', authRequired, (req, res) => {
    res.sendStatus(200);
});

router.delete('/delete', authRequired, (req, res) => {
    res.sendStatus(200);
});

export default router;