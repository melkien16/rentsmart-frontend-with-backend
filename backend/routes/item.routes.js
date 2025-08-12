import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller.js";

const router = express.Router();

// Public: Get all items
router.route("/").get(getItems);

// Private: Create new item
router.route("/").post(protect, createItem);

// Public: Get item by ID
// Private: Update and delete item by ID
router
  .route("/:id")
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;
