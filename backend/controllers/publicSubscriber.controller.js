import asyncHandler from "../middleware/asyncHandler.js";
import PublicSubscriber from "../models/publicSubscribers.js";

// @desc    Add a new public email subscriber
// @route   POST /api/public-subscribers
// @access  Public
const addPublicSubscriber = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  // Check if the email already exists
  const existingSubscriber = await PublicSubscriber.findOne({ email });
  if (existingSubscriber) {
    res.status(400);
    throw new Error("Email is already subscribed");
  }

  const newSubscriber = new PublicSubscriber({ email });
  await newSubscriber.save();

  res.status(201).json({ message: "Subscribed successfully" });
});

// @desc    Get check if a user is subscribed
// @route   GET /:email
// @access  Public
const isSubscribed = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  // Check if the email already exists
  const existingSubscriber = await PublicSubscriber.findOne({ email });
  if (existingSubscriber) {
    return res.status(200).json({ subscribed: true });
  } else {
    return res.status(200).json({ subscribed: false });
  }
});

// @desc    Get all public email subscribers
// @route   GET /api/public-subscribers
// @access  Private/Admin
const getPublicSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await PublicSubscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
});

// @desc    Delete a public email subscriber
// @route   DELETE /api/public-subscribers/:id
// @access  Private/Admin
const deletePublicSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await PublicSubscriber.findById(req.params.id);

  if (!subscriber) {
    res.status(404);
    throw new Error("Subscriber not found");
  }

  await subscriber.remove();
  res.json({ message: "Subscriber removed" });
});

// @desc    Get count of public email subscribers
// @route   GET /api/public-subscribers/count
// @access  Private/Admin
const getPublicSubscribersCount = asyncHandler(async (req, res) => {
  const count = await PublicSubscriber.countDocuments();
  res.json({ count });
});

// export all the functions

export {
  addPublicSubscriber,
  getPublicSubscribers,
  deletePublicSubscriber,
  getPublicSubscribersCount,
  isSubscribed,
};
