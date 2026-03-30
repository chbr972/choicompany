import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and how we handle your data.",
};

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose-content">
        <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2>Information We Collect</h2>
        <p>
          {siteName} uses Google Analytics to collect anonymous usage data such as
          page views, session duration, and general location (country/city level).
          This data helps us understand how visitors use our site and improve our
          content.
        </p>

        <h2>Advertising</h2>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies
          and similar technologies to serve ads based on your visits to this and
          other websites. You can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a>.
        </p>

        <h2>Cookies</h2>
        <p>
          Our site uses cookies for analytics and advertising purposes only. No
          personal information is stored in cookies.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our articles may contain links to external websites. We are not
          responsible for the privacy practices of those sites.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please use the contact
          information on our site.
        </p>
      </div>
    </div>
  );
}
