"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { activityLevels, calculateBmr, calculateTdee, calorieTargets, type Sex } from "@/lib/tdee";
import { inchesToCentimeters, parseNumber, poundsToKilograms } from "@/lib/units";

type System = "metric" | "imperial";

export function TdeeCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [system, setSystem] = useState<System>((searchParams.get("system") as System) || "metric");
  const [sex, setSex] = useState<Sex>((searchParams.get("sex") as Sex) || "female");
  const [weight, setWeight] = useState(searchParams.get("weight") ?? "");
  const [height, setHeight] = useState(searchParams.get("height") ?? "");
  const [age, setAge] = useState(searchParams.get("age") ?? "");
  const [activity, setActivity] = useState<keyof typeof activityLevels>((searchParams.get("activity") as keyof typeof activityLevels) || "moderate");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("system", system);
    params.set("sex", sex);
    params.set("activity", activity);
    if (weight) params.set("weight", weight);
    if (height) params.set("height", height);
    if (age) params.set("age", age);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [activity, age, height, pathname, router, sex, system, weight]);

  const result = useMemo(() => {
    const weightNumber = parseNumber(weight);
    const heightNumber = parseNumber(height);
    const ageNumber = parseNumber(age);
    if (!Number.isFinite(weightNumber) || !Number.isFinite(heightNumber) || !Number.isFinite(ageNumber)) return null;
    if (weightNumber <= 0 || heightNumber <= 0 || ageNumber <= 0) return null;

    const weightKg = system === "metric" ? weightNumber : poundsToKilograms(weightNumber);
    const heightCm = system === "metric" ? heightNumber : inchesToCentimeters(heightNumber);
    const bmr = calculateBmr(weightKg, heightCm, Math.round(ageNumber), sex);
    const tdee = calculateTdee(bmr, activity);
    const targets = calorieTargets(tdee);
    return { bmr, tdee, targets };
  }, [activity, age, height, sex, system, weight]);

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
          <span className="font-semibold text-ink-800">Sex</span>
          <select
            value={sex}
            onChange={(event) => setSex(event.target.value as Sex)}
            className="rounded-xl border border-ink-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-ink-700">
          <span className="font-semibold text-ink-800">Age (years)</span>
          <input
            inputMode="numeric"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="rounded-xl border border-ink-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>
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
        <label className="grid gap-2 text-sm text-ink-700 sm:col-span-2">
          <span className="font-semibold text-ink-800">Activity level</span>
          <select
            value={activity}
            onChange={(event) => setActivity(event.target.value as keyof typeof activityLevels)}
            className="rounded-xl border border-ink-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            {Object.entries(activityLevels).map(([value, data]) => (
              <option key={value} value={value}>
                {data.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {result ? (
        <div className="grid gap-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-ink-600">Basal Metabolic Rate</p>
            <p className="mt-2 text-3xl font-semibold text-ink-900">{result.bmr} kcal</p>
            <p className="mt-2 text-xs text-ink-500">Energy used at rest</p>
          </div>
          <div>
            <p className="text-sm text-ink-600">Total Daily Energy Expenditure</p>
            <p className="mt-2 text-3xl font-semibold text-ink-900">{result.tdee} kcal</p>
            <p className="mt-2 text-xs text-ink-500">Includes activity multiplier</p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Targets</h3>
            <dl className="mt-3 grid gap-3 text-sm text-ink-700 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4">
                <dt className="font-semibold text-ink-900">Maintain</dt>
                <dd>{result.targets.maintain} kcal</dd>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <dt className="font-semibold text-ink-900">Mild deficit (−10%)</dt>
                <dd>{result.targets.mildDeficit} kcal</dd>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <dt className="font-semibold text-ink-900">Moderate deficit (−20%)</dt>
                <dd>{result.targets.moderateDeficit} kcal</dd>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <dt className="font-semibold text-ink-900">Lean bulk (+10%)</dt>
                <dd>{result.targets.leanBulk} kcal</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <p className="text-sm text-ink-500">Add your details to estimate your BMR and daily energy needs.</p>
      )}
      <p className="text-xs text-ink-500">
        Calculations use the Mifflin-St Jeor equation and standard activity multipliers. Adjust based on tracked trends over 2–3 weeks.
      </p>
    </div>
  );
}
