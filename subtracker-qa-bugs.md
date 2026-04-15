# SubTracker — QA Bug Report
**Date:** 2026-04-12
**Audited:** `es.html` (landing page) + `app.html?lang=es` (app)
**Repo:** https://github.com/mr-tinoco/subscription-tracker

---

## 🔴 CRITICAL

### BUG-001 — Budget tab not translated in Spanish mode
**File:** `app.html`
**Trigger:** Load app with `?lang=es` → click "💰 Presupuesto" tab

The entire "Add Expense" form section renders in English despite `?lang=es`. Missing translation keys in the i18n object.

Untranslated strings found:
- Heading: `"➕ Add Expense"` → should be `"➕ Agregar Gasto"`
- Input placeholder: `"Groceries, Gas, Rent..."` → Spanish equivalent
- Input placeholder: `"Add a note..."` → `"Agrega una nota..."`
- Button: `"Add Expense"` → `"Agregar Gasto"`
- Button: `"Cancel"` (in budget form) → `"Cancelar"`
- Empty state: `"Add expenses and subscriptions to see the overview"` → Spanish

**Note:** The heading `"Desglose de Gastos"` IS translated — only the form section was missed.

**Fix:** Find the `es` translation object and add the missing keys for the budget form section.

---

### BUG-002 — Browser tab title stays in English on Spanish mode
**File:** `app.html`
**Trigger:** Load app with `?lang=es`

`<title>` tag renders as `"SubTracker — Your Subscription Budget"` regardless of selected language. The language switch function is not updating `document.title`.

**Fix:** In the language switch function, add:
```js
document.title = lang === 'es'
  ? 'SubTracker — Tu Presupuesto de Suscripciones'
  : 'SubTracker — Your Subscription Budget';
```

---

## 🟠 HIGH

### BUG-003 — Cost field label hardcoded as "Costo (USD)"
**File:** `app.html`
**Trigger:** Switch currency to COP/MXN/ARS → label still reads "Costo (USD)"

The cost input label is hardcoded and not tied to the selected currency state. Same issue in the Burn Rate section — `"🇺🇸 USD"` subtitle stays static regardless of currency selection.

**Fix:** Update the currency switch handler to also update:
- The cost field label (e.g. `"Costo (COP)"`)
- The Burn Rate section currency badge

---

### BUG-004 — Landing page currency counter says "6 Monedas" but shows 5 flags
**File:** `es.html` (and likely `index.html`)
**Location:** Features section + proof bar

Buttons shown: 🇨🇴 COP, 🇲🇽 MXN, 🇦🇷 ARS, 🇨🇷 CRC, 🇨🇱 CLP — no USD, no EUR.
App supports: USD, COP, MXN, ARS, EUR, CRC = 6.

**Fix (option A):** Add 🇺🇸 USD button to the landing page currency proof section.
**Fix (option B):** Change copy from `"6 Monedas"` → `"5 Monedas"` if EUR is not shown intentionally.

---

### BUG-005 — "Pruébalo Gratis" mentioned in steps but button doesn't exist
**File:** `es.html`
**Location:** "Cómo Funciona" section, Step 1

Copy reads: `"Dale clic a 'Pruébala Gratis'"` but the actual CTA button on the page reads `"Dominar mis gastos →"`.

**Fix:** Either rename the CTA button to match the instructions, or update the step copy to reflect the actual button label.

---

## 🟡 MEDIUM

### BUG-006 — Default income placeholder is "$6000" regardless of currency
**File:** `app.html`
**Location:** Budget tab → Monthly Income input

Placeholder is hardcoded to `6000`. For COP users this implies $6,000 COP (~$1.50 USD). Misleading default.

**Fix:** Set placeholder dynamically based on selected currency. Suggested defaults:
- USD: `6000`
- COP: `8000000`
- MXN: `20000`
- ARS: `500000`
- EUR: `5000`
- CRC: `3000000`

---

### BUG-007 — Export CSV enabled with zero subscriptions
**File:** `app.html`
**Location:** Subscriptions tab → "Exportar CSV" button

Button is clickable with no data. Unclear behavior — likely exports empty/header-only CSV with no user feedback.

**Fix:** Disable the button when subscription list is empty, or show a tooltip: `"Agrega suscripciones primero"`.

---

## 🔵 LOW / POLISH

### BUG-008 — `app.html` h1 and browser tab title don't match
**File:** `app.html`
h1 reads: `"Rastreador de Suscripciones"` (Spanish)
Tab title reads: `"SubTracker — Your Subscription Budget"` (English — see BUG-002)

Once BUG-002 is fixed, verify that both are consistent.

---

### BUG-009 — Hidden `type="hidden"` inputs in both forms
**File:** `app.html`
Two hidden inputs found (one in subscription form, one in budget/expense form). Confirm these are edit-mode ID holders and not leaking unexpected state.

**Action:** Code review only — confirm they reset properly when forms are closed/cancelled.

---

### BUG-010 — Footer: "Claude Code" branding unfamiliar to target users
**File:** `es.html`, `index.html`
**Location:** Footer

`"Hecho con ☕ + Claude Code"` — "Claude Code" means nothing to non-technical LATAM users.

**Suggested fix:** `"Hecho con ☕ + IA"` — simpler, on-brand for Normie AI.

---

## ✅ No Issues Found

- Subscriptions tab translation (Spanish) — complete and correct
- Currency selector dropdown — works and updates correctly
- Add Subscription form — all fields render and label correctly in Spanish
- Search + filter bar — labels correct in Spanish
- Language toggle in nav — works
- Bilingual toggle in landing page nav — works
- Empty state messaging in subscriptions tab — correct Spanish

---

## Fix Priority Order

| Priority | Bug | Effort |
|----------|-----|--------|
| 🔴 1 | BUG-001 — Budget tab i18n | ~1 hr |
| 🔴 2 | BUG-002 — Title tag not updating | ~5 min |
| 🟠 3 | BUG-003 — Currency label hardcoded | ~30 min |
| 🟠 4 | BUG-004 — "6 Monedas" vs 5 flags | ~10 min |
| 🟠 5 | BUG-005 — "Pruébalo Gratis" copy mismatch | ~5 min |
| 🟡 6 | BUG-006 — Default income placeholder | ~20 min |
| 🟡 7 | BUG-007 — CSV button with no data | ~15 min |
| 🔵 8 | BUG-009 — Audit hidden inputs | ~10 min |
| 🔵 9 | BUG-010 — Footer copy | ~2 min |

**Note:** Gumroad CTA links are intentionally broken — product not yet listed. Links point to `https://gumroad.com` homepage. Update with real product URL once listed.
