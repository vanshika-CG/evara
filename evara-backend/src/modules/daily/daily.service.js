import { DailyLog } from './daily.model.js';
import { dailyEngine } from '../../engines/dailyEngine.js';

export const createDailyLog = (payload) => DailyLog.create(payload);

export const analyzeDailyState = (payload) => dailyEngine(payload);
