export const calculateBmi = ({ height, weight }) => {
  const heightInMeters = Number(height) / 100;
  const weightInKg = Number(weight);

  if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0) {
    return null;
  }

  return Number((weightInKg / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getBmiCategory = (bmi) => {
  if (bmi === null || bmi === undefined) return 'unknown';
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'healthy';
  if (bmi < 30) return 'overweight';
  return 'obese';
};
