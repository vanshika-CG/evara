import { Router } from 'express';
import { summarizeReport } from './report.controller.js';

const router = Router();

router.post('/summarize', summarizeReport);

export default router;
