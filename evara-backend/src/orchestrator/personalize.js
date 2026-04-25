import { mlEngine } from '../engines/mlEngine.js';
import { cycleEngine } from '../engines/cycleEngine.js';
import { dailyEngine } from '../engines/dailyEngine.js';
import { lifestyleEngine } from '../engines/lifestyleEngine.js';
import { insightEngine } from '../engines/insightEngine.js';
import { messageEngine } from '../engines/messageEngine.js';
import { calculateBmi, getBmiCategory } from '../utils/bmi.js';
import { riskLevelFromScore } from '../utils/helpers.js';

export const personalize = async (input) => {
  const {
    age,
    height,
    weight,
    cycle = {},
    symptoms = [],
    lifestyle = {},
    daily = {}
  } = input;

  const bmi = calculateBmi({ height, weight });
  const bmiCategory = getBmiCategory(bmi);
  const cycleState = cycleEngine({ cycle });
  const dailyState = dailyEngine({ daily, symptoms });
  const ml = await mlEngine({ age, bmi, symptoms, cycle, lifestyle });
  const riskLevel = riskLevelFromScore(ml.riskScore);
  const lifestylePlan = lifestyleEngine({ bmiCategory, riskLevel, lifestyle, dailyState });
  const insights = insightEngine({ bmi, bmiCategory, riskLevel, ml, cycleState, dailyState });
  const message = messageEngine({ riskLevel, cycleState, dailyState });

  return {
    riskScore: ml.riskScore,
    riskLevel,
    insights,
    dietPlan: lifestylePlan.dietPlan,
    exercisePlan: lifestylePlan.exercisePlan,
    message,
    context: {
      bmi,
      bmiCategory,
      cycle: cycleState,
      daily: dailyState,
      ml
    }
  };
};
