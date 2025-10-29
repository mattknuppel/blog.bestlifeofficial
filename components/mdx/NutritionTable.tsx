interface NutritionTableProps {
  nutrients: { label: string; value: string }[];
}

export function NutritionTable({ nutrients }: NutritionTableProps) {
  return (
    <div className="not-prose overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-ink-100 text-sm">
        <thead className="bg-ink-50 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Nutrient
            </th>
            <th scope="col" className="px-4 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {nutrients.map((nutrient) => (
            <tr key={nutrient.label} className="text-ink-700">
              <td className="px-4 py-3 font-medium">{nutrient.label}</td>
              <td className="px-4 py-3">{nutrient.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
