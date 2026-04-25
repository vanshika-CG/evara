import { Router } from 'express';
import { getHealthTrends } from './analytics.controller.js';

const router = Router();

router.get('/trends', getHealthTrends);

export default router;
