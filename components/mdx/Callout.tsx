import clsx from "clsx";
import type { ReactNode } from "react";

type CalloutVariant = "info" | "success" | "warning" | "danger";

const variantStyles: Record<CalloutVariant, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-800"
};

interface CalloutProps {
  title?: string;
  variant?: CalloutVariant;
  children: ReactNode;
}

export function Callout({ title, variant = "info", children }: CalloutProps) {
  return (
    <aside className={clsx("not-prose rounded-2xl border px-5 py-4 shadow-sm", variantStyles[variant])}>
      {title && <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>}
      <div className="mt-2 space-y-2 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
