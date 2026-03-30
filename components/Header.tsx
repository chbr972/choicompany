import Link from "next/link";
import AdSlot from "./AdSlot";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Leaderboard ad above nav */}
      <div className="hidden md:flex justify-center py-2 bg-gray-50">
        <AdSlot
          slot="1234567890"
          format="leaderboard"
          className="w-[728px] h-[90px]"
          responsive={false}
        />
      </div>
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-700 hover:text-brand-800">
          {siteName}
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-brand-600 transition-colors">
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
}
