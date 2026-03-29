# CLAUDE.md — SubTracker (Budget Tracker)
> Read this file at the start of every Claude Code session for this project.

---

## 🗂️ Project Identity

**Project:** SubTracker
**Former name:** Subscription Tracker
**Positioning:** Budget tracker that starts with subscriptions
**Owner:** Omar Tinoco (GitHub: mr-tinoco)
**Org:** Normie AI
**Status:** ✅ V1.1 Shipped — V1.2 in progress (landing page rewrite + budget features)
**Repo:** github.com/mr-tinoco/subscription-tracker
**Live URL:** https://subscription-tracker-alpha-tawny.vercel.app

---

## 🎯 Current Mission

V1.1 is live and feature-complete. The next goal is **first paying customer**.

**Positioning note:** SubTracker is NOT just a subscription tracker. SubTracker is a **budget tracker that starts with subscriptions** — because subscriptions are where most people bleed money first.

Every feature, every label, every copy choice reinforces this story:
- "Monthly Budget Impact" not "Total Monthly Cost"
- "Budget clarity" not "Subscription management"
- "See where your budget goes" not "Track your subscriptions"

Priority order:
1. List on Gumroad (if not done — do this first)
2. Share on X + Threads with Normie AI brand voice
3. Iterate based on user feedback (not assumptions)
4. V1.2 features only after first revenue

---

## 🛠️ Tech Stack

- **HTML/CSS/JS** — Vanilla only. No frameworks. No React.
- **Tailwind CSS** — loaded via CDN (no build step needed)
- **Chart.js** — loaded via CDN for pie/bar charts
- **Data layer** — localStorage (no backend)
- **Deployment** — Vercel (free tier)
- **Payments** — Gumroad (or Stripe if Gumroad doesn't fit)
- **Hosting** — Static site

---

## 📂 File Structure

```
subscription-tracker/
├── index.html          # Landing page — public-facing one-pager
├── app.html            # The tracker app — full UI (moved from index.html)
├── script.js           # All app logic (used by app.html)
├── README.md           # Project docs
├── CLAUDE.md           # This file — Claude Code context
└── .claude/            # Legacy context files (read-only archive)
    ├── subscription-tracker-claude-context.md
    └── deployment.md
```

> **Important:** `index.html` is the landing page. The actual app is at `app.html`.
> Vercel serves `index.html` as the root URL `/` and `app.html` at `/app.html`.

---

## ✅ What's Already Built (All Shipped as of Mar 2026)

### MVP Core
- Add subscription (name, cost, billing frequency)
- Display all subscriptions in a list
- Calculate total monthly/weekly/yearly cost
- Delete subscriptions
- Data persistence via localStorage
- Deployed on Vercel

### V1.1 Features (All Shipped)
- **Edit** existing subscriptions (inline edit with cancel)
- **Export to CSV** — downloads all subscriptions as a spreadsheet
- **Categories / tags** — 8 categories with emoji labels (Entertainment, Software, Utilities, Health, Education, News, Gaming, Other)
- **Charts / visualizations** — pie chart + bar chart via Chart.js showing spending by category
- **Search and filter** — live search by name + filter by category dropdown

### Extras Built Beyond V1.1
- **Dark mode** toggle (persisted to localStorage)
- **English / Spanish language toggle** — full UI translation
- **USD ↔ COP currency conversion** — auto-converts when Spanish mode is active (rate: ~4150 COP/USD)
- **Active filter display** — shows tags when search or filter is active

---

## 🔜 V1.2 Ideas (Build ONLY after first revenue)

- Renewal date / next billing date tracking
- Email reminders or browser notifications
- Multi-currency selector beyond USD/COP
- Shareable subscription list (read-only link)
- **Monthly budget limit** — user sets a monthly subscription budget cap; app shows how close they are (e.g. progress bar: "$87 of $100 budget used")
- **"Savings mode"** — mark subscriptions as "considering cancelling"; see projected savings
- **Real screenshot** — replace the CSS mockup on the landing page with an actual screenshot of the app
- **Gumroad listing** — follow the copy in `~/Documents/Claude/Projects/Normie AI HQ/subtracker-marketing-audit.md` for description, title, and feature bullets

---

## 👨‍💻 Developer Context

**Omar's background:**
- Strong: Linux, infrastructure, EDA/CAD tools, systems admin
- Learning: JavaScript, front-end, web dev
- Style: Needs step-by-step guidance. Explain AND show code. Always include exact terminal commands.

**Code preferences:**
- Explain what each piece of code does — don't just dump code
- Simple > clever. Working > perfect. Shipped > optimized.
- If there's an error, explain it in plain English + point to exact file/line
- No jargon without a definition

---

## 🤖 Claude Code Behavior for This Project

When Omar asks for help:
1. State what we're building first
2. Show code with inline comments
3. Give exact test steps
4. Flag common errors proactively

When Omar is stuck:
1. Ask: "What error are you seeing? What were you doing when it broke?"
2. Diagnose in plain English
3. Give the specific fix — file, line, what to change

**Don't:**
- Suggest frameworks (React, Vue, etc.)
- Over-engineer anything
- Add features not on the list
- Give code without explanation

---

## 💰 Monetization Status

| Channel | Status | Notes |
|---|---|---|
| Gumroad listing | TBD | Priority: set this up first |
| First sale | $0 | Target: first $ online ASAP |
| Price point | TBD | Suggest: $9-19 one-time |

---

## 🔗 Related Files

- Full goals spec: `~/ai-stack-setup/templates/personal-goals-spec.md`
- Normie AI brain: `~/ai-stack-logs/NORMIE_AI_BRAIN.md`
- Stack master plan: `~/ai-stack-setup/PLAN.md`
- Session state: `~/ai-stack-logs/CURRENT_STATE.md`

---

*Last updated: 2026-03-28 by Claude Code*
*This is the primary context file. The .claude/ folder files are archived legacy context.*
