// routes/settingsRoutes.js
import express from "express";
import {
  getSettingsByUserId,
  createUserSettings,
  updateNotifications,
  updateVisibility,
  updateSecuritySettings,
  addPaymentMethod,
  updatePasswordChangeDate,
  addLoginHistory,
  getAllSettings,
} from "../controllers/userSettings.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/all-settings")
  .get(protect, admin, getAllSettings)
  .post(protect, createUserSettings);
router.route("/notifications").put(protect, updateNotifications);
router.route("/visibility").put(protect, updateVisibility);
router.route("/security").put(protect, updateSecuritySettings);
router.route("/payment-methods").post(protect, addPaymentMethod);
router.route("/change-password").put(protect, updatePasswordChangeDate);
router.route("/login-history").post(protect, addLoginHistory);
router.route("/").get(protect, getSettingsByUserId);

export default router;
