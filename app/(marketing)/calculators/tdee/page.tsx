import type { Metadata } from "next";
import { TdeeCalculator } from "@/components/calculators/TdeeCalculator";

export const metadata: Metadata = {
  title: "TDEE Calculator",
  description: "Estimate BMR and daily calorie targets using the Mifflin-St Jeor equation and activity multipliers."
};

export default function TdeePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Calculator</p>
        <h1 className="text-3xl font-semibold text-ink-900">Total Daily Energy Expenditure</h1>
        <p className="text-base text-ink-600">
          Understand how many calories you burn each day based on your body metrics and activity level. Use the targets to
          plan maintenance, deficit, or surplus phases.
        </p>
      </header>
      <TdeeCalculator />
    </div>
  );
}
