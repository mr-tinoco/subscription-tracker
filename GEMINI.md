# SubTracker — Project Context for Gemini

This is Omar's #1 Normie AI product. Read this before any SubTracker work.

## What It Is
SubTracker — a subscription budget tracker for people who lost track of what they're paying for.
Tagline: "Stop throwing money at subscriptions you forgot about."

## Current Status
- V1.2 live at: https://subscription-tracker-alpha-tawny.vercel.app
- #1 blocker: Gumroad listing (copy ready, product live, listing NOT done)
- Price: $12 one-time
- Revenue: $0

## Tech Stack
- Pure vanilla HTML/CSS/JavaScript — no frameworks
- Single page app: index.html (landing) + app.html (the app)
- Dark mode: ✅ built in
- Bilingual EN/ES toggle: ✅ built in
- Deployed via Vercel (mr-tinoco account)
- GitHub repo: mr-tinoco/subscription-tracker

## Key Files
- `index.html` — landing page (dark, budget-focused positioning)
- `app.html` — the actual app
- `screenshot.png` — app screenshot (currently CSS mockup, needs real screenshot)

## Pending (do these before anything new)
1. List on Gumroad — copy at ~/Documents/Claude/Projects/Normie AI HQ/subtracker-marketing-audit.md
2. Replace CSS mockup with real dark-mode screenshot
3. Add Vercel Analytics: `<script defer src="/_vercel/insights/script.js"></script>` in index.html head

## Deployment
```bash
cd ~/Normieai/subscription-tracker
vercel --prod
```
