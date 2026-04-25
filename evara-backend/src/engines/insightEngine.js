import { compact } from '../utils/helpers.js';

export const insightEngine = ({ bmi, bmiCategory, riskLevel, ml, cycleState, dailyState }) => {
  return compact([
    `Your BMI is ${bmi ?? 'not available'} (${bmiCategory}), which is one context signal for metabolic health.`,
    cycleState.isIrregular
      ? 'Your cycle pattern looks irregular, so cycle timing is weighted more strongly in this plan.'
      : 'Your cycle pattern is within the common range, so recommendations focus on daily consistency.',
    dailyState.adjustments.length
      ? `Today's plan was adjusted for ${dailyState.mood} mood and ${dailyState.energy} energy.`
      : 'No major daily-state adjustments were needed today.',
    ml.modelAvailable
      ? 'The PCOS risk estimate came from the connected ML service.'
      : 'The PCOS risk estimate is using the local rule-based fallback until the ML service is available.',
    riskLevel === 'high'
      ? 'A high risk result is not a diagnosis. It means the app should encourage clinical follow-up and careful tracking.'
      : null
  ]);
};
