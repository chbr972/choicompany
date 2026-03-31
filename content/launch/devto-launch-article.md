---
title: "I Built 3 Free AI Tools in a Weekend — Here's What I Learned About Prompts, Next.js, and What Actually Gets Traffic"
description: "A practical writeup on building AI Prompt Generator, Text Summarizer, and Comparison Table as free web tools — the technical decisions, prompt engineering choices, and early traffic results."
tags: ["ai", "webdev", "nextjs", "productivity"]
published: true
canonical_url: https://choicompany-site.vercel.app
---

# I Built 3 Free AI Tools in a Weekend — Here's What I Learned

A few months ago I started paying for AI tool subscriptions — ChatGPT Plus, Claude Pro, Perplexity, and a few others. I got good at using them. I also got frustrated that every review site I found was either surface-level or obviously written to earn affiliate commissions.

So I built my own. [AI Tools Hub](https://choicompany-site.vercel.app) — honest reviews, head-to-head comparisons, and free AI mini-tools anyone can use without creating an account.

This is the writeup on the free tools side: how I built them, what technical decisions I made, what I learned about prompt engineering along the way, and what happened when I launched.

---

## What I Built

Three free tools, all live at [choicompany-site.vercel.app](https://choicompany-site.vercel.app):

1. **AI Prompt Generator** — pick a category (writing, coding, marketing, research, learning), get a set of optimized prompts for ChatGPT or Claude, with notes on why each structure works
2. **AI Text Summarizer** — paste long text, get a structured summary with key points and takeaways
3. **AI Tool Comparison Table** — see any two AI tools side by side on consistent evaluation criteria

None of them require an account. None of them have rate limits on the free tier.

---

## The Tech Stack

**Next.js 14 (App Router)** — The App Router's layout system made it straightforward to give the tools a consistent UI while keeping the review content in a separate MDX-based section. Server components for static content, client components only where interactivity was needed.

**Vercel** — Deployed there because of the Next.js integration and the free tier for side projects. Build times are fast enough that I don't think about it.

**MDX for content** — Reviews and comparison articles are written in Markdown with frontmatter for metadata (title, description, verdict, pricing, etc.). I generate structured comparison tables from the frontmatter programmatically so they're consistent across every article without copy-pasting.

**No database (yet)** — For a content site at this scale, the file system is fine. MDX files are the source of truth. When I need user-generated content or personalization, I'll add a database. Not now.

**Tailwind CSS** — Faster for component-level styling than writing CSS from scratch. The design system is intentionally simple — I'm not a designer, and fighting with custom CSS was slowing me down.

---

## What I Learned About Prompt Engineering

Building the Prompt Generator forced me to think systematically about what makes a prompt work. After a few months of daily AI use and a lot of trial and error, I landed on a framework I call **RSCF**:

- **Role** — Tell the AI who to be. "You are a senior B2B content strategist with 10 years of SaaS experience." Role assignment sets tone, vocabulary, and depth automatically.
- **Situation** — Give context. "I'm writing for CTOs who are skeptical of AI hype." The more specific your situation, the more targeted the output.
- **Constraints** — Set guardrails. "No buzzwords. Max 800 words. Use specific examples, not generalities." Constraints force quality — unconstrained prompts produce generic outputs.
- **Format** — Specify the output structure. "Return an outline first; write the full draft after I approve it." This catches direction problems before you're 800 words in.

The difference between a vague prompt and an RSCF prompt is significant. Not subtle — significant. The same model produces dramatically different results based on prompt structure.

The generator applies this framework automatically: each category's prompts are built around a default role, reasonable default constraints for that use case, and an output format appropriate to the task.

**What surprised me:** the "Format" element has an outsized impact. Telling the AI *how* to structure the output — outline first, then draft; bullet points, not paragraphs; table with specific columns — consistently produces more useful results than any other single element.

---

## The No-Affiliate Policy (And Why It Matters for Trust)

Most AI tool review sites are monetized through affiliate commissions — typically 20–40% of the first year's subscription revenue per referral. That's a meaningful amount of money per signup.

The problem: it creates an incentive structure where expensive tools get inflated ratings. A tool paying 30% commission on a $50/mo plan is financially worth more to a reviewer than a better tool paying nothing.

I monetize through display ads instead. Ad revenue scales with traffic, not with which tool a reader chooses to buy. So my incentive is to produce reviews accurate enough that readers come back and share the site — not to push them toward the highest-paying affiliate.

This is the model I chose from day one. It means lower revenue per reader than affiliate commissions would generate — but it means the reviews aren't compromised.

---

## Early Traffic Results

I'm about 30 days into the public launch. Here's the honest breakdown:

**What drove traffic:**

Reddit was the highest-volume source but the shortest session time. People found the Prompt Generator through a Reddit post, used it, and left. Return rate was low from that source.

Google organic traffic was smaller in volume but dramatically more engaged — longer sessions, more pages per visit, lower bounce rate. The comparison articles index well for specific longtail queries like "chatgpt vs claude for writing" and "is jasper worth it for solo creators."

One Hacker News Show HN post got 40+ upvotes and spent 3 hours on the front page. It's still sending trickle traffic weeks later. HN traffic has the longest sessions of any source — people are genuinely reading the reviews.

**What I didn't expect:**

The Prompt Generator has more return visits than any other page. People bookmarked it. That surprised me — I built it as an acquisition tool, but it turned out to be a retention driver.

Generic "best AI tools" articles got almost no traction from search or social. Specific comparisons (ChatGPT vs Claude, Cursor vs GitHub Copilot) do dramatically better. The more specific the comparison and the more specific the audience framing, the better.

**Key lesson:**

"Best AI writing tools" is a dead search keyword — every content site in existence has that post indexed.

"Jasper vs Copy.ai for blog writers who hate content templates" is a query someone actually runs, and a fight worth winning. Specificity wins consistently.

---

## What I'd Do Differently

**Build the tools first, then the content.** I launched the review articles before the free tools were live. In retrospect, the tools drive return visits and bookmarks in a way that articles don't. If I were starting over, I'd build two or three free tools, launch those, and add the content layer once I had an audience.

**Write for a narrower audience from day one.** My early articles were written for "anyone interested in AI tools." The articles that actually get traffic are written for specific use cases and specific types of people. "For blog writers who hate templates" is better than "for writers."

**Treat Reddit karma as infrastructure.** I underinvested in community karma before starting to post links. The subreddits with the most relevant audience (r/ChatGPT, r/productivity) have high karma requirements before link posts get traction. Two weeks of comment-only participation before link posting would have made a difference.

---

## What's Next

Shipping two more free tools (a headline generator and an AI tool recommender quiz), another 10 comparison articles targeting specific longtail keywords, and the first newsletter send to the subscriber list that built up from the tools.

The goal is $10K/month in display ad revenue. That requires significant organic traffic volume — roughly 500K–1M monthly sessions depending on niche CPM. It's a long game. The free tools + honest reviews model is the traffic strategy.

If you're building something similar — a content site, a free tool, a review platform — happy to answer questions in the comments. And if you find the tools useful or the reviews helpful, the site is at [choicompany-site.vercel.app](https://choicompany-site.vercel.app).

---

*The AI Prompt Generator, Text Summarizer, and Comparison Table are all free to use — no account required. Reviews are written after paying for and using each tool for at least 30 days. No affiliate links.*
