import express from "express";
import robotChatController from "../controllers/RobotChat.controller.js";

const router = express.Router();

// Robot Chat route
router.post("/", robotChatController);

export default router;