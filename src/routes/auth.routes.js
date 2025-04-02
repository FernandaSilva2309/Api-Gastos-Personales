import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

import { authRequired } from '../middlewares/validateToken.js';


const router = Router();

//Rutas para autenticacion

router.post('/register', validateSchema(registerSchema), register);

router.post('/login',validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/test', authRequired, (req, res) => {
    res.send('Autorizado');
});

export default router;