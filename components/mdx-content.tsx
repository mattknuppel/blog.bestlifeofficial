'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { slugify } from '@/lib/slugify';

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props?: { children?: ReactNode } }).props?.children ?? '');
  }
  return '';
}

function createHeading<T extends keyof JSX.IntrinsicElements>(Tag: T) {
  return ({ children, ...props }: ComponentProps<T>) => {
    const id = slugify(extractText(children));
    return (
      <Tag id={id} {...props} className="group scroll-mt-24 text-2xl font-semibold tracking-tight">
        <a href={`#${id}`} className="hover:underline">
          {children}
        </a>
      </Tag>
    );
  };
}

const components = {
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  ul: (props: ComponentProps<'ul'>) => <ul className="list-disc space-y-2 pl-6" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="list-decimal space-y-2 pl-6" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="leading-relaxed" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="leading-relaxed" {...props} />,
  a: (props: ComponentProps<'a'>) => (
    <a
      {...props}
      className="font-medium text-brand underline-offset-4 hover:text-brand-dark"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <Component components={components} />
    </div>
  );
}
