export const messageEngine = ({ riskLevel, cycleState }) => {
  const cycleText = cycleState.nextPeriodDate
    ? ` Your next period is estimated around ${cycleState.nextPeriodDate}.`
    : '';

  if (riskLevel === 'high') {
    return `Your signals deserve attention, but this is manageable one step at a time.${cycleText} Track symptoms consistently and consider discussing these patterns with a clinician.`;
  }

  if (riskLevel === 'moderate') {
    return `A few patterns suggest your body may benefit from steadier routines right now.${cycleText} The plan focuses on food, movement, sleep, and symptom tracking.`;
  }

  return `Your current signals look relatively stable.${cycleText} Keep building consistent habits and log changes when your mood, energy, or symptoms shift.`;
};
