# Light Theme — Design Spec
**Date:** 2026-04-29
**Project:** OXYGEN Gym & Fitness — Next.js 14 landing page

---

## Overview

Add a demo-only light theme to the existing dark luxury site so the client can compare both options live and choose one. The toggle is a floating button — once the client decides, the unused theme and the toggle are removed.

**Palette chosen:** Cool Modern (C)
- Backgrounds: cool blue-gray (#EFF3F7 / #E5EBF2 / #D8E2ED)
- Text: deep navy (#0D1B2A)
- Accent: cyan electric (#00C8FF) stays as brand colour; darker #0078B4 for interactive uses on light backgrounds

---

## 1. Token System

All theming is driven by CSS custom properties in `globals.css`. A `[data-theme="light"]` block overrides the same variables:

| Variable | Dark | Light | Role |
|---|---|---|---|
| `--black-deep` | `#050505` | `#EFF3F7` | Body / Hero background |
| `--surface-1` | `#0E0E0E` | `#E5EBF2` | Navbar, alternating sections |
| `--surface-2` | `#141414` | `#EFF3F7` | Cards, plan card bg |
| `--surface-3` | `#1A1A1A` | `#D8E2ED` | Borders, hover states |
| `--white` | `#F8F8F8` | `#0D1B2A` | Primary text |
| `--white-muted` | `rgba(248,248,248,0.4)` | `rgba(13,27,42,0.45)` | Secondary text |
| `--white-ghost` | `rgba(248,248,248,0.06)` | `rgba(13,27,42,0.06)` | Subtle overlays / hover fills |
| `--accent-glow` | `rgba(0,200,255,0.15)` | `rgba(0,120,180,0.10)` | Glow effects |
| `--cyan-electric` | `#00C8FF` | `#00C8FF` | Decorative accent (unchanged) |
| `--cyan-dim` | `#0090CC` | `#0078B4` | Interactive accent on light bg |

### Sections that stay dark in both themes
Footer, stats strip (Hero), and the featured plan card keep `#0D1B2A` background in both themes. They act as visual anchors that create contrast even in the light theme.

---

## 2. Implementation Strategy

### 2a. `tailwind.config.ts`
Update all surface/text colour values to reference CSS variables instead of hardcoded hex:
```ts
colors: {
  black: { deep: 'var(--black-deep)' },   // preserves bg-black-deep
  surface: {
    1: 'var(--surface-1)',                 // preserves bg-surface-1
    2: 'var(--surface-2)',
    3: 'var(--surface-3)',
  },
  white: {
    DEFAULT: 'var(--white)',               // preserves text-white, bg-white
    muted: 'var(--white-muted)',
    ghost: 'var(--white-ghost)',
  },
  accent: {
    glow: 'var(--accent-glow)',
  },
}
```
Preserves all existing class names (`bg-black-deep`, `bg-surface-1`, `text-white`, etc.) while making them respond to the active theme automatically.

### 2b. `globals.css`
Add:
1. `[data-theme="light"]` block with all token overrides (table above)
2. Global colour transition: `background-color 400ms ease, color 400ms ease, border-color 400ms ease` on `*` — scoped inside `[data-theme]` to avoid affecting initial load
3. Targeted overrides for hardcoded arbitrary Tailwind values that can't be caught by the config change (e.g. inline `style={}` colour references in components)
4. Scrollbar and selection colours for light theme

### 2c. Components (~20 files)
Replace hardcoded Tailwind arbitrary colour classes with semantic classes:
- `bg-[#050505]` → `bg-black-deep`
- `bg-[#0E0E0E]` → `bg-surface-1`
- `bg-[#141414]` → `bg-surface-2`
- `bg-[#1A1A1A]` → `bg-surface-3`
- `text-[#F8F8F8]` or bare `text-white` (when used as text colour) → stays `text-white` (now a CSS variable)
- Inline `style` colour props that reference hardcoded hex → updated to `var(--token)` references

Key per-component notes:
- **Hero.tsx**: radial vignette gradient uses hardcoded `rgba(5,5,5,…)` → updated to use `var(--black-deep)` with opacity
- **ParticleField.tsx**: particle colour hardcoded to `#00C8FF` with low opacity → in light mode, change to `#0078B4` at slightly higher opacity for visibility on light bg. Achieved via a CSS variable `--particle-color`
- **Plans.tsx `featured-border`**: the `featured-border` CSS class has `background: linear-gradient(#141414, #141414)` hardcoded → update to `var(--surface-2)`
- **Navbar.tsx**: backdrop blur background uses hardcoded dark value → update to `var(--surface-1)`
- **PageReveal.tsx**: reveal overlay is hardcoded `#050505` → update to `var(--black-deep)` so it matches the active theme on load

### 2d. `ThemeToggle.tsx` (new component)
```
Position:  fixed, top-20 right-4, z-50
Size:      36×36px, border-radius 50%
Dark mode: bg rgba(0,200,255,0.12), border rgba(0,200,255,0.3), icon: ☀️ (sun, cyan)
Light mode: bg rgba(13,27,42,0.08), border rgba(13,27,42,0.2), icon: 🌙 (moon, navy)
Tooltip:   "Light theme" / "Dark theme" on hover
Animation: icon cross-fade on theme change (opacity + scale, 300ms)
State:     local React useState, no localStorage (demo only)
On click:  toggle `data-theme="light"` attribute on document.documentElement
```

Added to `app/layout.tsx` so it appears on every page.

---

## 3. Scope Boundaries

**In scope:**
- All 10 sections + Navbar, Footer, PageReveal, ThemeToggle
- ParticleField colour adaptation
- All CSS classes, inline styles, and CSS component utilities

**Out of scope:**
- Images and video content (gym photos stay as-is)
- Font changes
- Layout or spacing changes
- Any new features beyond theming

---

## 4. Removal Plan (after client chooses)

If client keeps dark: delete `ThemeToggle.tsx`, remove its import from `layout.tsx`, delete `[data-theme="light"]` block from `globals.css`. Revert Tailwind config colour values to hex if desired (or leave as CSS variables — no visible difference).

If client keeps light: set `[data-theme="light"]` permanently on `<html>` in `layout.tsx`, delete the toggle component and dark-only CSS, clean up the token block.
