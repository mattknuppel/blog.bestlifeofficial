"use client";

import { useState } from "react";
import clsx from "clsx";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("space-y-4", className)} noValidate aria-live="polite">
      <label htmlFor="newsletter-email" className="block text-sm font-medium text-ink-700">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-full border border-ink-200 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      />
      <button
        type="submit"
        className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow focus-ring hover:bg-emerald-500"
      >
        Subscribe
      </button>
      {status === "success" && <p className="text-sm text-emerald-600">You&apos;re on the list! Check your inbox shortly.</p>}
      {status === "error" && <p className="text-sm text-red-600">Please enter a valid email address.</p>}
    </form>
  );
}
