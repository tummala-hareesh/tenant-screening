# Design System — LEASE

## Product Context
- **What this is:** Free, private, browser-only Ontario landlord toolkit — screen applicants, generate the Standard Lease (Form 2229E), file LTB notices (N4/N5/N7/N8/N12/N13).
- **Who it's for:** Ontario small landlords (1–5 units). Solo. Often checking their phone after a stressful call from a tenant.
- **Space/industry:** Ontario residential tenancy — legal/compliance tooling for non-professionals.
- **Project type:** Single HTML file web app. No build step, no backend, no accounts. All data in localStorage.

## North Star
> "A fellow landlord built this for me — it just gets it."

Warmth alongside authority. Not a government compliance portal. Not a startup SaaS. A trusted colleague's working notebook. Every design decision should serve peer credibility and legal trustworthiness simultaneously.

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian with warm humanity
- **Decoration level:** Intentional — the ink-stamp motif, IBM Plex Mono labels, and ruled-line borders do all the decorative work. No blobs, no gradients, no icons-in-circles.
- **Mood:** A well-worn legal notepad. Structured and functional, but the warm paper tone and gold accent remind you a real person made this — someone who has sat across from a difficult tenant and needed the right form.
- **Anti-patterns to avoid:** Purple gradients, 3-column feature grids with icons in coloured circles, centered-everything layouts, generic SaaS card patterns, system-ui as body font.

## Typography

- **Display/Brand:** Source Serif 4 — earns authority. Used for the brand name, section headings, and panel titles. Weight 600.
- **Body/UI:** Instrument Sans — warm enough to feel human, structured enough for compliance data. Replaces IBM Plex Sans. Weight 400/500/600.
- **Labels/Codes/Mono:** IBM Plex Mono — the voice of the legal/compliance layer. Used for field labels (uppercase, letter-spaced), step numbers, status codes, and form identifiers. Weight 400/500.
- **Loading:** Google Fonts CDN — `Instrument+Sans:wght@400;500;600`, `IBM+Plex+Mono:wght@400;500`, `Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500`

### Type scale
| Token | Size | Usage |
|---|---|---|
| --t-xs  | 11px | Mono labels, field labels, chip text, footnotes |
| --t-sm  | 13px | Hints, secondary text, table cells, small buttons |
| --t-md  | 15px | Body default |
| --t-lg  | 18px | Panel headings (h3) |
| --t-xl  | 22px | Brand name, section headings (h2) |
| --t-2xl | 28px | Display/hero text |

## Color

- **Approach:** Restrained — one accent (gold), used only for interactive affordances. Never as body text.

| Token | Hex | Usage |
|---|---|---|
| --ink | #1C2B39 | Primary text, nav background, button fill |
| --ink-light | #2E4358 | Secondary ink, hover states on dark surfaces |
| --paper | #EFEBE3 | Page background |
| --raised | #F8F5EF | Panel/card background |
| --gold | #D9B77A | **The single interactive accent** — button hover, input focus ring, active stepper border, LTB notices button |
| --gold-dark | #B8953A | Gold on dark backgrounds, pressed states |
| --line | #C9C2B3 | Borders, dividers, inactive states |
| --muted | #6b6659 | Secondary text, labels, hints |
| --green | #3F6B54 | Pass / met / success |
| --red | #9A3324 | Concern / fail / danger / stamp |
| --amber | #B8863F | Review / warning / notice forms |

### Accessibility
- Ink (#1C2B39) on paper (#EFEBE3): **10.2:1** — WCAG AAA ✓
- Gold (#D9B77A) on paper (#EFEBE3): **2.8:1** — below AA for small text
- **Rule:** Gold MUST only appear on interactive elements (buttons, focus rings, hover states, border accents) — never as body text or link colour. Gold on --ink background = 4.6:1, meets AA for large text ✓

### Dark mode
When implemented: invert --paper to #131E28, --raised to #1A2736, --line to #2E3E50, --muted to #8A9AAA. Reduce gold saturation 15% in dark mode.

## Spacing

- **Base unit:** 8px
- **Density:** Comfortable — not compact (data is dense enough), not spacious (users are working, not browsing)

| Token | Value | Usage |
|---|---|---|
| --sp-1 | 4px | Tight gaps (label to value, icon to text) |
| --sp-2 | 8px | Default element gap |
| --sp-3 | 12px | Panel section gap |
| --sp-4 | 16px | Panel padding |
| --sp-5 | 24px | Between major blocks |
| --sp-6 | 32px | Section gap |
| --sp-7 | 48px | Large section separation |
| --sp-8 | 64px | Page-level separation |

**Rule:** All padding and gap values must be multiples of 4px. Panels use 16px padding. Rows use 12px gap. No arbitrary pixel values.

## Layout

- **Approach:** Grid-disciplined — predictable, data-dense, trust-building.
- **Grid:** 290px sidebar + fluid main content, max-width 1200px, 16px outer padding.
- **Mobile (≤820px):** Single column. Sidebar stacks above main. Stepper goes horizontal-scroll. Panels lose 4px padding.
- **Border radius:**
  - Default UI elements: 3px (--radius-sm)
  - Panels and cards: 4px (--radius-md)
  - Pills and chips: 9999px (--radius-pill)
  - No large rounded corners — this is a legal tool, not a consumer app.

## Motion

- **Approach:** Minimal-functional. Animation aids comprehension, never decorates.
- **The one expressive moment:** The ink-stamp rotation animation on criteria lock. Keep it. It earns its place as the product's single personality beat.
- **Everything else:** 150ms ease-out only. No bouncing, no sliding panels, no scroll-driven animation.

| Duration | Value | Usage |
|---|---|---|
| micro | 50–100ms | Focus rings, hover border changes |
| short | 150ms | Button states, panel transitions |
| medium | 250ms | Toast notifications, modal appear |

## Components

### Buttons
- **Primary:** `background: --ink; color: #F8F5EF; border: 1px solid #F8F5EF`
  - Hover: `background: --gold; color: --ink; border-color: --gold`
- **Gold (accent):** `background: transparent; color: --gold; border: 1px solid --gold`
  - Hover: `background: --gold; color: --ink`
  - Used for: LTB Notices nav button only
- **Ghost:** `background: transparent; color: --ink; border: 1px solid --line`
  - Hover: `border-color: --ink`
- **Danger:** `background: transparent; color: --red; border: 1px solid --red`

### Form fields
- Border: `1px solid --line`; focus: `1px solid --gold; box-shadow: 0 0 0 2px rgba(217,183,122,.2)`
- Labels: IBM Plex Mono, --t-xs, uppercase, letter-spacing .06em, color --muted
- Disabled: `background: #ece8de; color: --muted`

### Chips
Font: IBM Plex Mono, --t-xs, weight 600, letter-spacing .04em, border-radius --radius-pill, color #fff.
- Pass: `background: --green`
- Fail/Concern: `background: --red`
- Review: `background: --amber`
- Incomplete/Pending: `background: #8a8576`

### Outcome bars
Left border accent (5px), background --raised, --radius-sm. Border colours map to chip colours.

### Stamps
IBM Plex Mono, --t-xs, border 2px solid (--red for locked/concern, --green for approved), `transform: rotate(-2deg)`, letter-spacing .08em.

### Stepper steps
Active step: `border-bottom-color: --gold` (not --ink). Done step: `border-bottom-color: --green`. The gold border is the visual signal that "this is where you are."

### Section labels (sec-no)
IBM Plex Mono, --t-xs, uppercase, letter-spacing .08em, color --muted.

## Additional Recommendations (to implement)

1. **Font upgrade** — Replace IBM Plex Sans with Instrument Sans in Google Fonts link and body font-family CSS.
2. **Gold as interactive language** — Button hover states, input focus rings, active stepper border-bottom all use --gold consistently.
3. **Welcome panel** — Dismissible first-run panel stored in localStorage explaining the 3 pillars. Reinforces the peer-built story.
4. **Footer trust signal** — App footer (not PDF): "Your data never leaves your browser. No account. No server. PIPEDA-compliant by design."

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-10-21 | Instrument Sans replaces IBM Plex Sans as body font | Warmer than IBM Plex Sans; reinforces 'peer-built' north star without sacrificing structure |
| 2026-10-21 | Gold (#D9B77A) established as the single interactive accent | Creates a recognisable visual language unique to LEASE; gold is restricted to interactive elements only (accessibility) |
| 2026-10-21 | Industrial/Utilitarian with warm humanity aesthetic chosen | Matches 'serious legal tool built by a real landlord' — not a government portal, not a startup SaaS |
| 2026-10-21 | Initial design system created | Created by /design-consultation based on office-hours output, existing codebase analysis, and north-star conversation |
