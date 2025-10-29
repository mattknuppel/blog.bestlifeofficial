interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="not-prose grid gap-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Pros</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          {pros.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Considerations</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          {cons.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-ink-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
