import type { Metadata } from "next";
import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteName} — our mission, editorial standards, and the team behind our AI tools reviews and comparisons.`,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-900 mb-2">About {siteName}</h1>
      <p className="text-sm text-ink-500 mb-8">Your trusted guide to AI tools and technology</p>

      <div className="prose-content">
        <h2>Our Mission</h2>
        <p>
          {siteName} is an independent publication dedicated to helping individuals and teams discover,
          evaluate, and get the most out of AI tools. We publish in-depth reviews, side-by-side
          comparisons, practical guides, and curated tool directories — all written with real-world
          use cases in mind.
        </p>
        <p>
          Our goal is simple: cut through the hype and give you honest, actionable information so you
          can make confident decisions about which AI tools are right for your needs.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li><strong>AI Writing Tools</strong> — assistants, editors, and content generators</li>
          <li><strong>AI Coding Tools</strong> — copilots, code reviewers, and developer productivity</li>
          <li><strong>AI Image &amp; Video Generators</strong> — creative tools for designers and marketers</li>
          <li><strong>AI Research &amp; Productivity Tools</strong> — search engines, summarizers, and note-takers</li>
          <li><strong>AI Business Tools</strong> — automation, analytics, and customer support</li>
        </ul>

        <h2>Editorial Standards</h2>
        <p>
          We test tools ourselves whenever possible. Our ratings are based on hands-on use, documented
          capabilities, pricing fairness, support quality, and community feedback. We do not accept
          payment to change our ratings or editorial opinions.
        </p>
        <p>
          Some articles contain affiliate links — if you click and purchase, we may earn a commission
          at no extra cost to you. This helps us keep the site running. See our{" "}
          <Link href="/disclaimer">Disclaimer</Link> for full details.
        </p>

        <h2>Who We Are</h2>
        <p>
          {siteName} is run by a small team of writers and researchers who are passionate about
          emerging technology. We believe AI tools are reshaping how people work, create, and learn —
          and we want to make sure everyone has access to clear, unbiased information about them.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a question, correction, or partnership inquiry? We&rsquo;d love to hear from you.
          Visit our <Link href="/contact">Contact page</Link> to reach us.
        </p>
      </div>
    </div>
  );
}
