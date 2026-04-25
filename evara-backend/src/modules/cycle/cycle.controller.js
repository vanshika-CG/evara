import * as cycleService from './cycle.service.js';

export const createCycleLog = async (req, res, next) => {
  try {
    const log = await cycleService.createCycleLog(req.body);
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const predictCycle = (req, res, next) => {
  try {
    res.json({ success: true, data: cycleService.predictCycle(req.body) });
  } catch (error) {
    next(error);
  }
};
