'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-black/10 bg-white/90 px-4 text-sm text-[rgb(var(--foreground))] shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-white/10 dark:bg-slate-900/80',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = 'Select';
