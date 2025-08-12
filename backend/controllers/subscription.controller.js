import asyncHandler from "../middleware/asyncHandler.js";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";

// @desc    Create or update a subscription
// @route   POST /api/subscriptions
// @access  Private
const createOrUpdateSubscription = asyncHandler(async (req, res) => {
  const { type, startDate, endDate } = req.body;
  const userId = req.user._id;

  if (!["basic", "premium"].includes(type)) {
    res.status(400);
    throw new Error("Invalid subscription type");
  }

  let subscription = await Subscription.findOne({ user: userId });

  if (subscription) {
    // Update existing subscription
    subscription.type = type;
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.isActive = true;
    await subscription.save();
  } else {
    // Create new subscription
    subscription = await Subscription.create({
      user: userId,
      type,
      startDate,
      endDate,
      isActive: true,
    });
  }

  // Update user premium status
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.isPremium = true;
  await user.save();

  res.status(201).json({ message: "Subscription saved", subscription });
});

// @desc    Get current user's subscription
// @route   GET /api/subscriptions/mine
// @access  Private
const getMySubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ user: req.user._id });

  if (!subscription) {
    res.status(404);
    throw new Error("Subscription not found");
  }

  res.json(subscription);
});

// @desc    Deactivate a subscription (admin use)
// @route   PUT /api/subscriptions/:id/deactivate
// @access  Admin
const deactivateSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    res.status(404);
    throw new Error("Subscription not found");
  }

  subscription.isActive = false;
  subscription.type = "basic";
  await subscription.save();

  const user = await User.findById(subscription.user);
  if (user) {
    user.isPremium = false;
    await user.save();
  }

  res.json({ message: "Subscription deactivated", subscription });
});

// @desc    Check and deactivate expired subscriptions
// @route   GET /api/subscriptions/check-expired
// @access  Admin
const checkExpiredSubscriptions = asyncHandler(async (req, res) => {
  const now = new Date();
  const expiredSubs = await Subscription.find({
    isActive: true,
    endDate: { $lt: now },
  });

  for (const sub of expiredSubs) {
    sub.isActive = false;
    sub.type = "basic";
    await sub.save();

    const user = await User.findById(sub.user);
    if (user) {
      user.isPremium = false;
      await user.save();
    }
  }

  res.json({
    message: `Expired subscriptions checked: ${expiredSubs.length} updated`,
  });
});

// @desc    Get all subscriptions (admin use)
// @route   GET /api/subscriptions
// @access  Admin
const getAllSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({}).populate("user", "name");
  res.json(subscriptions);
});

export {
  createOrUpdateSubscription,
  getMySubscription,
  deactivateSubscription,
  checkExpiredSubscriptions,
  getAllSubscriptions,
};
