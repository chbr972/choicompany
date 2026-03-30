import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and how we handle your data.",
};

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 30, 2026</p>

      <div className="prose-content">
        <p>
          This Privacy Policy describes how {siteName} (&ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
          information when you visit our website. By using this Site, you consent
          to the practices described in this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Usage data:</strong> Pages visited, time spent on pages,
            referring URLs, browser type, device type, and general geographic
            location (country/city level) — collected via Google Analytics.
          </li>
          <li>
            <strong>Cookies:</strong> Small data files placed on your device by
            Google Analytics and Google AdSense to recognize your browser across
            sessions.
          </li>
          <li>
            <strong>Advertising data:</strong> Google AdSense may collect data
            about your interests and browsing behavior to serve relevant ads.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect your name, email address, or other
          personal identifiers unless you voluntarily provide them.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Analyze site traffic and improve our content</li>
          <li>Display relevant advertisements through Google AdSense</li>
          <li>Understand which articles are most helpful to readers</li>
        </ul>

        <h2>3. Google Analytics</h2>
        <p>
          We use Google Analytics 4 to understand how visitors interact with our
          Site. Google Analytics collects anonymized data (IP addresses are
          anonymized) about your device, browser, and how you navigate the Site.
          This data is processed by Google in accordance with their{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
        <p>
          You can opt out of Google Analytics tracking by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2>4. Google AdSense and Advertising</h2>
        <p>
          We use Google AdSense to display advertisements on this Site. Google
          AdSense uses cookies and similar tracking technologies to serve ads
          based on your prior visits to this and other websites. This is known as
          interest-based or personalized advertising.
        </p>
        <p>
          Google&rsquo;s use of advertising cookies enables it and its partners
          to serve ads based on your visit to our Site and/or other sites on the
          Internet. You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          .
        </p>
        <p>
          For more information on how Google uses data when you use our Site,
          visit:{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses data from sites that use Google services
          </a>
          .
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our Site uses the following types of cookies:
        </p>
        <ul>
          <li>
            <strong>Analytics cookies</strong> (Google Analytics): Track page
            views and visitor behavior anonymously.
          </li>
          <li>
            <strong>Advertising cookies</strong> (Google AdSense): Used to serve
            relevant ads and measure ad performance.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling cookies
          may affect the functionality of some features. Most browsers allow you
          to refuse or delete cookies — see your browser&rsquo;s help
          documentation for instructions.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our articles may contain links to external websites, including affiliate
          links to financial products and services. We are not responsible for the
          privacy practices or content of those third-party sites. We recommend
          reviewing their privacy policies before providing any personal
          information.
        </p>

        <h2>7. Children&rsquo;s Privacy</h2>
        <p>
          This Site is not directed to children under the age of 13. We do not
          knowingly collect personal information from children. If you believe a
          child has provided us with personal information, please contact us so we
          can delete it.
        </p>

        <h2>8. California Privacy Rights (CCPA)</h2>
        <p>
          California residents have the right to know what personal information we
          collect, request deletion of their data, and opt out of the sale of
          personal information. We do not sell personal information. To exercise
          your rights, please contact us through the Site.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &ldquo;Last updated&rdquo; date.
          Continued use of the Site after changes constitutes acceptance of the
          updated policy.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your
          data, please contact us through the Site.
        </p>
      </div>
    </div>
  );
}
