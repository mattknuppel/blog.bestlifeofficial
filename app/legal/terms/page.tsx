import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use"
};

export default function TermsPage() {
  return (
    <article className="prose prose-emerald max-w-3xl">
      <h1>Terms of Use</h1>
      <p>By accessing Best Life Official you agree to these terms.</p>
      <h2>Content</h2>
      <p>Our articles, recipes, and calculators are provided for general informational purposes and are not a substitute for personalised medical advice.</p>
      <h2>Use of calculators</h2>
      <p>You are responsible for verifying results with a qualified professional before making significant health decisions.</p>
      <h2>Intellectual property</h2>
      <p>All trademarks, logos, and content are owned by Best Life Official unless stated otherwise. Please request written permission before republishing.</p>
      <h2>Changes</h2>
      <p>We may update these terms to reflect product changes or legal requirements. Continued use constitutes acceptance of the revised terms.</p>
    </article>
  );
}
