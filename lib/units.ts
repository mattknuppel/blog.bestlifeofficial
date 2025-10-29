export function kilogramsToPounds(kg: number) {
  return kg * 2.20462;
}

export function poundsToKilograms(lb: number) {
  return lb / 2.20462;
}

export function centimetersToInches(cm: number) {
  return cm / 2.54;
}

export function inchesToCentimeters(inches: number) {
  return inches * 2.54;
}

export function centimetersToMeters(cm: number) {
  return cm / 100;
}

export function parseNumber(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}
