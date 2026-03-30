import Link from "next/link";
import AdSlot from "./AdSlot";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export default function Header() {
  return (
    <header className="bg-white border-b border-ink-200 sticky top-0 z-50 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      {/* Leaderboard ad strip */}
      <div className="hidden md:flex justify-center py-2 bg-ink-50 border-b border-ink-100">
        <AdSlot
          slot="1234567890"
          format="leaderboard"
          className="w-[728px] h-[90px]"
          responsive={false}
        />
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label={siteName}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm select-none shrink-0">
            {siteName.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors tracking-tight">
            {siteName}
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-all"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="px-3 py-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-all"
          >
            AI Tools
          </Link>
          <Link
            href="/compare"
            className="px-3 py-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-all"
          >
            Compare
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-all"
          >
            Articles
          </Link>
        </div>
      </nav>
    </header>
  );
}
