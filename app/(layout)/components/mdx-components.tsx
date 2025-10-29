import type { MDXComponents } from 'mdx/types';
import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

const heading = (Tag: keyof JSX.IntrinsicElements, className: string) => {
  const Component = ({ id, children }: { id?: string; children: ReactNode }) => (
    <Tag id={id} className={clsx(className, 'scroll-mt-28')}>{children}</Tag>
  );
  Component.displayName = `Heading${Tag}`;
  return Component;
};

const Callout = ({ title, type = 'info', children }: { title: string; type?: 'info' | 'warning' | 'success'; children: ReactNode }) => {
  const colors = {
    info: 'border-sky-200 bg-sky-50 text-sky-900',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  };
  return (
    <aside className={clsx('my-6 rounded-2xl border p-6', colors[type])}>
      <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed">{children}</div>
    </aside>
  );
};

const ProsCons = ({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) => (
  <div className="my-6 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Pros</h3>
      <ul className="mt-2 space-y-2 text-sm text-slate-600">
        {pros.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-700">Cons</h3>
      <ul className="mt-2 space-y-2 text-sm text-slate-600">
        {cons.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-rose-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Note = ({ children }: { children: ReactNode }) => (
  <div className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
    {children}
  </div>
);

const Quote = ({ cite, children }: { cite?: string; children: ReactNode }) => (
  <figure className="my-8 border-l-4 border-accent/80 pl-6 text-lg italic text-slate-700">
    <blockquote>{children}</blockquote>
    {cite && <figcaption className="mt-3 text-sm font-medium text-slate-500">— {cite}</figcaption>}
  </figure>
);

const NutritionTable = ({
  items,
}: {
  items: Array<{ food: string; serving: string; protein?: string; carbs?: string; fat?: string }>;
}) => (
  <div className="my-8 overflow-hidden rounded-2xl border border-slate-200">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <caption className="sr-only">Nutrition breakdown</caption>
      <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
        <tr>
          <th scope="col" className="px-4 py-3">
            Food
          </th>
          <th scope="col" className="px-4 py-3">
            Serving
          </th>
          {items.some((item) => item.protein) && (
            <th scope="col" className="px-4 py-3">
              Protein
            </th>
          )}
          {items.some((item) => item.carbs) && (
            <th scope="col" className="px-4 py-3">
              Carbs
            </th>
          )}
          {items.some((item) => item.fat) && (
            <th scope="col" className="px-4 py-3">
              Fat
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {items.map((item) => (
          <tr key={item.food} className="bg-white">
            <th scope="row" className="px-4 py-3 text-left font-semibold text-slate-700">
              {item.food}
            </th>
            <td className="px-4 py-3 text-slate-600">{item.serving}</td>
            {item.protein && <td className="px-4 py-3 text-slate-600">{item.protein}</td>}
            {item.carbs && <td className="px-4 py-3 text-slate-600">{item.carbs}</td>}
            {item.fat && <td className="px-4 py-3 text-slate-600">{item.fat}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  h1: heading('h1', 'mt-10 text-3xl font-bold text-foreground sm:text-4xl'),
  h2: heading('h2', 'mt-10 text-2xl font-semibold text-foreground'),
  h3: heading('h3', 'mt-8 text-xl font-semibold text-foreground'),
  h4: heading('h4', 'mt-6 text-lg font-semibold text-foreground'),
  p: ({ children }) => <p className="mt-4 text-base leading-8 text-slate-700">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-base text-slate-700">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-base text-slate-700">{children}</ol>,
  li: ({ children }) => <li className="marker:text-accent">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mt-6 border-l-4 border-accent/60 pl-4 italic text-slate-700">{children}</blockquote>,
  table: ({ children }) => <div className="my-6 overflow-x-auto">{children}</div>,
  a: ({ children, href }) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        className="text-accent underline-offset-4 hover:underline"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  },
  img: ({ src = '', alt = '', width, height }) => (
    <Image
      src={src}
      alt={alt}
      width={width ? Number(width) : 1280}
      height={height ? Number(height) : 720}
      sizes="(max-width: 768px) 100vw, 720px"
      className="mt-6 rounded-2xl border border-slate-200"
    />
  ),
  Callout,
  ProsCons,
  Note,
  Quote,
  NutritionTable,
  ...components,
});
