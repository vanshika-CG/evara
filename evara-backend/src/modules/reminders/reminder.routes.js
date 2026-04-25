import { Router } from 'express';
import { createReminder } from './reminder.controller.js';

const router = Router();

router.post('/', createReminder);

export default router;
