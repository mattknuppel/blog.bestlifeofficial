import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function Card({ title, description, href, icon, className, children }: CardProps) {
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'group block rounded-xl border border-black/5 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70',
        href && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {icon ? <div className="h-10 w-10 text-brand">{icon}</div> : null}
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </div>
    </Wrapper>
  );
}
