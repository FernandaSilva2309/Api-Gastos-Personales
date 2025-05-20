import { Router } from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller.js";
import express from "express"; // importante

const router = Router();

// express.raw() para que Stripe valide la firma correctamente
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;