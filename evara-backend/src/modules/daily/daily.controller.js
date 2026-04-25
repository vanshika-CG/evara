import * as dailyService from './daily.service.js';

export const createDailyLog = async (req, res, next) => {
  try {
    const log = await dailyService.createDailyLog(req.body);
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const analyzeDailyState = (req, res, next) => {
  try {
    res.json({ success: true, data: dailyService.analyzeDailyState(req.body) });
  } catch (error) {
    next(error);
  }
};
