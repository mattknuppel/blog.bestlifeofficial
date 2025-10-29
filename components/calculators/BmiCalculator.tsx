"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { centimetersToMeters, inchesToCentimeters, parseNumber, poundsToKilograms } from "@/lib/units";

const categories = [
  { max: 18.5, label: "Underweight" },
  { max: 25, label: "Normal weight" },
  { max: 30, label: "Overweight" }
];

type System = "metric" | "imperial";

export function BmiCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [system, setSystem] = useState<System>((searchParams.get("system") as System) || "metric");
  const [weight, setWeight] = useState(() => searchParams.get("weight") ?? "");
  const [height, setHeight] = useState(() => searchParams.get("height") ?? "");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("system", system);
    if (weight) params.set("weight", weight);
    if (height) params.set("height", height);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [height, pathname, router, system, weight]);

  const result = useMemo(() => {
    const weightNumber = parseNumber(weight);
    const heightNumber = parseNumber(height);
    if (!Number.isFinite(weightNumber) || !Number.isFinite(heightNumber) || weightNumber <= 0 || heightNumber <= 0) {
      return null;
    }
    const weightKg = system === "metric" ? weightNumber : poundsToKilograms(weightNumber);
    const heightMeters = system === "metric" ? centimetersToMeters(heightNumber) : centimetersToMeters(inchesToCentimeters(heightNumber));
    if (heightMeters === 0) return null;
    const bmi = weightKg / (heightMeters * heightMeters);
    const category = categories.find((item) => bmi < item.max)?.label ?? "Obesity";
    return {
      bmi: Math.round(bmi * 10) / 10,
      category
    };
  }, [height, system, weight]);

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
          <span className="font-semibold text-ink-800">Weight ({system === "metric" ? "kg" : "lb"})</span>
          <input
            inputMode="decimal"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="rounded-xl border border-ink-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="grid gap-2 text-sm text-ink-700">
          <span className="font-semibold text-ink-800">Height ({system === "metric" ? "cm" : "in"})</span>
          <input
            inputMode="decimal"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            className="rounded-xl border border-ink-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>
      {result ? (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6" role="status">
          <p className="text-sm text-ink-600">Your BMI</p>
          <p className="mt-2 text-4xl font-semibold text-ink-900">{result.bmi}</p>
          <p className="mt-2 text-sm text-emerald-700">WHO category: {result.category}</p>
        </div>
      ) : (
        <p className="text-sm text-ink-500">Enter your measurements above to calculate your BMI.</p>
      )}
      <p className="text-xs text-ink-500">
        BMI is a screening tool and does not account for muscle mass, age, pregnancy, or ethnicity. Consult a health
        professional for personalised guidance.
      </p>
    </div>
  );
}
