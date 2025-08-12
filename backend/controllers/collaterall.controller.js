import asyncHandler from "../middleware/asyncHandler.js";
import Collateral from "../models/collateralModel.js";

// @desc    Upload or update collateral
// @route   POST /api/collaterals
// @access  Private
const uploadOrUpdateCollateral = asyncHandler(async (req, res) => {
  const { collateralType, description, value, documents } = req.body;
  const userId = req.user._id;

  let collateral = await Collateral.findOne({ user: userId });

  if (collateral) {
    // Update existing
    collateral.collateralType = collateralType || collateral.collateralType;
    collateral.description = description || collateral.description;
    collateral.value = value || collateral.value;
    collateral.documents = documents || collateral.documents;
    await collateral.save();
  } else {
    // Create new
    collateral = await Collateral.create({
      user: userId,
      collateralType,
      description,
      value,
      documents,
    });
  }

  res.status(201).json({ message: "Collateral saved", collateral });
});

// @desc    Get current user's collateral
// @route   GET /api/collaterals/mine
// @access  Private
const getMyCollateral = asyncHandler(async (req, res) => {
  const collateral = await Collateral.findOne({ user: req.user._id });

  if (!collateral) {
    res.status(404);
    throw new Error("No collateral found for this user");
  }

  res.json(collateral);
});

// @desc    Check if user meets collateral requirement
// @route   POST /api/collaterals/check
// @access  Private
const checkCollateralMinimum = asyncHandler(async (req, res) => {
  const { minimumValue } = req.body;
  const collateral = await Collateral.findOne({ user: req.user._id });

  if (!collateral) {
    res.status(404);
    throw new Error("Collateral not found");
  }

  const meetsRequirement = collateral.value >= minimumValue;
  res.json({ meetsRequirement, userCollateralValue: collateral.value });
});

export { uploadOrUpdateCollateral, getMyCollateral, checkCollateralMinimum };
