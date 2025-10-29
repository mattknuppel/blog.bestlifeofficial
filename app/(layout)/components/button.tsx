import Link from 'next/link';
import clsx from 'clsx';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
  variant?: Variant;
  className?: string;
};

const baseClasses = 'inline-flex items-center justify-center rounded-md border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

const variantClasses: Record<Variant, string> = {
  primary: 'border-transparent bg-accent px-5 py-2.5 text-accent-foreground shadow-sm hover:bg-emerald-700',
  secondary: 'border-accent/30 bg-white px-5 py-2.5 text-foreground hover:border-accent/60',
  ghost: 'border-transparent bg-transparent px-4 py-2 text-foreground hover:bg-accent/10',
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button className={clsx(baseClasses, variantClasses[variant], className)} {...props} />
);

export const ButtonLink = ({ variant = 'primary', className, href, ...props }: AnchorProps) => (
  <Link
    href={href}
    className={clsx(baseClasses, variantClasses[variant], className)}
    {...props}
  />
);
