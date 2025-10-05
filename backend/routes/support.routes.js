import express from "express";
import supportController from "../controllers/support.controller.js";

const router = express.Router();

// Support route
router.post("/", supportController);

export default router;