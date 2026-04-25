import { predictPcosRisk } from '../integrations/mlApi.js';
import { clamp } from '../utils/helpers.js';

const symptomWeights = {
  irregular_periods: 0.18,
  acne: 0.08,
  weight_gain: 0.1,
  excess_hair_growth: 0.14,
  hair_loss: 0.08,
  fatigue: 0.05,
  mood_swings: 0.04
};

const fallbackRiskScore = ({ bmi, symptoms = [], cycle = {} }) => {
  const symptomScore = symptoms.reduce((total, symptom) => total + (symptomWeights[symptom] || 0.03), 0);
  const bmiScore = bmi >= 30 ? 0.18 : bmi >= 25 ? 0.1 : 0;
  const cycleScore = cycle.averageLength > 35 || cycle.averageLength < 21 ? 0.18 : 0;

  return Number(clamp(0.16 + symptomScore + bmiScore + cycleScore, 0.05, 0.92).toFixed(2));
};

export const mlEngine = async ({ age, bmi, symptoms, cycle, lifestyle }) => {
  const prediction = await predictPcosRisk({ age, bmi, symptoms, cycle, lifestyle });
  const riskScore = Number.isFinite(prediction.riskScore)
    ? clamp(prediction.riskScore, 0, 1)
    : fallbackRiskScore({ bmi, symptoms, cycle });

  return {
    riskScore: Number(riskScore.toFixed(2)),
    source: prediction.source,
    modelAvailable: prediction.source === 'ml_api'
  };
};
