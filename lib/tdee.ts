export type Sex = "male" | "female";

export const activityLevels: Record<string, { label: string; multiplier: number }> = {
  sedentary: { label: "Sedentary (little or no exercise)", multiplier: 1.2 },
  light: { label: "Lightly active (1-2 days/week)", multiplier: 1.375 },
  moderate: { label: "Moderately active (3-4 days/week)", multiplier: 1.55 },
  active: { label: "Active (5-6 days/week)", multiplier: 1.725 },
  very: { label: "Very active (athlete)", multiplier: 1.9 }
};

export function calculateBmr(weightKg: number, heightCm: number, age: number, sex: Sex) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round((sex === "male" ? base + 5 : base - 161) * 10) / 10;
}

export function calculateTdee(bmr: number, activity: keyof typeof activityLevels) {
  const multiplier = activityLevels[activity]?.multiplier ?? activityLevels.sedentary.multiplier;
  return Math.round(bmr * multiplier);
}

export function calorieTargets(tdee: number) {
  return {
    maintain: tdee,
    mildDeficit: Math.round(tdee * 0.9),
    moderateDeficit: Math.round(tdee * 0.8),
    leanBulk: Math.round(tdee * 1.1)
  };
}

export interface MacroProfile {
  protein: number;
  fat: number;
  carbs: number;
}

export function calculateMacros({
  calories,
  weightKg,
  proteinRange,
  fatMinimum,
  preference
}: {
  calories: number;
  weightKg: number;
  proteinRange: [number, number];
  fatMinimum: number;
  preference: "higher-protein" | "balanced" | "lower-carb";
}): MacroProfile {
  const proteinPerKg =
    preference === "higher-protein"
      ? proteinRange[1]
      : preference === "lower-carb"
      ? (proteinRange[0] + proteinRange[1]) / 2
      : (proteinRange[0] + proteinRange[1]) / 2;
  const protein = Math.round(weightKg * proteinPerKg);
  const proteinCalories = protein * 4;

  const fatRatio = preference === "lower-carb" ? 0.35 : preference === "higher-protein" ? 0.25 : 0.3;
  const fatFromRatio = (calories * fatRatio) / 9;
  const fat = Math.round(Math.max(weightKg * fatMinimum, fatFromRatio));
  const fatCalories = fat * 9;

  const remainingCalories = Math.max(calories - (proteinCalories + fatCalories), 0);
  const carbs = Math.round(remainingCalories / 4);

  return { protein, fat, carbs };
}
