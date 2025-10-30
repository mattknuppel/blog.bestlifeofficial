'use client';

import { useMemo, useState } from 'react';

import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { calculateBMI, type UnitSystem } from '@/lib/calculators';

function getCategory(bmi: number) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy weight';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formattedResult = useMemo(() => {
    if (!result) return null;
    return {
      bmi: result.toFixed(1),
      category: getCategory(result),
    };
  }, [result]);

  return (
    <section className="space-y-6 rounded-2xl border border-black/5 bg-muted/40 p-6 shadow-sm dark:border-white/10">
      <header>
        <h2 className="text-xl font-semibold">BMI Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Compare your body mass index using metric or imperial units. Aim for trends over time rather than a single
          snapshot.
        </p>
      </header>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          let parsedWeight = parseFloat(weight);
          if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
            setError('Enter a valid weight.');
            setResult(null);
            return;
          }

          let parsedHeight: number;
          if (unit === 'metric') {
            parsedHeight = parseFloat(height);
            if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) {
              setError('Enter height in centimeters.');
              setResult(null);
              return;
            }
          } else {
            const feet = parseFloat(heightFeet);
            const inches = parseFloat(heightInches || '0');
            if (!Number.isFinite(feet) || feet <= 0) {
              setError('Enter height in feet and inches.');
              setResult(null);
              return;
            }
            parsedHeight = feet * 12 + inches;
            if (parsedHeight <= 0) {
              setError('Enter height in feet and inches.');
              setResult(null);
              return;
            }
          }

          const bmi = calculateBMI(parsedWeight, unit === 'metric' ? parsedHeight : parsedHeight, unit);
          setResult(bmi);
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

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Calculate BMI
        </button>
      </form>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {formattedResult ? (
        <div className="rounded-xl border border-brand/30 bg-brand/10 p-4 text-sm text-brand dark:border-brand/40 dark:bg-brand/20">
          <p>
            <strong>BMI:</strong> {formattedResult.bmi}
          </p>
          <p>
            <strong>Category:</strong> {formattedResult.category}
          </p>
        </div>
      ) : null}
    </section>
  );
}
