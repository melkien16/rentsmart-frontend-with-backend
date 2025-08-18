import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/itemModel.js";
import Category from "../models/categoryModel.js";

// @desc    Fetch all items with optional pagination, search, category, tags, and filters
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1; // default to page 1
  const limit = Number(req.query.limit) || 10; // default 10 items per page
  const search = req.query.search || "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice
    ? Number(req.query.maxPrice)
    : Number.MAX_SAFE_INTEGER;
  const availability = req.query.availability; // e.g., "Available"
  const category = req.query.category; // optional
  const tags = req.query.tags ? req.query.tags.split(",") : [];

  // Build dynamic query object
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (minPrice || maxPrice !== Number.MAX_SAFE_INTEGER) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (availability) query.availability = availability;
  if (category) query.category = category;
  if (tags.length > 0) query.tags = { $all: tags };

  const totalItems = await Item.countDocuments(query);

  const items = await Item.find(query)
    .populate(
      "owner",
      "name email avatar phone address isPremium isVerified createdAt"
    )
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({
    items,
    page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
  });
});

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate(
    "owner",
    "name email avatar, phone, address, isPremium, isVerified, createdAt"
  );

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    priceUnit,
    value,
    availableQuantity,
    location,
    availability,
    images,
    category,
    features,
    rules,
    tags,
  } = req.body;

  const item = new Item({
    title,
    description,
    price,
    priceUnit,
    value,
    availableQuantity,
    location,
    availability,
    images,
    category,
    features,
    rules,
    owner: req.user._id,
    tags,
  });

  // add the itms quantity to the category's total quantity
  if (category) {
    const categoryItem = await Category.findOne({ name: category });
    if (categoryItem) {
      categoryItem.count += availableQuantity;
      await categoryItem.save();
    }
  }

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    priceUnit,
    rating,
    reviews,
    location,
    availability,
    images,
    category,
    features,
    rules,
    tags,
    availableQuantity,
  } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    item.title = title || item.title;
    item.description = description || item.description;
    item.price = price || item.price;
    item.priceUnit = priceUnit || item.priceUnit;
    item.rating = rating || item.rating;
    item.reviews = reviews || item.reviews;
    item.location = location || item.location;
    item.availability = availability || item.availability;
    item.images = images || item.images;
    item.category = category || item.category;
    item.features = features || item.features;
    item.rules = rules || item.rules;
    item.tags = tags || item.tags;
    item.availableQuantity = availableQuantity || item.availableQuantity;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { getItems, getItemById, createItem, updateItem, deleteItem };
