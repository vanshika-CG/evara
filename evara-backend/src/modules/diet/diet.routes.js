import { Router } from 'express';
import { generateDietPlan } from './diet.controller.js';

const router = Router();

router.post('/plan', generateDietPlan);

export default router;
