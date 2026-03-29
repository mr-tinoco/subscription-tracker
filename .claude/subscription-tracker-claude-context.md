# Subscription Tracker - Claude Code Project Context

## 📋 PROJECT OVERVIEW

**Project Name:** Subscription Tracker MVP  
**Developer:** Omar Tinoco (mr_tinoco)  
**Skill Level:** Learning to code (strong in Linux infra, learning JavaScript)  
**Goal:** Ship first product by January 5, 2026  
**Tech Stack:** Vanilla JavaScript, HTML, CSS (no frameworks)

---

## 🎯 PROJECT MISSION

Build a simple web app where users can:
1. Add subscriptions (name, cost, billing frequency)
2. See list of all subscriptions
3. Calculate total monthly cost
4. Export data (CSV or print)

**Ship date:** January 5, 2026  
**Philosophy:** MVP > Perfect. Ship fast, iterate later.

---

## 👨‍💻 DEVELOPER CONTEXT (IMPORTANT)

### My Background:
- **Strong:** Linux, infrastructure, EDA/CAD tools, systems admin
- **Learning:** JavaScript, web development, front-end
- **Experience:** Can read code, but need guidance on implementation
- **Work tools:** Claude Code (now mandatory at AMD), Cursor

### What I Need Help With:
✅ Infrastructure setup (file structure, deployment, Git)
✅ JavaScript best practices and syntax
✅ How to connect HTML/CSS/JS together
✅ Step-by-step implementation guidance
✅ Debugging errors (explain what they mean)
✅ Deployment to hosting (Vercel/Netlify)

### What I Can Handle:
✅ Following clear instructions
✅ Understanding logic/concepts once explained
✅ Linux commands and terminal
✅ Git basics (commit, push, pull)
✅ Reading documentation (if pointed to it)

---

## 🛠️ CODING STYLE PREFERENCES

**When helping me code:**

1. **Explain AND show code**
   - Don't just give me code
   - Explain what each part does
   - Use comments in the code

2. **Start simple, add complexity later**
   - Build working version first
   - Optimize/refactor after it works
   - No premature optimization

3. **Hand-holding on infrastructure**
   - Assume I don't know file structure conventions
   - Explain where files should go and why
   - Show me the command to run, don't assume I know

4. **Error messages → plain English**
   - When I paste an error, explain it simply
   - Tell me exactly what file and line to look at
   - Give me the specific fix

5. **No jargon without explanation**
   - If you use technical term, define it once
   - "DOM" → "Document Object Model (the HTML structure)"
   - Link to docs when helpful

---

## 📂 PROJECT STRUCTURE

```
subscription-tracker/
├── .git/                  # Git repository
├── index.html            # Main HTML file (UI)
├── styles.css            # Styling
├── app.js                # Main JavaScript logic
├── .gitignore            # Ignore node_modules, etc.
├── README.md             # Project documentation
└── .claude/              # Claude Code context files
    ├── project-context.md (this file)
    ├── build-log.md      # Daily build notes
    └── deployment.md     # Deployment instructions
```

**Current Status:** Starting from scratch (Dec 21, 2025)

---

## 🎯 FEATURE REQUIREMENTS

### MVP Features (Must Have):
1. ✅ Add subscription form
   - Input: Subscription name (text)
   - Input: Monthly cost (number)
   - Input: Billing frequency (dropdown: Monthly, Yearly)
   - Button: "Add Subscription"

2. ✅ Display subscriptions
   - Show all added subscriptions in a list
   - Display: Name, cost, frequency
   - Calculate and show total monthly cost

3. ✅ Data persistence
   - Use localStorage (no database yet)
   - Data persists on page reload
   - Simple, no backend needed

4. ✅ Basic styling
   - Clean, functional UI
   - Mobile responsive (basic)
   - No need for fancy animations

5. ✅ Delete subscription
   - Button to remove each subscription
   - Updates total cost automatically

### V1.1 Features (After MVP Ships):
- Edit subscriptions
- Export to CSV
- Categories/tags
- Charts/visualizations
- Search/filter

**Focus:** Ship MVP first. Everything else is V1.1+

---

## 🚀 DEVELOPMENT APPROACH

### Build Order:
1. **Day 1 (Dec 21):** HTML structure + basic form
2. **Day 2 (Dec 22):** localStorage save/load + display list
3. **Day 3 (Dec 26):** Calculate total + delete functionality
4. **Day 4 (Dec 27):** Basic styling (make it presentable)
5. **Day 5 (Dec 28):** Testing + bug fixes
6. **Day 6 (Dec 29):** Polish + final testing
7. **Day 7 (Jan 2):** Deployment setup (Vercel)
8. **Day 8 (Jan 3):** Landing page + payment (Gumroad)
9. **Day 9 (Jan 4):** Final testing + marketing prep
10. **Day 10 (Jan 5):** LAUNCH

### Daily Sessions:
- Weekdays: 2 hours (8-10 PM)
- Weekends: 4 hours (8 AM-12 PM)
- Commit code at end of each session
- Log progress in build-log.md

---

## 🤖 HOW TO HELP ME (CLAUDE CODE INSTRUCTIONS)

### When I Ask for Code:

**Format your responses like this:**

```
Here's what we're building: [explain the feature]

The code does this:
1. [Step 1 explanation]
2. [Step 2 explanation]
3. [Step 3 explanation]

Here's the code:

[code block with inline comments]

To test it:
1. [Instruction]
2. [Instruction]

Common issues you might see:
- [Potential error 1 and how to fix]
- [Potential error 2 and how to fix]
```

### When I'm Stuck:

**Ask me:**
1. "What error message are you seeing? (paste it)"
2. "What file are you working in?"
3. "What were you trying to do when it broke?"

**Then provide:**
1. Explanation of what's wrong (plain English)
2. Exact fix (which file, which line)
3. Why it happened (so I learn)

### When I Need Infrastructure Help:

**Don't assume I know. Tell me:**
- Exact terminal commands to run
- Which directory to run them from
- What each command does
- What success looks like

**Example (GOOD):**
```
To start a local server:

1. Open terminal
2. Navigate to your project folder:
   cd ~/projects/subscription-tracker

3. Run this command:
   npx http-server -p 8080

4. You should see: "Server running at http://localhost:8080"
5. Open that URL in your browser

What this does: Creates a local web server so you can test your app
Why we need it: Some features (like localStorage) need a server
```

**Example (BAD):**
```
Just spin up a server and test it.
```

---

## 🔧 TECH STACK DETAILS

### HTML:
- Semantic HTML5
- Accessible (basic ARIA labels)
- Form validation (HTML5 attributes)

### CSS:
- Option A: Plain CSS (simplest)
- Option B: Tailwind CDN (if I want utility classes)
- Mobile-first approach
- Flexbox for layout

### JavaScript:
- Vanilla JS (no jQuery, no frameworks)
- ES6 syntax (const, let, arrow functions)
- localStorage for data
- Event listeners for interactivity

### Deployment:
- Vercel or Netlify (free tier)
- GitHub for version control
- Custom domain if cheap (<$15/year)

### Payment:
- Gumroad (simplest setup)
- Alternative: Stripe if time permits

---

## 📊 SUCCESS METRICS

**Code Quality:**
- ✅ Works on Chrome, Firefox, Safari
- ✅ Mobile responsive (iPhone, Android)
- ✅ No console errors
- ✅ Data persists correctly
- ✅ Can demo in under 2 minutes

**Learning Metrics:**
- ✅ I understand what the code does
- ✅ I can explain main functions
- ✅ I can fix simple bugs myself
- ✅ I can add small features independently

**Shipping Metrics:**
- ✅ Deployed at live URL
- ✅ Listed for sale (Gumroad/Stripe)
- ✅ Can share link and people can buy
- ✅ First $ earned online

---

## 🚫 WHAT NOT TO DO

**Don't:**
- ❌ Suggest frameworks (React, Vue, etc.) - too complex for MVP
- ❌ Over-engineer - simple solutions only
- ❌ Optimize prematurely - make it work first
- ❌ Add features not in MVP list - ship first, iterate later
- ❌ Use jargon without explanation
- ❌ Assume I know file structure conventions
- ❌ Give me code without explaining it

**Do:**
- ✅ Keep it simple (vanilla JS)
- ✅ Explain as you go
- ✅ Show me the exact commands
- ✅ Hand-hold on infrastructure
- ✅ Celebrate small wins
- ✅ Encourage shipping > perfecting

---

## 📝 DAILY BUILD LOG FORMAT

After each session, I'll update build-log.md:

```
## Session [N] - [Date]
**Time:** [Start] - [End] ([X] hours)
**Goal:** [What I planned to build]
**Built:** [What I actually built]
**Learned:** [New concepts/skills]
**Blockers:** [What slowed me down]
**Next:** [Tomorrow's focus]
**Commits:** [GitHub commit links]
```

This helps me track progress and creates content for Normie AI.

---

## 🎯 CURRENT SESSION CONTEXT

**Today's Date:** [Auto-populated by Claude Code]
**Current Feature:** [I'll update this each session]
**Blockers:** [I'll note any issues here]
**Questions:** [Things I need to ask]

---

## 🔗 USEFUL REFERENCES

**For Me to Learn From:**
- MDN Web Docs: https://developer.mozilla.org
- JavaScript.info: https://javascript.info
- CSS Tricks: https://css-tricks.com

**Tools:**
- GitHub Repo: [I'll add URL after creating]
- Live URL: [I'll add after deployment]
- Gumroad: [I'll add after setup]

---

## 💬 COMMUNICATION STYLE

**I prefer:**
- ✅ Direct, clear instructions
- ✅ Step-by-step guidance
- ✅ Explain the "why" behind decisions
- ✅ Celebrate progress ("Great! That works!")
- ✅ Encourage shipping ("Good enough for V1!")

**I don't need:**
- ❌ Long theoretical explanations
- ❌ Multiple options (just tell me the simplest)
- ❌ Advanced optimization tips (save for later)

---

## 🚀 FINAL NOTES

**Remember:**
- I'm learning to code while building this
- I need hand-holding on infrastructure/setup
- Ship > Perfect (always)
- Vanilla JavaScript only (no frameworks)
- Explain errors in plain English
- Guide me step-by-step
- This is my first shipped product

**My commitment:**
- Show up and build daily
- Ask when stuck (don't spend >30 min stuck)
- Commit code after each session
- Ship by January 5, 2026

Let's build this! 🚀

---

**Last Updated:** December 19, 2025
**Status:** Ready to start building tomorrow (Dec 21)
