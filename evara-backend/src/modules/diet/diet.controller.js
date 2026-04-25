import * as dietService from './diet.service.js';

export const generateDietPlan = (req, res, next) => {
  try {
    res.json({ success: true, data: dietService.generateDietPlan(req.body) });
  } catch (error) {
    next(error);
  }
};
