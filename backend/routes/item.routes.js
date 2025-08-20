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
} from "../controllers/item.controller.js";

const router = express.Router();

// ---------------- Public Routes ----------------
// Get all items
router.route("/").get(getItems);

// Get single item by ID
router.route("/:id").get(getItemById);

// Increment item views (PATCH is more correct than PUT)
router.route("/:id/views").patch(incrementItemViews);

// ---------------- Private Routes ----------------
// Create new item
router.route("/").post(protect, createItem);

// Update & Delete item by ID
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

// Get items by user ID
router.route("/user/:userId").get(protect, getItemsByUserId);

export default router;
