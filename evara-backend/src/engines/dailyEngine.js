export const dailyEngine = ({ daily = {}, symptoms = [] }) => {
  const mood = daily.mood || 'steady';
  const energy = daily.energy || 'medium';
  const symptomSet = new Set(symptoms);
  const adjustments = [];

  if (energy === 'low' || symptomSet.has('fatigue')) {
    adjustments.push('Prefer lighter movement and steady meals today.');
  }

  if (mood === 'anxious' || mood === 'low') {
    adjustments.push('Add a short breathing break and reduce caffeine later in the day.');
  }

  if (symptomSet.has('cramps')) {
    adjustments.push('Use gentle stretching, hydration, and warm foods for comfort.');
  }

  return {
    mood,
    energy,
    symptoms,
    adjustments
  };
};
