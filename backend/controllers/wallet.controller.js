import asyncHandler from "../middleware/asyncHandler.js";
import Wallet from "../models/walletModel.js";

// @desc    Get wallet by user ID
// @route   GET /api/wallets/:userId
// @access  Private
const getWalletByUserId = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.params.userId });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  res.json(wallet);
});

// @desc    Create a wallet for a user
// @route   POST /api/wallets/
// @access  Private
const createWallet = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const existingWallet = await Wallet.findOne({ user: userId });

  if (existingWallet) {
    res.status(400);
    throw new Error("Wallet already exists for this user");
  }

  const wallet = new Wallet({
    user: userId,
    balance: 0,
    transactions: [],
  });

  const createdWallet = await wallet.save();
  res.status(201).json(createdWallet);
});

// @desc    Credit wallet
// @route   PUT /api/wallets/:userId/credit
// @access  Private
const creditWallet = asyncHandler(async (req, res) => {
  const { amount, description } = req.body;
  const wallet = await Wallet.findOne({ user: req.params.userId });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  wallet.balance += Number(amount);
  wallet.transactions.push({ type: "credit", amount, description });

  const updatedWallet = await wallet.save();
  res.json(updatedWallet);
});

// @desc    Debit wallet
// @route   PUT /api/wallets/:userId/debit
// @access  Private
const debitWallet = asyncHandler(async (req, res) => {
  const { amount, description } = req.body;
  const wallet = await Wallet.findOne({ user: req.params.userId });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  if (wallet.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  wallet.balance -= amount;
  wallet.transactions.push({ type: "debit", amount, description });

  const updatedWallet = await wallet.save();
  res.json(updatedWallet);
});

// @desc    Get all wallets (Admin only)
// @route   GET /api/wallets
// @access  Private/Admin
const getAllWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find({}).populate("user", "name email");
  if (!wallets) {
    res.status(404);
    throw new Error("No wallets found");
  }
  res.json(wallets);
});

export {
  getWalletByUserId,
  createWallet,
  creditWallet,
  debitWallet,
  getAllWallets,
};
