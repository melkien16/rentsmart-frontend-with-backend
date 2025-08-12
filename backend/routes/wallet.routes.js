import express from "express";
const router = express.Router();
import {
  getWalletByUserId,
  createWallet,
  creditWallet,
  debitWallet,
  getAllWallets,
} from "../controllers/wallet.controller.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// @route   GET /api/wallets/:userId        - Get wallet by user ID
// @route   POST /api/wallets               - Create wallet
// @route   PUT /api/wallets/:userId/credit - Credit wallet
// @route   PUT /api/wallets/:userId/debit  - Debit wallet
// @route   GET /api/wallets                - Admin only: get all wallets

router.route("/").get(protect, admin, getAllWallets).post(protect, createWallet);
router.route("/:userId").get(protect, getWalletByUserId);
router.route("/:userId/credit").put(protect, creditWallet);
router.route("/:userId/debit").put(protect, debitWallet);

export default router;
