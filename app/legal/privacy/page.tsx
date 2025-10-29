import type { Metadata } from "next";
import config from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-emerald max-w-3xl">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().getFullYear()}</p>
      <p>
        We collect only the information needed to deliver your requested services. This includes newsletter subscriptions,
        calculator usage analytics, and contact form submissions. We never sell personal data.
      </p>
      <h2>Data we collect</h2>
      <ul>
        <li>Newsletter signup details (name and email)</li>
        <li>Anonymous site analytics and performance metrics</li>
        <li>Messages sent through the contact form</li>
      </ul>
      <h2>How we use your information</h2>
      <p>
        We use your email to send requested communications and respond to enquiries. Aggregated analytics help us improve
        content relevance and accessibility.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request access, updates, or deletion of your data at any time by contacting
        <a href={`mailto:${config.contactEmail}`}> {config.contactEmail}</a>.
      </p>
      <h2>Data storage</h2>
      <p>Data is stored on secure, GDPR-compliant infrastructure located in the EU and Australia.</p>
    </article>
  );
}
