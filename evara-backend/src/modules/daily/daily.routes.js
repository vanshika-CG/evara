import { Router } from 'express';
import { analyzeDailyState, createDailyLog } from './daily.controller.js';

const router = Router();

router.post('/', createDailyLog);
router.post('/analyze', analyzeDailyState);

export default router;
