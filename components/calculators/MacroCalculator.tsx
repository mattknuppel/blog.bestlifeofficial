"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { calculateMacros } from "@/lib/tdee";
import { poundsToKilograms, parseNumber } from "@/lib/units";

type System = "metric" | "imperial";
type Preference = "higher-protein" | "balanced" | "lower-carb";

const preferences: { value: Preference; label: string; description: string }[] = [
  {
    value: "higher-protein",
    label: "Higher-Protein",
    description: "Great for recomposition and strength goals."
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Steady energy for everyday training."
  },
  {
    value: "lower-carb",
    label: "Lower-Carb",
    description: "Supports appetite control and metabolic flexibility."
  }
];

export function MacroCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [system, setSystem] = useState<System>((searchParams.get("system") as System) || "metric");
  const [calories, setCalories] = useState(searchParams.get("calories") ?? "");
  const [weight, setWeight] = useState(searchParams.get("weight") ?? "");
  const [preference, setPreference] = useState<Preference>((searchParams.get("preference") as Preference) || "balanced");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("system", system);
    params.set("preference", preference);
    if (calories) params.set("calories", calories);
    if (weight) params.set("weight", weight);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [calories, pathname, preference, router, system, weight]);

  const result = useMemo(() => {
    const calorieNumber = parseNumber(calories);
    const weightNumber = parseNumber(weight);
    if (!Number.isFinite(calorieNumber) || !Number.isFinite(weightNumber) || calorieNumber <= 0 || weightNumber <= 0) {
      return null;
    }
    const weightKg = system === "metric" ? weightNumber : poundsToKilograms(weightNumber);
    return calculateMacros({
      calories: Math.round(calorieNumber),
      weightKg,
      proteinRange: [1.6, 2.2],
      fatMinimum: 0.8,
      preference
    });
  }, [calories, preference, system, weight]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSystem("metric")}
          className={`rounded-full border px-3 py-1.5 text-sm focus-ring ${system === "metric" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-ink-200 text-ink-600"}`}
        >
          Metric
        </button>
        <button
          type="button"
          onClick={() => setSystem("imperial")}
          className={`rounded-full border px-3 py-1.5 text-sm focus-ring ${system === "imperial" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-ink-200 text-ink-600"}`}
        >
          Imperial
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-ink-700">
          <span className="font-semibold text-ink-800">Daily calories</span>
          <input
            inputMode="numeric"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
            className="rounded-xl border border-ink-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="grid gap-2 text-sm text-ink-700">
          <span className="font-semibold text-ink-800">Body weight ({system === "metric" ? "kg" : "lb"})</span>
          <input
            inputMode="decimal"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="rounded-xl border border-ink-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {preferences.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => setPreference(option.value)}
            className={`text-left rounded-2xl border p-4 focus-ring ${preference === option.value ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-ink-200 text-ink-600"}`}
          >
            <span className="text-sm font-semibold text-ink-900">{option.label}</span>
            <span className="mt-2 block text-xs text-ink-500">{option.description}</span>
          </button>
        ))}
      </div>
      {result ? (
        <div className="grid gap-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 sm:grid-cols-3" role="status">
          <div>
            <p className="text-sm text-ink-600">Protein</p>
            <p className="mt-2 text-3xl font-semibold text-ink-900">{result.protein} g</p>
            <p className="mt-1 text-xs text-ink-500">1.6–2.2 g/kg</p>
          </div>
          <div>
            <p className="text-sm text-ink-600">Fat</p>
            <p className="mt-2 text-3xl font-semibold text-ink-900">{result.fat} g</p>
            <p className="mt-1 text-xs text-ink-500">≥0.8 g/kg</p>
          </div>
          <div>
            <p className="text-sm text-ink-600">Carbs</p>
            <p className="mt-2 text-3xl font-semibold text-ink-900">{result.carbs} g</p>
            <p className="mt-1 text-xs text-ink-500">Remainder of calories</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-ink-500">Enter your calorie target and weight to estimate macro splits.</p>
      )}
      <p className="text-xs text-ink-500">
        Macro ranges are guidelines. Adjust based on appetite, training response, and medical advice.
      </p>
    </div>
  );
}
