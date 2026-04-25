import * as analyticsService from './analytics.service.js';

export const getHealthTrends = (req, res, next) => {
  try {
    res.json({ success: true, data: analyticsService.getHealthTrends(req.query) });
  } catch (error) {
    next(error);
  }
};
