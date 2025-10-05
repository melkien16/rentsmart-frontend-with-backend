import {
  addPublicSubscriber,
  getPublicSubscribers,
  deletePublicSubscriber,
  getPublicSubscribersCount,
  isSubscribed,
} from "../controllers/publicSubscriber.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router
  .route("/")
  .post(addPublicSubscriber) // Public route to add a subscriber
  .get(protect, admin, getPublicSubscribers); // Admin route to get all subscribers

router.route("/count").get(protect, admin, getPublicSubscribersCount); // Admin route to get subscriber count

router.route("/:id").delete(protect, admin, deletePublicSubscriber); // Admin route to delete a subscriber
router.route("/:email").get(isSubscribed); // Public route to check if an email is subscribed

export default router;
