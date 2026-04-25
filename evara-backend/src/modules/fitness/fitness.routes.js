import { Router } from 'express';
import { generateFitnessPlan } from './fitness.controller.js';

const router = Router();

router.post('/plan', generateFitnessPlan);

export default router;
