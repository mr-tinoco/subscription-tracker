# Subscription Tracker

**By Normie AI** — Built by Omar Tinoco

Track all your subscriptions in one place. No login. No backend. No nonsense.

---

## What It Does

- Add subscriptions with a name, cost, billing cycle, and category
- See your total monthly spend at a glance
- Edit or delete any subscription at any time
- Export your full list to CSV (opens in Excel, Google Sheets, etc.)
- Search by name or filter by category
- Visual spending breakdown — pie chart + bar chart by category
- Switch between English and Spanish (UI + currency: USD or COP)
- Dark mode

---

## Live App

| Page | URL |
|---|---|
| Landing page | https://subscription-tracker-alpha-tawny.vercel.app |
| Tracker app | https://subscription-tracker-alpha-tawny.vercel.app/app.html |

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI | Vanilla HTML + Tailwind CSS (CDN) |
| Logic | Vanilla JavaScript |
| Charts | Chart.js (CDN) |
| Data | localStorage (no server needed) |
| Hosting | Vercel (free tier) |

No build step. No npm install. No framework. Open `index.html` and it works.

---

## Files

```
subscription-tracker/
├── index.html     # All the UI — layout, forms, buttons
├── script.js      # All the logic — add, edit, delete, filter, export, charts
├── README.md      # This file
├── CLAUDE.md      # Claude Code session context (read by AI assistant)
└── .claude/       # Archived legacy context files (do not edit)
```

---

## Features

### Core
- Add subscription: name, cost, billing cycle (monthly/weekly/yearly), category
- Monthly cost is auto-calculated regardless of billing cycle
- All data saved to `localStorage` — survives page refresh
- Delete any subscription with one click

### V1.1 (Shipped Mar 2026)
- **Edit** — click the edit button on any subscription, change what you want, save
- **Export CSV** — downloads a `.csv` file with all your subscriptions
- **Categories** — 8 options: Entertainment, Software, Utilities, Health, Education, News, Gaming, Other
- **Search** — live search as you type, filters the list instantly
- **Filter by category** — dropdown to show only one category at a time
- **Charts** — pie chart (share by category) + bar chart (spend by category)
- **Dark mode** — toggle in the top-right corner, saved between sessions
- **Spanish mode** — toggle flag to switch full UI to Spanish + convert costs to COP

---

## How to Run Locally

No install required.

```bash
# Option 1 — just open the file
open index.html

# Option 2 — serve it with Python (avoids any browser CORS quirks)
python3 -m http.server 8080
# then go to http://localhost:8080
```

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel detects it's a static site automatically — just click Deploy
4. Done. No config needed.

---

## Monetization

Listed on Gumroad as a one-time purchase.

| Channel | Status |
|---|---|
| Gumroad listing | TBD |
| First sale | $0 (target: ASAP) |
| Price point | $9–19 one-time |

---

## Normie AI

This project is part of the Normie AI product portfolio — tools built for regular people who don't have time to mess with complex software.

GitHub: [@mr-tinoco](https://github.com/mr-tinoco)
