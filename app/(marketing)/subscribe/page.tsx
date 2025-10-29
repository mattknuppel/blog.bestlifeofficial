import type { Metadata } from "next";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Join the Best Life Briefing for weekly, evidence-backed health insights."
};

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Best Life Briefing</p>
      <h1 className="text-3xl font-semibold text-ink-900">Smarter health decisions in five minutes a week.</h1>
      <p className="text-base text-ink-600">
        Join thousands receiving a Sunday summary of the latest research, a featured recipe, and one micro-habit to try.
        No spam. No fluff.
      </p>
      <div className="mx-auto max-w-md">
        <NewsletterForm />
      </div>
    </div>
  );
}
