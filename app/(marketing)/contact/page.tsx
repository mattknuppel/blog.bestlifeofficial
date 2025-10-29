import type { Metadata } from "next";
import Link from "next/link";
import config from "@/config";
import { ContactForm } from "@/components/ui/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Best Life Official team for support, partnerships, or questions."
};

export default function ContactPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Contact us</p>
        <h1 className="text-3xl font-semibold text-ink-900">We&apos;re here to help you live your best life.</h1>
        <p className="text-base text-ink-600">
          Whether you have a question about our calculators, need help customizing a meal plan, or want to collaborate on
          health initiatives, we&apos;d love to hear from you. Fill out the form and we&apos;ll respond within two business days.
        </p>
        <ContactForm />
      </section>
      <aside className="space-y-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Media & partnerships</h2>
          <p className="mt-2 text-sm text-ink-600">
            For media appearances or partnerships, email
            <a href={`mailto:${config.contactEmail}`} className="ml-1 underline">
              {config.contactEmail}
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Follow us</h2>
          <ul className="mt-3 space-y-2 text-sm text-emerald-700">
            <li><Link href="https://instagram.com" className="underline">Instagram</Link></li>
            <li><Link href="https://youtube.com" className="underline">YouTube</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Visit</h2>
          <p className="mt-2 text-sm text-ink-600">{config.businessAddress}</p>
        </div>
      </aside>
    </div>
  );
}
