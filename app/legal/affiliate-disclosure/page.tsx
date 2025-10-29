import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure"
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="prose prose-emerald max-w-3xl">
      <h1>Affiliate Disclosure</h1>
      <p>
        Some links on Best Life Official are affiliate links. If you choose to purchase through these links we may earn a
        commission at no additional cost to you. We only recommend products we have tested or would recommend to clients.
      </p>
      <p>
        We believe transparency builds trust. Sponsored content is clearly labelled, and affiliate relationships never
        influence our editorial recommendations.
      </p>
    </article>
  );
}
