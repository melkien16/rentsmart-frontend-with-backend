import express from 'express';
const router = express.Router();

import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);

// Admin-only routes
router.route('/').post(protect, admin, createCategory);
router.route('/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
