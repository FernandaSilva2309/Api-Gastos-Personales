import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Ruta para comprobar que el servidor esta encendido
app.get('/', (req, res) => {
    res.send({message: 'Hola Mundo'});
});

app.get('/api/isAlive', (req, res) => {
    res.send({message: 'Servidor encendido'});
});

app.use('/api', authRoutes);
app.use('/api', productRoutes);

export default app;