import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only allow authenticated users to access analytics
router.get('/', authMiddleware, getAnalytics);

export default router;
