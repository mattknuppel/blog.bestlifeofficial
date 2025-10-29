import type { ReactNode } from "react";

interface NoteProps {
  children: ReactNode;
}

export function Note({ children }: NoteProps) {
  return (
    <aside className="not-prose rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
      {children}
    </aside>
  );
}
