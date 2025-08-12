import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { id, name, count, image } = req.body;

  const existing = await Category.findOne({ id });
  if (existing) {
    res.status(400);
    throw new Error('Category with this ID already exists');
  }

  const category = new Category({
    id,
    name,
    count: count || 0,
    image,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, count, image } = req.body;

  const category = await Category.findOne({ id: req.params.id });

  if (category) {
    category.name = name || category.name;
    category.count = count ?? category.count;
    category.image = image || category.image;

    const updated = await category.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (category) {
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
