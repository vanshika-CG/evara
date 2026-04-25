import * as fitnessService from './fitness.service.js';

export const generateFitnessPlan = (req, res, next) => {
  try {
    res.json({ success: true, data: fitnessService.generateFitnessPlan(req.body) });
  } catch (error) {
    next(error);
  }
};
