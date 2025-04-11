import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

//Ruta para comprobar que el servidor esta encendido
app.get('/', (req, res) => {
    res.send({message: 'Hola Mundo'});
});

app.get('/api/isAlive', (req, res) => {
    res.send({message: 'Servidor encendido'});
});

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

export default app;