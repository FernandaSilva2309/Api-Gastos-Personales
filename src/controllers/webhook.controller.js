import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '../config.js';
import Carrito from '../models/Carrito.model.js';
import Compras from '../models/Compras.model.js';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Verifica que la petición venga de Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Detecta el evento de pago exitoso
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const userId = paymentIntent.metadata.userId;

    try {
      // Obtener productos del carrito del usuario
      const productos = await Carrito.findAll({ where: { userId } });

      // Guardar en la tabla de compras
      const compras = productos.map(p => ({
        userId,
        productoId: p.productoId,
      }));
      await Compras.bulkCreate(compras);

      // Vaciar carrito
      await Carrito.destroy({ where: { userId } });

      console.log(`✅ Compra registrada para userId ${userId}`);
    } catch (error) {
      console.error("❌ Error al registrar compra:", error);
    }
  }

  res.status(200).json({ received: true });
};