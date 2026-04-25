import { Router } from 'express';
import { createCycleLog, predictCycle } from './cycle.controller.js';

const router = Router();

router.post('/', createCycleLog);
router.post('/predict', predictCycle);

export default router;
