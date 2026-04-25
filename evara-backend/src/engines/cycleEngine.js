import { addDays, daysBetween, toISODate } from '../utils/date.js';
export const cycleEngine = (input = {}) => {
  const cycle = input.cycle || {};

  const averageLength = Number(
    cycle.averageLength ||
    cycle.averageCycleLength ||
    input.cycleLength ||
    28
  );

  const lastPeriodDate =
    cycle.lastPeriodDate ||
    cycle.lastPeriodStart ||
    input.lastPeriodDate ||
    null;

  const cycleHistory = Array.isArray(cycle.history) ? cycle.history : [];

  const nextPeriodDate = lastPeriodDate
    ? addDays(lastPeriodDate, averageLength)
    : null;

  const daysUntilNextPeriod = nextPeriodDate
    ? daysBetween(new Date(), nextPeriodDate)
    : null;

  const historyLengths = cycleHistory
    .map((item) => Number(item.length))
    .filter(Number.isFinite);

  const hasHistoryIrregularity = historyLengths.some(
    (length) => length < 21 || length > 35
  );

  const isIrregular =
    averageLength < 21 ||
    averageLength > 35 ||
    hasHistoryIrregularity ||
    input.cycleRegular === 0;

  return {
    averageLength,
    nextPeriodDate: nextPeriodDate ? toISODate(nextPeriodDate) : null,
    daysUntilNextPeriod,
    isIrregular,
    phaseHint:
      daysUntilNextPeriod !== null && daysUntilNextPeriod <= 7
        ? "premenstrual"
        : "baseline"
  };
};