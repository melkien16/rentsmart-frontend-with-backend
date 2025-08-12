import express from "express";
import {
  uploadOrUpdateCollateral,
  getMyCollateral,
  checkCollateralMinimum,
} from "../controllers/collaterall.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload or update collateral
router.route("/").post(protect, uploadOrUpdateCollateral);

// Get current user's collateral
router.route("/mine").get(protect, getMyCollateral);

// Check if user's collateral meets a minimum value
router.route("/check").post(protect, checkCollateralMinimum);

export default router;
