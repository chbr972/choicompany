import type { Metadata } from "next";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteName} team. Questions, corrections, partnership inquiries, and feedback welcome.`,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-900 mb-2">Contact Us</h1>
      <p className="text-sm text-ink-500 mb-8">We&rsquo;d love to hear from you</p>

      <div className="prose-content">
        <p>
          Have a question, spotted an error, or want to share feedback about {siteName}? Reach out
          using the information below. We aim to respond within 2–3 business days.
        </p>

        <h2>General Inquiries</h2>
        <p>
          For general questions about our content, methodology, or the site itself, email us at:{" "}
          <a href={`mailto:hello@issuebyte.com`}>hello@issuebyte.com</a>
        </p>

        <h2>Corrections &amp; Feedback</h2>
        <p>
          If you believe something in one of our articles is inaccurate, out-of-date, or misleading,
          please let us know. We take editorial accuracy seriously and will review and correct any
          verified errors promptly. Email us at:{" "}
          <a href="mailto:corrections@issuebyte.com">corrections@issuebyte.com</a>
        </p>

        <h2>Partnership &amp; Advertising</h2>
        <p>
          We work with select brands and tool vendors on sponsored content, affiliate partnerships,
          and advertising. We clearly disclose any sponsored content. For partnership inquiries,
          email us at:{" "}
          <a href="mailto:partnerships@issuebyte.com">partnerships@issuebyte.com</a>
        </p>
        <p>
          Note: Paid partnerships do not influence our editorial ratings or review conclusions. See
          our <a href="/disclaimer">Disclaimer</a> for full details.
        </p>

        <h2>Press &amp; Media</h2>
        <p>
          For media inquiries, interview requests, or to use our content, please email:{" "}
          <a href="mailto:press@issuebyte.com">press@issuebyte.com</a>
        </p>

        <h2>Mailing Address</h2>
        <p>
          {siteName}<br />
          Online Publication<br />
          United States
        </p>
      </div>
    </div>
  );
}
