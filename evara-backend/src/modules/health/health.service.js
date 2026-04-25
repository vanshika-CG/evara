import { personalize } from '../../orchestrator/personalize.js';

export const createPersonalizedHealthPlan = (payload) => personalize(payload);
