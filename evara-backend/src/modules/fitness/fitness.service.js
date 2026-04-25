import { lifestyleEngine } from '../../engines/lifestyleEngine.js';

export const generateFitnessPlan = (payload) => lifestyleEngine(payload).exercisePlan;
