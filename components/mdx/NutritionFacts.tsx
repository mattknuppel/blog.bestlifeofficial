interface NutritionFactsProps {
  calories: number;
  nutrition: Record<string, string>;
}

export function NutritionFacts({ calories, nutrition }: NutritionFactsProps) {
  const entries = Object.entries(nutrition);
  return (
    <section aria-label="Nutrition facts" className="not-prose w-full max-w-sm rounded-3xl border border-ink-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-ink-900">Nutrition Facts</h2>
      <p className="mt-2 text-sm text-ink-500">Per serving</p>
      <p className="mt-4 text-3xl font-semibold text-ink-900">{calories} kcal</p>
      <ul className="mt-6 space-y-3 text-sm text-ink-700">
        {entries.map(([key, value]) => (
          <li key={key} className="flex items-center justify-between">
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="font-medium text-ink-900">{value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
