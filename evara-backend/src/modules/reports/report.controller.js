import * as reportService from './report.service.js';

export const summarizeReport = (req, res, next) => {
  try {
    res.json({ success: true, data: reportService.summarizeReport(req.body) });
  } catch (error) {
    next(error);
  }
};
