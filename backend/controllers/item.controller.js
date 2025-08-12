import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/itemModel.js";

// @desc    Fetch all items (no filters)
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).populate("owner", "name email");
  res.json(items);
});

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate(
    "owner",
    "name email"
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
    rating,
    reviews,
    location,
    availability,
    images,
    category,
    features,
    rules,
  } = req.body;

  const item = new Item({
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
    owner: req.user._id, // from auth middleware
  });

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

export {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
