import Link from "next/link";
import AdSlot from "./AdSlot";
import NewsletterSignup from "./NewsletterSignup";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";
const currentYear = new Date().getFullYear();

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "AI Tools", href: "/tools" },
  { label: "Reviews", href: "/reviews" },
  { label: "All Articles", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const CATEGORIES = [
  { label: "Personal Finance", href: "/categories/personal-finance" },
  { label: "Insurance", href: "/categories/insurance" },
  { label: "Health & Wellness", href: "/categories/health-wellness" },
  { label: "Legal", href: "/categories/legal" },
  { label: "Technology", href: "/categories/technology" },
  { label: "AI Tools", href: "/categories/ai-tools" },
  { label: "Productivity", href: "/categories/productivity" },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "RSS Feed",
    href: "/feed.xml",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-24">
      {/* Footer ad strip */}
      <div className="flex justify-center py-4 border-b border-ink-700 bg-ink-800">
        <AdSlot
          slot="0987654321"
          format="leaderboard"
          className="w-full max-w-[728px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About + Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm shrink-0">
                {siteName.charAt(0).toUpperCase()}
              </span>
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-brand-300 transition-colors">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed mb-6">
              Discover and compare the best AI tools. Expert reviews, guides, and a curated directory for AI productivity.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-ink-400 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links + Legal */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-300 mb-3">Quick Links</p>
            <nav className="flex flex-col gap-2 text-sm mb-6">
              {QUICK_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-300 mb-3">Legal</p>
            <nav className="flex flex-col gap-2 text-sm">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Categories */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-300 mb-3">Categories</p>
            <nav className="flex flex-col gap-2 text-sm">
              {CATEGORIES.map((c) => (
                <Link key={c.href} href={c.href} className="hover:text-white transition-colors">
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
