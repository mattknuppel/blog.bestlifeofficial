export type UnitSystem = 'metric' | 'imperial';
export type Sex = 'male' | 'female';

export const ACTIVITY_LEVELS = [
  { label: 'Sedentary (little or no exercise)', value: 1.2 },
  { label: 'Lightly active (1-3 days/week)', value: 1.375 },
  { label: 'Moderately active (3-5 days/week)', value: 1.55 },
  { label: 'Very active (6-7 days/week)', value: 1.725 },
  { label: 'Extra active (hard exercise & physical job)', value: 1.9 },
] as const;

export function calculateBMI(weight: number, height: number, unit: UnitSystem) {
  if (unit === 'metric') {
    const heightMeters = height / 100;
    return weight / (heightMeters * heightMeters);
  }

  const weightKg = weight * 0.45359237;
  const heightMeters = height * 0.0254;
  return weightKg / (heightMeters * heightMeters);
}

export function calculateBmr(weightKg: number, heightCm: number, age: number, sex: Sex) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
}

export function calculateTdee(bmr: number, activityMultiplier: number) {
  return bmr * activityMultiplier;
}

export function macroSplitFromTdee(
  tdee: number,
  proteinPercent: number,
  carbPercent: number,
  fatPercent: number,
) {
  const totalPercent = proteinPercent + carbPercent + fatPercent;
  if (Math.abs(totalPercent - 100) > 0.01) {
    throw new Error('Macro percentages must total 100%.');
  }

  const proteinCalories = (proteinPercent / 100) * tdee;
  const carbCalories = (carbPercent / 100) * tdee;
  const fatCalories = (fatPercent / 100) * tdee;

  return {
    protein: proteinCalories / 4,
    carbs: carbCalories / 4,
    fat: fatCalories / 9,
  };
}
