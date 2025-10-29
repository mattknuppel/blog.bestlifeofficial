import type { Metadata } from "next";
import { MacroCalculator } from "@/components/calculators/MacroCalculator";

export const metadata: Metadata = {
  title: "Macro Calculator",
  description: "Turn your calorie target into personalised protein, fat, and carbohydrate goals."
};

export default function MacrosPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Calculator</p>
        <h1 className="text-3xl font-semibold text-ink-900">Macro distribution</h1>
        <p className="text-base text-ink-600">
          Choose a macro profile that fits your training block. Protein is prioritised for muscle retention, fats for
          hormones, and carbs fill the remaining energy.
        </p>
      </header>
      <MacroCalculator />
    </div>
  );
}
