import { testController } from "../controllers/test.controller.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to test controller
router.get("/",protect, testController);

// Protected route example (if needed in the future)
// router.get("/protected-test", protect, testController);

export default router;