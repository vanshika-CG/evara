import { Reminder } from './reminder.model.js';
import { scheduleReminder } from '../../integrations/notification.js';

export const createReminder = async (payload) => {
  const reminder = await Reminder.create(payload);
  await scheduleReminder(reminder.toObject());
  return reminder;
};
