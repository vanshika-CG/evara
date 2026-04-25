export const lifestyleEngine = ({ bmiCategory, riskLevel, lifestyle = {}, dailyState = {} }) => {
  const dietPlan = [
    'Build meals around protein, fiber-rich vegetables, and low-glycemic carbohydrates.',
    'Keep hydration consistent and avoid long gaps between meals.'
  ];

  const exercisePlan = [
    'Aim for 30 minutes of moderate movement at least 5 days a week.',
    'Add 2 strength sessions weekly to support insulin sensitivity.'
  ];

  if (bmiCategory === 'overweight' || bmiCategory === 'obese' || riskLevel !== 'low') {
    dietPlan.push('Prioritize whole grains, lentils, nuts, seeds, and omega-3 rich foods.');
    exercisePlan.push('Use low-impact cardio plus progressive strength training for sustainable consistency.');
  }

  if (dailyState.energy === 'low') {
    exercisePlan.push('Today, choose walking, mobility, or yoga instead of high-intensity training.');
  }

  if (lifestyle.sleepHours && lifestyle.sleepHours < 7) {
    dietPlan.push('Keep dinner lighter and set a regular sleep window to support hormonal rhythm.');
  }

  return { dietPlan, exercisePlan };
};
