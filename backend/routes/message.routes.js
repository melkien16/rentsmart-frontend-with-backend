import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
  getConversationById,
  getUserMessageByEmail,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/", protect, getAllMessages);
router.get("/user/:userId", protect, getMessages);
router.get("/email/:email", protect, getUserMessageByEmail);
router.get("/conversation/:conversationId", protect, getConversationById);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
