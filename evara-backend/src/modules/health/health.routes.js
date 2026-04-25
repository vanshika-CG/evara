import { Router } from 'express';
import { personalizeHealth } from './health.controller.js';

const router = Router();

router.post('/personalize', personalizeHealth);

export default router;
