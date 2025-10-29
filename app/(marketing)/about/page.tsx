import type { Metadata } from "next";
import config from "@/config";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind Best Life Official and our evidence-based approach."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Our story</p>
        <h1 className="text-3xl font-semibold text-ink-900">Built by dietitians, scientists, and storytellers.</h1>
        <p className="text-base text-ink-600">
          Best Life Official exists to help you feel informed and empowered. We translate complex research into practical
          actions, so you know what really matters for better energy, strength, and longevity.
        </p>
      </header>
      <section className="space-y-6 rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-ink-900">Our principles</h2>
        <ul className="space-y-4 text-sm text-ink-700">
          <li><strong>Science before hype:</strong> We vet every claim through peer-reviewed research.</li>
          <li><strong>Inclusivity by design:</strong> Nutrition advice should be accessible regardless of experience, culture, or budget.</li>
          <li><strong>Behavior change first:</strong> Sustainable habits beat short-lived challenges.</li>
          <li><strong>Transparency always:</strong> We disclose partners, affiliates, and conflicts up front.</li>
        </ul>
      </section>
      <section className="grid gap-6 rounded-2xl border border-ink-100 bg-white p-8 shadow-sm sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-ink-900">What you can expect</h2>
          <p className="mt-3 text-sm text-ink-700">
            Weekly newsletters, deep-dive articles, dietitian-crafted meal plans, and calculators that adapt to your metrics.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-ink-900">Our promise</h2>
          <p className="mt-3 text-sm text-ink-700">
            You&apos;ll never get fear-based marketing or pseudoscience here—only empathetic guidance rooted in evidence and lived experience.
          </p>
        </div>
      </section>
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-ink-900">Want to collaborate?</h2>
        <p className="mt-4 text-sm text-ink-700">
          We partner with aligned brands, health professionals, and community groups. Email us at
          <a href={`mailto:${config.contactEmail}`} className="ml-1 underline">{config.contactEmail}</a> with your idea and we&apos;ll be in touch.
        </p>
      </section>
    </div>
  );
}
