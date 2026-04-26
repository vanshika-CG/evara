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
  const symptomScore = symptoms.reduce(
    (total, symptom) => total + (symptomWeights[symptom] || 0.03),
    0
  );

  const bmiScore = bmi >= 30 ? 0.18 : bmi >= 25 ? 0.1 : 0;

  const cycleScore =
    cycle.averageLength > 35 || cycle.averageLength < 21 ? 0.18 : 0;

  return Number(
    clamp(0.16 + symptomScore + bmiScore + cycleScore, 0.05, 0.92).toFixed(2)
  );
};

export const mlEngine = async ({
  age,
  bmi,
  symptoms = [],
  cycle = {},
  lifestyle = {}
}) => {
  try {
    const payload = {
      age,
      bmi,
      cycleRegular: cycle?.isIrregular ? 0 : 1,
      cycleLength: cycle?.averageLength || 28,
      weightGain: symptoms.includes('weight_gain') ? 1 : 0,
      hairGrowth: symptoms.includes('excess_hair_growth') ? 1 : 0,
      pimples: symptoms.includes('acne') ? 1 : 0,
      fastFood: lifestyle?.fastFood || 0,
      exercise: lifestyle?.exercise || 0
    };

    const prediction = await predictPcosRisk(payload);

    const riskScore = Number.isFinite(prediction?.riskScore)
      ? clamp(prediction.riskScore, 0, 1)
      : fallbackRiskScore({ bmi, symptoms, cycle });

    const riskLevel =
      riskScore > 0.7 ? 'high' :
      riskScore > 0.3 ? 'moderate' :
      'low';

    return {
      riskScore: Number(riskScore.toFixed(2)),
      riskLevel,
      source: prediction?.source || 'ml_api',
      modelAvailable: !!prediction && prediction.source === 'ml_api',
      confidence: !!prediction && prediction.source === 'ml_api' ? 'high' : 'medium'
    };

  } catch (err) {
    console.log("ML failed → fallback:", err.message);

    const riskScore = fallbackRiskScore({ bmi, symptoms, cycle });

    const riskLevel =
      riskScore > 0.7 ? 'high' :
      riskScore > 0.3 ? 'moderate' :
      'low';

    return {
      riskScore,
      riskLevel,
      source: 'fallback',
      modelAvailable: false,
      confidence: 'medium'
    };
  }
};