export const scheduleReminder = async ({ userId, title, scheduledFor }) => ({
  status: 'queued_placeholder',
  userId,
  title,
  scheduledFor
});
