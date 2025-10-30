'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  asChild?: boolean;
  children: ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  default: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-brand text-brand hover:bg-brand/10 dark:hover:bg-brand/20',
  ghost: 'text-brand hover:bg-brand/10 dark:hover:bg-brand/20',
};

export function Button({ className, variant = 'default', asChild, children, ...props }: ButtonProps) {
  const composedClass = cn(baseClasses, variants[variant], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: cn(children.props.className, composedClass),
    });
  }

  return (
    <button className={composedClass} {...props}>
      {children}
    </button>
  );
}
