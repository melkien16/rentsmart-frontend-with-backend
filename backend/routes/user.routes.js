import express from "express";
import {
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
  updateUserPassword,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put("/profile/password", protect, updateUserPassword);

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.get("/email", getUserByEmail);

// /api/users/public/:id
router.get("/public/:id", getUserPublicById);

// PUT these after all the specific ones
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

export default router;
