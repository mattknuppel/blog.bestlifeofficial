'use client';

import { useState } from 'react';

import { Input } from '@/components/input';
import { macroSplitFromTdee } from '@/lib/calculators';

export function MacroCalculator() {
  const [tdee, setTdee] = useState('2200');
  const [proteinPercent, setProteinPercent] = useState('30');
  const [carbPercent, setCarbPercent] = useState('40');
  const [fatPercent, setFatPercent] = useState('30');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  return (
    <section className="space-y-6 rounded-2xl border border-black/5 bg-muted/40 p-6 shadow-sm dark:border-white/10">
      <header>
        <h2 className="text-xl font-semibold">Macro Split</h2>
        <p className="text-sm text-muted-foreground">
          Choose the protein, carb, and fat percentages that fit your goals. We&apos;ll convert your TDEE into daily gram
          targets.
        </p>
      </header>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const calories = parseFloat(tdee);
          const protein = parseFloat(proteinPercent);
          const carbs = parseFloat(carbPercent);
          const fat = parseFloat(fatPercent);

          if ([calories, protein, carbs, fat].some((value) => !Number.isFinite(value) || value < 0)) {
            setError('Enter positive numbers for calories and macro percentages.');
            setResult(null);
            return;
          }

          if (Math.abs(protein + carbs + fat - 100) > 0.01) {
            setError('Macro percentages must add up to 100%.');
            setResult(null);
            return;
          }

          const split = macroSplitFromTdee(calories, protein, carbs, fat);
          setResult(split);
          setError(null);
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-medium">
          Daily calories (TDEE)
          <Input value={tdee} onChange={(event) => setTdee(event.target.value)} required inputMode="decimal" />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Protein %
            <Input value={proteinPercent} onChange={(event) => setProteinPercent(event.target.value)} inputMode="decimal" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Carbs %
            <Input value={carbPercent} onChange={(event) => setCarbPercent(event.target.value)} inputMode="decimal" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Fat %
            <Input value={fatPercent} onChange={(event) => setFatPercent(event.target.value)} inputMode="decimal" />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Calculate macros
        </button>
      </form>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {result ? (
        <dl className="grid gap-4 rounded-xl border border-brand/30 bg-brand/10 p-4 text-brand dark:border-brand/40 dark:bg-brand/20 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">Protein</dt>
            <dd className="text-2xl font-bold">{Math.round(result.protein)} g</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">Carbs</dt>
            <dd className="text-2xl font-bold">{Math.round(result.carbs)} g</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">Fat</dt>
            <dd className="text-2xl font-bold">{Math.round(result.fat)} g</dd>
          </div>
        </dl>
      ) : null}
    </section>
  );
}
