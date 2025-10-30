'use client';

import { useState } from 'react';

import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { ACTIVITY_LEVELS, calculateBmr, calculateTdee, type Sex, type UnitSystem } from '@/lib/calculators';

function convertToMetric(weight: number, height: number, unit: UnitSystem) {
  if (unit === 'metric') {
    return { weightKg: weight, heightCm: height };
  }

  const weightKg = weight * 0.45359237;
  const heightCm = height * 2.54;
  return { weightKg, heightCm };
}

export function BmrCalculator() {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [sex, setSex] = useState<Sex>('female');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('30');
  const [activity, setActivity] = useState<string>(String(ACTIVITY_LEVELS[1].value));
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="space-y-6 rounded-2xl border border-black/5 bg-muted/40 p-6 shadow-sm dark:border-white/10">
      <header>
        <h2 className="text-xl font-semibold">BMR &amp; TDEE</h2>
        <p className="text-sm text-muted-foreground">
          Calculate your resting energy needs with Mifflin-St Jeor, then estimate daily expenditure using activity
          multipliers.
        </p>
      </header>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const parsedWeight = parseFloat(weight);
          let parsedHeight: number;
          if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
            setError('Enter a valid weight.');
            setResult(null);
            return;
          }

          if (unit === 'metric') {
            parsedHeight = parseFloat(height);
          } else {
            const feet = parseFloat(heightFeet);
            const inches = parseFloat(heightInches || '0');
            parsedHeight = feet * 12 + inches;
          }

          if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) {
            setError('Enter a valid height.');
            setResult(null);
            return;
          }

          const parsedAge = parseFloat(age);
          if (!Number.isFinite(parsedAge) || parsedAge <= 0) {
            setError('Enter a valid age.');
            setResult(null);
            return;
          }

          const { weightKg, heightCm } = convertToMetric(parsedWeight, parsedHeight, unit);
          const bmr = calculateBmr(weightKg, heightCm, parsedAge, sex);
          const tdee = calculateTdee(bmr, Number(activity));
          setResult({ bmr, tdee });
          setError(null);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Unit system
            <Select
              value={unit}
              onChange={(event) => {
                setUnit(event.target.value as UnitSystem);
                setResult(null);
                setError(null);
              }}
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </Select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Sex
            <Select value={sex} onChange={(event) => setSex(event.target.value as Sex)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Age (years)
            <Input value={age} onChange={(event) => setAge(event.target.value)} required inputMode="decimal" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            {unit === 'metric' ? 'Weight (kg)' : 'Weight (lb)'}
            <Input value={weight} onChange={(event) => setWeight(event.target.value)} required inputMode="decimal" />
          </label>
        </div>

        {unit === 'metric' ? (
          <label className="flex flex-col gap-2 text-sm font-medium">
            Height (cm)
            <Input value={height} onChange={(event) => setHeight(event.target.value)} required inputMode="decimal" />
          </label>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Height (feet)
              <Input
                value={heightFeet}
                onChange={(event) => setHeightFeet(event.target.value)}
                required
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Height (inches)
              <Input value={heightInches} onChange={(event) => setHeightInches(event.target.value)} inputMode="decimal" />
            </label>
          </div>
        )}

        <label className="flex flex-col gap-2 text-sm font-medium">
          Activity level
          <Select value={activity} onChange={(event) => setActivity(event.target.value)}>
            {ACTIVITY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </Select>
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Calculate energy needs
        </button>
      </form>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {result ? (
        <dl className="grid gap-4 rounded-xl border border-brand/30 bg-brand/10 p-4 text-brand dark:border-brand/40 dark:bg-brand/20">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">BMR</dt>
            <dd className="text-2xl font-bold">{Math.round(result.bmr)} kcal/day</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">TDEE</dt>
            <dd className="text-2xl font-bold">{Math.round(result.tdee)} kcal/day</dd>
          </div>
        </dl>
      ) : null}
    </section>
  );
}
