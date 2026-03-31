import type { Metadata } from "next";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and conditions for using this website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: March 30, 2026
      </p>

      <div className="prose-content">
        <p>
          Welcome to {siteName} (&ldquo;Site,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
          accessing or using {siteUrl}, you agree to be bound by these Terms of
          Service. If you do not agree to these terms, please do not use this Site.
        </p>

        <h2>1. Use of This Site</h2>
        <p>
          This Site is provided for informational and educational purposes only.
          You may use this Site for lawful, personal, non-commercial purposes. You
          agree not to misuse the Site, attempt to gain unauthorized access, or
          interfere with its operation.
        </p>

        <h2>2. Financial Disclaimer</h2>
        <p>
          <strong>
            The content on this Site is for informational purposes only and does
            not constitute financial, investment, tax, or legal advice.
          </strong>{" "}
          All articles, guides, and resources are provided as general information
          and should not be relied upon as personalized financial advice. Always
          consult a qualified financial advisor, tax professional, or attorney
          before making financial decisions.
        </p>
        <p>
          Past performance of any financial product, investment, or strategy
          mentioned on this Site does not guarantee future results. All investing
          involves risk, including possible loss of principal.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this Site&mdash;including text, graphics, logos, and
          images&mdash;is the property of {siteName} or its content suppliers and
          is protected by copyright law. You may not reproduce, distribute, or
          create derivative works without our express written permission.
        </p>

        <h2>4. Third-Party Links and Services</h2>
        <p>
          This Site may contain links to third-party websites or services,
          including affiliate links to financial products. We are not responsible
          for the content, accuracy, or privacy practices of any third-party site.
          Some links may be affiliate links&mdash;we may earn a commission if you
          click through and make a purchase or open an account, at no extra cost to
          you.
        </p>

        <h2>5. Advertising</h2>
        <p>
          We use Google AdSense to display advertisements on this Site. Google and
          its partners may use cookies to serve ads based on your prior visits to
          this and other websites. These advertisements help support the free
          content we provide. For more information, see our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          This Site is provided &ldquo;as is&rdquo; without warranties of any
          kind, either express or implied. We do not warrant that the Site will be
          error-free, uninterrupted, or free of viruses or harmful components. We
          make no guarantees about the accuracy, completeness, or timeliness of
          information on this Site.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {siteName} shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages
          arising from your use of, or inability to use, this Site or its content.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your use of this Site is also governed by our{" "}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into these
          Terms by reference.
        </p>

        <h2>9. Changes to These Terms</h2>
        <p>
          We reserve the right to update these Terms of Service at any time. Changes
          will be effective upon posting to this page. Continued use of the Site
          after changes constitutes your acceptance of the revised terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about these Terms of Service, please contact us
          through the Site.
        </p>
      </div>
    </div>
  );
}
