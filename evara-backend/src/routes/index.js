import { Router } from 'express';
import analyticsRoutes from '../modules/analytics/analytics.routes.js';
import cycleRoutes from '../modules/cycle/cycle.routes.js';
import dailyRoutes from '../modules/daily/daily.routes.js';
import dietRoutes from '../modules/diet/diet.routes.js';
import fitnessRoutes from '../modules/fitness/fitness.routes.js';
import healthRoutes from '../modules/health/health.routes.js';
import reminderRoutes from '../modules/reminders/reminder.routes.js';
import reportRoutes from '../modules/reports/report.routes.js';
import scannerRoutes from '../modules/scanner/scanner.routes.js';
import userRoutes from '../modules/user/user.routes.js';
import { personalize } from "../orchestrator/personalize.js";

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'evara-backend',
    status: 'ok'
  });
});

router.post("/personalize", async (req, res) => {
  try {
    const result = await personalize(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use('/', healthRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/cycle', cycleRoutes);
router.use('/daily', dailyRoutes);
router.use('/diet', dietRoutes);
router.use('/fitness', fitnessRoutes);
router.use('/reminders', reminderRoutes);
router.use('/reports', reportRoutes);
router.use('/scanner', scannerRoutes);
router.use('/users', userRoutes);

export default router;
