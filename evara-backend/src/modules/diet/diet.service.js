import { lifestyleEngine } from '../../engines/lifestyleEngine.js';

export const generateDietPlan = (payload) => lifestyleEngine(payload).dietPlan;
