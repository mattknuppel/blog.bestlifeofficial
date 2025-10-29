import type { Metadata } from "next";
import { BmiCalculator } from "@/components/calculators/BmiCalculator";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Estimate your Body Mass Index with metric or imperial units and understand the WHO categories."
};

export default function BmiPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Calculator</p>
        <h1 className="text-3xl font-semibold text-ink-900">Body Mass Index (BMI)</h1>
        <p className="text-base text-ink-600">
          Quickly estimate BMI using metric or imperial inputs. Use this as a screening tool alongside waist circumference,
          body composition, and how you feel day-to-day.
        </p>
      </header>
      <BmiCalculator />
    </div>
  );
}
