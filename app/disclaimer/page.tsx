import type { Metadata } from "next";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Read the ${siteName} disclaimer about affiliate links, advertising, editorial independence, and content accuracy.`,
  alternates: {
    canonical: `${siteUrl}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-900 mb-2">Disclaimer</h1>
      <p className="text-sm text-ink-500 mb-8">Last updated: April 1, 2026</p>

      <div className="prose-content">
        <h2>Affiliate Disclosure</h2>
        <p>
          {siteName} participates in affiliate marketing programs. This means some links on this
          site are affiliate links — if you click and make a purchase, we may receive a commission
          at no additional cost to you.
        </p>
        <p>
          Affiliate relationships do <strong>not</strong> influence our editorial content, ratings,
          or recommendations. We only recommend products and services we believe provide genuine
          value to our readers. Our reviews and comparisons are based on independent research and
          testing.
        </p>
        <p>
          Affiliate links are disclosed in individual articles where applicable, in accordance with
          the FTC&rsquo;s guidelines on endorsements and testimonials.
        </p>

        <h2>Advertising</h2>
        <p>
          This site displays advertisements served by Google AdSense and potentially other ad
          networks. These advertisements are clearly labeled and are separate from our editorial
          content. We do not endorse the products or services advertised unless explicitly stated.
        </p>
        <p>
          Google AdSense uses cookies to display personalized ads based on your browsing history.
          For more information, see our{" "}
          <a href="/privacy">Privacy Policy</a> and visit{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s Advertising Policy
          </a>
          .
        </p>

        <h2>Editorial Independence</h2>
        <p>
          {siteName} maintains full editorial independence. Advertisers, sponsors, and affiliate
          partners have no influence over which tools we review, how we rate them, or what
          conclusions we reach. Paid placements and sponsored content are always clearly labeled.
        </p>

        <h2>Accuracy &amp; Currency of Information</h2>
        <p>
          We strive to keep all information on this site accurate and up to date. However, AI tools
          change rapidly — pricing, features, and availability may have changed since publication.
          Always verify current details directly with the product vendor before making a purchase
          decision.
        </p>
        <p>
          Nothing on this site constitutes professional, legal, financial, or technical advice. All
          content is provided for informational purposes only.
        </p>

        <h2>No Warranties</h2>
        <p>
          The content on {siteName} is provided &ldquo;as is&rdquo; without any warranties, express
          or implied. We make no representations about the accuracy, completeness, or suitability of
          the information for any particular purpose. Your use of this site is at your own risk.
        </p>

        <h2>External Links</h2>
        <p>
          Our articles may link to third-party websites for reference or purchase. We are not
          responsible for the content, accuracy, or privacy practices of those external sites.
          External links do not imply endorsement unless explicitly stated.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Disclaimer or believe a disclosure is missing, please
          visit our <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
}
