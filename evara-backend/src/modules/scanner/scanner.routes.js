import { Router } from 'express';
import { scanProduct } from './scanner.controller.js';

const router = Router();

router.post('/scan', scanProduct);

export default router;
