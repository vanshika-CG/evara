export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const compact = (items = []) => items.filter(Boolean);

export const unique = (items = []) => [...new Set(items)];

export const riskLevelFromScore = (score) => {
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'moderate';
  return 'low';
};
