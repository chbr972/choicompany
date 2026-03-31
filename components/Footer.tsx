import Link from "next/link";
import AdSlot from "./AdSlot";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";
const currentYear = new Date().getFullYear();

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
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand block */}
          <div className="flex-1 max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm shrink-0">
                {siteName.charAt(0).toUpperCase()}
              </span>
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-brand-300 transition-colors">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed">
              Discover and compare the best AI tools. Expert reviews, guides, and a curated directory for AI productivity.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-1">Explore</p>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/tools" className="hover:text-white transition-colors">AI Tools</Link>
            <Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Articles</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
