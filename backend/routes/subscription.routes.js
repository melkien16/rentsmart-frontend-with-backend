import express from "express";
const router = express.Router();

import {
  createOrUpdateSubscription,
  getMySubscription,
  deactivateSubscription,
  checkExpiredSubscriptions,
  getAllSubscriptions,
} from "../controllers/subscription.controller.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// Get current user's subscription
router.get("/mine", protect, getMySubscription);

// Check and deactivate expired subscriptions (admin only)
router.get("/check-expired", protect, admin, checkExpiredSubscriptions);

// Deactivate a subscription (admin only)
router.put("/:id/deactivate", protect, admin, deactivateSubscription);

// Create or update a subscription
router.post("/", protect, createOrUpdateSubscription);

// Get all subscriptions (admin only)
router.get("/", protect, admin, getAllSubscriptions);

export default router;
