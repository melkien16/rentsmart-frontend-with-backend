import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getSettings,
  createUserSettings,
  updateNotifications,
  updateVisibility,
  updateSecuritySettings,
  addPaymentMethod,
  updatePasswordChangeDate,
  addLoginHistory,
  getAllSettings,
} from "../controllers/userSettings.controller.js";

const router = express.Router();

router.route("/all-settings").get(protect, admin, getAllSettings);
router.route("/notifications").put(protect, updateNotifications);
router.route("/visibility").put(protect, updateVisibility);
router.route("/security").put(protect, updateSecuritySettings);
router.route("/payment-methods").post(protect, addPaymentMethod);
router.route("/change-password").put(protect, updatePasswordChangeDate);
router.route("/login-history").post(protect, addLoginHistory);

router.route("/").get(protect, getSettings);

export default router;
