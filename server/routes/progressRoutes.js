import express from 'express';
import { getProgress, saveProgress } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveProgress);
router.get('/get', authMiddleware, getProgress);

export default router;
