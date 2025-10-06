import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsByUserId,
  incrementItemViews,
  getMylistings,
} from "../controllers/item.controller.js";

const router = express.Router();

// ---------------- Public Routes ----------------

// Get all items
router.route("/").get(getItems);

// ✅ Place specific routes ABOVE any param routes
router.route("/mylistings").get(protect, getMylistings);

// Get items by user ID
router.route("/user/:userId").get(protect, getItemsByUserId);

// Increment item views
router.route("/:id/views").patch(incrementItemViews);

// Get single item by ID
router.route("/:id").get(getItemById);

// ---------------- Private Routes ----------------

// Create new item
router.route("/").post(protect, createItem);

// Update & Delete item by ID
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

export default router;
