"use client";

import { useState } from "react";

interface Props {
  variant?: "banner" | "inline" | "footer" | "hero";
}

export default function NewsletterSignup({ variant = "banner" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (variant === "footer") {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-2">Newsletter</p>
        {status === "success" ? (
          <p className="text-sm text-brand-400">Check your inbox to confirm your subscription!</p>
        ) : (
          <>
            <p className="text-sm text-ink-400 mb-3">Weekly AI tool reviews and tips, free.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 min-w-0 px-3 py-1.5 rounded-lg text-sm bg-ink-800 border border-ink-600 text-white placeholder-ink-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500 transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "…" : "Join"}
              </button>
            </form>
            {status === "duplicate" && (
              <p className="text-xs text-brand-400 mt-1">You&apos;re already subscribed!</p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400 mt-1">{errorMsg}</p>
            )}
          </>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="my-10 rounded-2xl bg-brand-50 border border-brand-100 px-6 py-7">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
              <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            {status === "success" ? (
              <div>
                <p className="font-semibold text-brand-700 mb-0.5">You&apos;re in!</p>
                <p className="text-sm text-brand-600">Check your inbox to confirm — then expect weekly money tips.</p>
              </div>
            ) : (
              <>
                <p className="font-semibold text-ink-900 mb-0.5">Enjoying this article?</p>
                <p className="text-sm text-ink-500 mb-3">
                  Get weekly AI tool reviews, comparisons, and tips — straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl text-sm border border-ink-200 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
                  >
                    {status === "loading" ? "Subscribing…" : "Subscribe free"}
                  </button>
                </form>
                {status === "duplicate" && (
                  <p className="text-xs text-brand-600 mt-1.5">You&apos;re already subscribed!</p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-500 mt-1.5">{errorMsg}</p>
                )}
                <p className="text-xs text-ink-400 mt-2">No spam, ever. Unsubscribe anytime.</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // banner (default) — used on homepage
  return (
    <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
          </svg>
        </div>
        {status === "success" ? (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">You&apos;re on the list!</h2>
            <p className="text-brand-200 text-lg">Check your inbox to confirm. Weekly tips incoming.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Get weekly AI tool reviews
            </h2>
            <p className="text-brand-200 mb-6 text-lg">
              The latest AI tool reviews, comparisons, and tips — delivered free every week.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto flex-wrap justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-[220px] px-4 py-3 rounded-full text-ink-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 transition-colors shadow-sm disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe free"}
              </button>
            </form>
            {status === "duplicate" && (
              <p className="text-brand-200 text-sm mt-3">You&apos;re already subscribed!</p>
            )}
            {status === "error" && (
              <p className="text-red-300 text-sm mt-3">{errorMsg}</p>
            )}
            <p className="text-brand-300 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </section>
  );
}
