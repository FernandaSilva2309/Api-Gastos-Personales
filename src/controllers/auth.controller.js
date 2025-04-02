import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/User.model.js'

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificamos si ya existe el correo
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json(["El correo ya está registrado"]);
        }

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        });

        // Crear token de acceso
        const token = await createAccessToken({ id: newUser.id });

        // Responder con los datos del usuario
        res.json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json(["Correo o contraseña incorrectos"]);
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json(["Correo o contraseña incorrectos"]);
        }

        // Crear token de acceso
        const token = await createAccessToken({ id: user.id });

        // Responder con los datos del usuario
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        res.json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
