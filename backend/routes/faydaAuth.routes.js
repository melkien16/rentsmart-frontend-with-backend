import express from 'express';

import { authenticateUser } from '../controllers/faydaAuth.controller.js';

const router = express.Router();

// Route to handle user authentication
router.post('/authenticate', authenticateUser);

export default router;