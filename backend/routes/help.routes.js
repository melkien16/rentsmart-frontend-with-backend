import express from "express";
import helpController from "../controllers/help.controller.js";

const router = express.Router();

// Help route
router.post("/", helpController);

export default router;