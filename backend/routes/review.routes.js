import express from "express";
import {
  createReview,
  getReviewsForOwner,
  getMyReviews,
  getOwnerReviewSummary
} from "../controllers/review.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a review (after booking is completed)
router.post("/", protect, createReview);

// GET /api/reviews/owner/:ownerId/summary
router.get("/owner/:ownerId/summary", getOwnerReviewSummary);

// Get reviews given to a specific owner
router.get("/owner/:ownerId", getReviewsForOwner);

// Get reviews submitted by the logged-in user
router.get("/my", protect, getMyReviews);

export default router;
