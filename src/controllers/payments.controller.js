import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from '../config.js';
import Compras from '../models/Compras.model.js';
import Producto from '../models/Product.model.js';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const checkout = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    // Crear cliente de Stripe
    const customer = await stripe.customers.create();

    // Crear una clave efímera para el cliente
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );

    // Crear la intención de pago, agregando userId como metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // en centavos
      currency: "mxn",
      customer: customer.id,
      metadata: {
        userId: String(userId), // ⚠️ importante: siempre en string
      },
    });

    // Respuesta al frontend con los datos necesarios
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error("❌ Error en el checkout:", error);
    res.status(500).json({ error: "Error en el servidor de pagos" });
  }
};

export const getCompras = async (req, res) => {
  const { id } = req.params;

  try {
    const compras = await Compras.findAll({
      where: { userId: id },
      include: [
        {
          model: Producto,
          attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'], // agrega los campos que quieras retornar
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!compras || compras.length === 0) {
      return res.status(404).json({ message: 'Este usuario no ha realizado compras.' });
    }

    res.json(compras);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras del usuario.' });
  }
};