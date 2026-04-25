import * as reminderService from './reminder.service.js';

export const createReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.createReminder(req.body);
    res.status(201).json({ success: true, data: reminder });
  } catch (error) {
    next(error);
  }
};
