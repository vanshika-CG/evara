import { CycleLog } from './cycle.model.js';
import { cycleEngine } from '../../engines/cycleEngine.js';

export const createCycleLog = (payload) => CycleLog.create(payload);

export const predictCycle = (cycle) => cycleEngine({ cycle });
