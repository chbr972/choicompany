"use client";

import { useState, FormEvent } from "react";

interface NewsletterSignupProps {
  variant?: "hero" | "inline";
}

export default function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox to confirm your subscription.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "hero") {
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
          <div className="inline-flex items-center gap-2 bg-brand-500/40 text-brand-100 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Free Weekly Newsletter
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            Personal Finance Tips, Every Week
          </h2>
          <p className="text-brand-200 mb-7 text-base leading-relaxed">
            Join readers who get actionable money-saving strategies and personal finance insights delivered straight to their inbox.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 bg-green-500/20 border border-green-400/30 rounded-2xl px-6 py-4 text-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-brand-300 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors shadow-sm disabled:opacity-60 whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe Free"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-300">{message}</p>
          )}

          <p className="mt-4 text-xs text-brand-300">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    );
  }

  // inline variant (used inside article / blog page)
  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-8 my-10">
      <div className="max-w-lg">
        <h3 className="text-xl font-bold text-ink-900 mb-2 tracking-tight">
          Enjoyed this article?
        </h3>
        <p className="text-ink-500 text-sm mb-5 leading-relaxed">
          Get weekly personal finance tips and money-saving strategies — straight to your inbox. Join our free newsletter.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-700 bg-green-100 rounded-xl px-4 py-3 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-2.5 rounded-xl border border-ink-300 bg-white text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-sm disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing…" : "Get Free Tips"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{message}</p>
        )}

        <p className="mt-3 text-xs text-ink-400">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
