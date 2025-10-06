import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/itemModel.js";
import Category from "../models/categoryModel.js";

// @desc    Fetch all items with optional pagination, search, category, tags, and filters
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

  const search = req.query.search || "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const status = req.query.status;
  const category = req.query.category;
  const tags = req.query.tags ? req.query.tags.split(",") : [];
  const title = req.query.title || "";

  // Base filters
  const baseMatch = {};

  if (search) {
    baseMatch.name = { $regex: search, $options: "i" };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    baseMatch.price = {};
    if (minPrice !== undefined) baseMatch.price.$gte = minPrice;
    if (maxPrice !== undefined) baseMatch.price.$lte = maxPrice;
  }

  if (status) baseMatch.status = status;

  // Aggregation pipeline
  const pipeline = [
    { $match: baseMatch },
    {
      $addFields: {
        titleMatch: title
          ? {
              $cond: [
                {
                  $regexMatch: { input: "$title", regex: title, options: "i" },
                },
                1,
                0,
              ],
            }
          : 0,
        categoryMatch: category
          ? { $cond: [{ $eq: ["$category", category] }, 1, 0] }
          : 0,
        tagMatches:
          tags.length > 0
            ? { $size: { $setIntersection: ["$tags", tags] } }
            : 0,
      },
    },
    {
      $addFields: {
        relevance: {
          $add: [
            { $multiply: ["$titleMatch", 100] }, // title is strongest
            { $multiply: ["$categoryMatch", 10] }, // category next
            "$tagMatches", // tags weaker
          ],
        },
      },
    },
    { $sort: { relevance: -1, createdAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ];

  const items = await Item.aggregate(pipeline);

  // populate owner (aggregation doesn't auto-populate)
  await Item.populate(items, {
    path: "owner",
    select: "name email avatar phone address isPremium isVerified createdAt",
  });

  // count total (without pagination but with base filters)
  const totalItems = await Item.countDocuments(baseMatch);

  res.json({
    items,
    page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
  });
});

// @desc    Fetch items by user ID
// @route   GET /api/items/user/:userId
// @access  Public
const getItemsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const items = await Item.find({ owner: userId })
    .populate(
      "owner",
      "name email avatar phone address isPremium isVerified createdAt"
    )
    .sort({ createdAt: -1 });
  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error("No items found for this user");
  }
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
    status,
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
    status,
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
  } else {
    res.status(400);
    throw new Error("Category is required");
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
    status,
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
    item.status = status || item.status;
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

// @desc    Increment item views
// @route   PUT /api/items/:id/views
// @access  Public
const incrementItemViews = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    item.views += 1;
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
  getItemsByUserId,
  incrementItemViews,
};