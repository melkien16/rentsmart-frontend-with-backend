import asyncHandler from "../middleware/asyncHandler.js";
import Review from "../models/reviewModel.js";
import Booking from "../models/bookingModel.js";
import Item from "../models/itemModel.js";
// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { itemId, rating, comment } = req.body;
  const reviewerId = req.user._id;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  // Ensure the user has completed a booking for this item
  const booking = await Booking.findOne({
    user: reviewerId,
    item: itemId,
    status: "completed",
  });

  if (!booking) {
    res.status(400);
    throw new Error("You can only review items you've completed booking for");
  }

  // Prevent duplicate reviews
  const existingReview = await Review.findOne({ reviewer: reviewerId, item: itemId });
  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this item");
  }

  const review = await Review.create({
    reviewer: reviewerId,
    owner: item.owner,
    item: itemId,
    rating,
    comment,
  });

  res.status(201).json(review);
});

// @desc    Get reviews for an owner
// @route   GET /api/reviews/owner/:ownerId
// @access  Public
const getReviewsForOwner = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ owner: req.params.ownerId })
    .populate("reviewer", "name")
    .populate("item", "name");

  res.json(reviews);
});

// @desc    Get current user's submitted reviews
// @route   GET /api/reviews/my
// @access  Private
const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ reviewer: req.user._id })
    .populate("item", "name")
    .populate("owner", "name");

  res.json(reviews);
});

//@desc    sum all reviews for an owner and return the avarage rating and total reviews of the owner
//@route   GET /api/reviews/owner/:ownerId/summary
//@access  Public
const getOwnerReviewSummary = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ owner: req.params.ownerId });

  if (!reviews.length) {
    return res.json({ totalReviews: 0, averageRating: 0 });
  }

  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
  ).toFixed(2);

  res.json({ totalReviews, averageRating });
});

export { createReview, getReviewsForOwner, getMyReviews, getOwnerReviewSummary };
