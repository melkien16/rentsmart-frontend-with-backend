import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markNotificationRead);
router.delete("/:id", protect, deleteNotification);

export default router;