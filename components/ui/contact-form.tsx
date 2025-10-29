"use client";

import { useState } from "react";

const topics = [
  { value: "coaching", label: "Coaching & consults" },
  { value: "partnership", label: "Partnership opportunity" },
  { value: "press", label: "Press / media" },
  { value: "feedback", label: "Feedback" }
];

export function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", topic: topics[0].value, message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      if (!response.ok) {
        throw new Error("Unable to send message");
      }
      setStatus("success");
      setFormState({ name: "", email: "", topic: topics[0].value, message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-ink-800">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formState.name}
          onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-ink-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formState.email}
          onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm font-semibold text-ink-800">
          Topic
        </label>
        <select
          id="topic"
          value={formState.topic}
          onChange={(event) => setFormState((prev) => ({ ...prev, topic: event.target.value }))}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        >
          {topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink-800">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formState.message}
          onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow focus-ring hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && <p className="text-sm text-emerald-600">Thanks! We&apos;ll reply within two business days.</p>}
      {status === "error" && error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
