import Link from "next/link";
import AdSlot from "./AdSlot";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      {/* Footer leaderboard ad */}
      <div className="flex justify-center py-4">
        <AdSlot
          slot="0987654321"
          format="leaderboard"
          className="w-full max-w-[728px]"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
