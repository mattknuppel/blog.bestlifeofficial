'use client';

import { FormEvent, useState } from 'react';

interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrors({});
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus('error');
        setErrors(json.errors?.fieldErrors ?? {});
        setMessage(json.message ?? 'We could not send your message. Please try again.');
        return;
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks for reaching out! We will be in touch shortly.');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Something went wrong. Please email us directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name[0]}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-foreground">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue="general"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <option value="general">General</option>
          <option value="partnerships">Partnerships</option>
          <option value="press">Press</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          rows={5}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.message && <p className="mt-2 text-sm text-rose-600">{errors.message[0]}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
        {message && (
          <p role={status === 'success' ? 'status' : 'alert'} className={status === 'success' ? 'text-emerald-700' : 'text-rose-600'}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
};
