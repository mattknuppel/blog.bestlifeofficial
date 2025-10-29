'use client';

import { FormEvent, useState } from 'react';

export const NewsletterForm = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('success');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Join free
      </button>
      {status === 'success' && (
        <p role="status" className="text-sm text-emerald-700">
          Thanks! Check your inbox to confirm your subscription.
        </p>
      )}
    </form>
  );
};
