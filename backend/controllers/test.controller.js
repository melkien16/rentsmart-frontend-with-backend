import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Test controller to verify setup
// @route   GET /api/test
// @access  Public
const testController = asyncHandler(async (req, res) => {
  console.log("Request user object:", req.user); // Should be undefined for public route
  console.log("Request user ID:", req.user ? req.user._id : "No user"); // Should be undefined for public route
  res.json({ message: "Test controller is working!" });
});

export { testController };