'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-black/10 bg-white/90 px-4 text-sm text-[rgb(var(--foreground))] shadow-sm transition placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-white/10 dark:bg-slate-900/80',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
