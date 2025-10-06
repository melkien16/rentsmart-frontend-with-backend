import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth user & get token
// @route  POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      avatar: user.avatar,
      token: res.cookie.jwt,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register user
// @route  POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, avatar, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    address,
    avatar,
    password,
    verification: [],
  });

  if (user) {
    await Wallet.create({
      user: user._id,
      balance: 0,
    });

    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route  POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route  GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      isPremium: user.isPremium,
      verification: user.verification,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route  PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.avatar = req.body.avatar || user.avatar;
    user.isPremium = req.body.isPremium ?? user.isPremium;
    user.verification = req.body.verification || user.verification;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      isPremium: updatedUser.isPremium,
      verification: updatedUser.verification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route  GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.status(404);
    throw new Error("No users found");
  }
  res.status(200).json(users);
});

// @desc    Get user by id
// @route  GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by id for public view
// @route  GET /api/users/public/:id
// @access  Public
const getUserPublicById = asyncHandler(async (req, res) => {
  // also add id name, email, phone, address, avatar, isPremium, verification, createdAt
  const user = await User.findById(req.params.id).select(
    "name email phone address avatar isOnline lastSeen isPremium verification createdAt _id"
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user by email
//@route GET /api/users/email
//@access  public
const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query; // ✅ use query params
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  const user = await User.findOne({ email }).select(
    "name email phone address avatar isPremium verification isOnline lastSeen createdAt _id"
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route  DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route  PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;
    user.isPremium = req.body.isPremium ?? user.isPremium;
    user.verification = req.body.verification || user.verification;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      isPremium: updatedUser.isPremium,
      verification: updatedUser.verification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserPublicById,
  getUserByEmail,
};
