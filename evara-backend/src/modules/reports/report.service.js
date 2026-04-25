export const summarizeReport = (payload = {}) => ({
  status: 'placeholder',
  summary: 'Report intelligence will summarize uploaded clinical data when parsing is connected.',
  receivedFields: Object.keys(payload)
});
