import Link from 'next/link';

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
    <ol className="flex flex-wrap items-center gap-1">
      <li>
        <Link href="/" className="hover:text-foreground">Home</Link>
      </li>
      {items.map((item, index) => (
        <li key={item.href} className="flex items-center gap-1">
          <span aria-hidden="true">/</span>
          {index === items.length - 1 ? (
            <span className="text-slate-700" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
