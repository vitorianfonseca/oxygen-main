# Light Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a demo-only light theme (Cool Modern palette) with a floating toggle button so the client can compare dark and light versions live.

**Architecture:** CSS custom properties drive all theming — adding `data-theme="light"` to `<html>` activates a variable override block in `globals.css`. Tailwind config references RGB-triplet CSS variables for full opacity-modifier support. A `ThemeToggle` floating button manages the `data-theme` attribute with no persistence. Footer and Plans featured card stay hardcoded dark as visual anchors.

**Tech Stack:** Next.js 14, Tailwind CSS v3, CSS custom properties (`data-theme` attribute), Framer Motion (existing), Lucide React (existing).

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `app/globals.css` | Modify | Add RGB triplet vars, `[data-theme="light"]` block, transition helper, nav/overlay CSS vars, hero vignette class |
| `tailwind.config.ts` | Modify | Colors reference `rgb(var(--color-X) / <alpha-value>)` for opacity-modifier support |
| `components/ThemeToggle.tsx` | **Create** | Floating toggle button (Sun/Moon), manages `data-theme` on `<html>` |
| `app/layout.tsx` | Modify | Add ThemeToggle, replace `bg-[#050505]` on body |
| `components/Hero.tsx` | Modify | Swap hardcoded bg/text to semantic classes + CSS vars |
| `components/ParticleField.tsx` | Modify | Theme-aware particle colours via MutationObserver + key remount |
| `components/Navbar.tsx` | Modify | Inline rgba styles → CSS vars; SVG text fill → CSS var |
| `components/IdentityStrip.tsx` | Modify | bg class + inline status colours → CSS vars |
| `components/Manifesto.tsx` | Modify | bg + text classes |
| `components/Services.tsx` | Modify | Card bg, text, inline colour |
| `components/Experience.tsx` | Modify | bg + text classes |
| `components/Classes.tsx` | Modify | bg classes + inline day-tab colour |
| `components/Trainers.tsx` | Modify | bg + hover bg + text classes |
| `components/SocialMarquee.tsx` | Modify | bg classes |
| `components/Plans.tsx` | Modify | Non-featured card bg only (featured card stays dark) |
| `components/ClosingCTA.tsx` | Modify | bg + text classes |
| `components/FAQ.tsx` | Modify | bg + text classes |
| `components/PageReveal.tsx` | Modify | bg class |
| `components/WhatsAppButton.tsx` | Modify | bg + text classes |
| `components/CookieBanner.tsx` | Modify | bg + text classes |

---

## Task 1: CSS Token Foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

### Context
Tailwind opacity modifiers (`text-white/50`) require colours defined as `rgb(var(--X) / <alpha-value>)`. We add new `--color-X` RGB-triplet variables alongside the existing hex `--X` variables. The `[data-theme="light"]` block overrides both. Framer Motion is unaffected because we scope colour transitions only during the toggle (via a helper class added in Task 2).

- [ ] **Step 1: Add RGB triplet variables and light theme block to `:root` and add `[data-theme="light"]` override in `globals.css`**

In `app/globals.css`, inside `@layer base { :root { ... } }`, add after the existing variables:

```css
/* RGB triplets for Tailwind opacity-modifier support */
--color-black-deep: 5 5 5;
--color-surface-1: 14 14 14;
--color-surface-2: 20 20 20;
--color-surface-3: 26 26 26;
--color-white: 248 248 248;

/* UI component tokens */
--nav-pill-bg: rgba(14, 14, 14, 0.85);
--nav-border: rgba(248, 248, 248, 0.06);
--overlay-bg: rgba(5, 5, 5, 0.98);
```

- [ ] **Step 2: Add the `[data-theme="light"]` block to `globals.css` after the `@layer base` closing brace**

```css
[data-theme="light"] {
  /* Hex variables */
  --black-deep: #EFF3F7;
  --surface-1: #E5EBF2;
  --surface-2: #EFF3F7;
  --surface-3: #D8E2ED;
  --white: #0D1B2A;
  --white-muted: rgba(13, 27, 42, 0.45);
  --white-ghost: rgba(13, 27, 42, 0.06);
  --accent-glow: rgba(0, 120, 180, 0.10);
  --cyan-dim: #0078B4;

  /* RGB triplets */
  --color-black-deep: 239 243 247;
  --color-surface-1: 229 235 242;
  --color-surface-2: 239 243 247;
  --color-surface-3: 216 226 237;
  --color-white: 13 27 42;

  /* UI component tokens */
  --nav-pill-bg: rgba(229, 235, 242, 0.88);
  --nav-border: rgba(13, 27, 42, 0.08);
  --overlay-bg: rgba(239, 243, 247, 0.98);
}

/*
 * Permanently dark sections — reset colour variables back to dark values
 * so text-white/X classes remain light-on-dark inside these elements.
 * Footer stays #050505; Plans featured card stays #141414.
 */
[data-theme="light"] footer,
[data-theme="light"] .featured-border {
  --color-white: 248 248 248;
  --white: #F8F8F8;
  --white-muted: rgba(248, 248, 248, 0.4);
  --white-ghost: rgba(248, 248, 248, 0.06);
}
```

- [ ] **Step 3: Add `.hero-vignette` and `.theme-transitioning` classes to `globals.css` inside `@layer utilities`**

```css
/* Hero vignette — theme-aware */
.hero-vignette {
  background: radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 5, 0.7) 100%);
}
[data-theme="light"] .hero-vignette {
  background: radial-gradient(ellipse at center, transparent 40%, rgba(239, 243, 247, 0.7) 100%);
}

/* Applied by ThemeToggle only during switch — prevents Framer Motion interference */
.theme-transitioning *,
.theme-transitioning *::before,
.theme-transitioning *::after {
  transition: background-color 400ms ease, color 400ms ease, border-color 400ms ease !important;
}
```

- [ ] **Step 4: Update scrollbar and selection styles in `globals.css` for light theme**

After the existing `::-webkit-scrollbar-track` block, add:

```css
[data-theme="light"] ::-webkit-scrollbar-track {
  background: #E5EBF2;
}

[data-theme="light"] ::selection {
  background: rgba(0, 120, 180, 0.2);
  color: #0D1B2A;
}
```

- [ ] **Step 5: Update `tailwind.config.ts` colours to use CSS variable references**

Replace the `colors` block inside `theme.extend` with:

```ts
colors: {
  cyan: {
    electric: '#00C8FF',
    dim: 'var(--cyan-dim)',
  },
  black: {
    deep: 'rgb(var(--color-black-deep) / <alpha-value>)',
  },
  surface: {
    1: 'rgb(var(--color-surface-1) / <alpha-value>)',
    2: 'rgb(var(--color-surface-2) / <alpha-value>)',
    3: 'rgb(var(--color-surface-3) / <alpha-value>)',
  },
  white: {
    DEFAULT: 'rgb(var(--color-white) / <alpha-value>)',
    muted: 'var(--white-muted)',
    ghost: 'var(--white-ghost)',
  },
  accent: {
    glow: 'var(--accent-glow)',
  },
},
```

- [ ] **Step 6: Verify the dev server compiles without errors**

```bash
cd /Users/vitoriafonseca/Desktop/nexa/projetos/oxygen && npm run dev
```
Expected: server starts on localhost:3000, no compilation errors in terminal.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add light theme CSS token system and Tailwind variable wiring"
```

---

## Task 2: ThemeToggle Component

**Files:**
- Create: `components/ThemeToggle.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/ThemeToggle.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  const toggle = () => {
    const next = !isLight
    document.documentElement.classList.add('theme-transitioning')
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 450)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    setIsLight(next)
  }

  return (
    <button
      onClick={toggle}
      title={isLight ? 'Dark theme' : 'Light theme'}
      className="fixed top-20 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        background: isLight ? 'rgba(13,27,42,0.08)' : 'rgba(0,200,255,0.12)',
        border: isLight ? '1px solid rgba(13,27,42,0.2)' : '1px solid rgba(0,200,255,0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'background 300ms ease, border 300ms ease',
      }}
      data-hover="true"
      aria-label={isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
    >
      {isLight
        ? <Moon size={15} strokeWidth={1.5} color="#0D1B2A" />
        : <Sun size={15} strokeWidth={1.5} color="#00C8FF" />
      }
    </button>
  )
}
```

- [ ] **Step 2: Add `ThemeToggle` to `app/layout.tsx` and fix the hardcoded body class**

In `app/layout.tsx`:
1. Add import: `import ThemeToggle from '@/components/ThemeToggle'`
2. Change `<body className="bg-[#050505] font-inter antialiased">` → `<body className="bg-black-deep font-inter antialiased">`
3. Add `<ThemeToggle />` as first child inside `<body>`:

```tsx
<body className="bg-black-deep font-inter antialiased">
  <ThemeToggle />
  <SmoothScroll />
  <CustomCursor />
  <ScrollProgress />
  {children}
</body>
```

- [ ] **Step 3: Open localhost:3000 and verify the toggle button appears top-right**

Toggle it — the button background and icon should switch (sun ↔ moon). The page colours won't change yet (components still use hardcoded classes). No JS errors in console.

- [ ] **Step 4: Commit**

```bash
git add components/ThemeToggle.tsx app/layout.tsx
git commit -m "feat: add ThemeToggle floating button and wire to layout"
```

---

## Task 3: Hero + ParticleField

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/ParticleField.tsx`

### Hero changes

- [ ] **Step 1: Update `components/Hero.tsx`**

Apply all of these changes:

1. Line 10 — loading fallback: `bg-[#050505]` → `bg-black-deep`
2. Line 16–18 — heroWords `color: '#F8F8F8'` → `color: 'var(--white)'`:
```tsx
const heroWords = [
  { text: 'RESPIRA.', color: 'var(--white)', delay: 0.5 },
  { text: 'TRANSPIRA.', color: 'var(--white)', delay: 0.7 },
  { text: 'EVOLUI.', color: null, shimmer: true, delay: 0.9 },
]
```
3. Line 36 — section: `bg-[#050505]` → `bg-black-deep`
4. Line 44–49 — vignette inline style → className:
```tsx
<div className="absolute inset-0 z-[1] pointer-events-none hero-vignette" />
```
(remove the `style` prop entirely — the CSS class handles both themes)

- [ ] **Step 2: Update `components/ParticleField.tsx` to detect theme and remount on change**

Replace the entire file with:

```tsx
'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function buildOptions(isLight: boolean, isMobile: boolean) {
  const particleColor = isLight
    ? ['#0078B4', '#005A8A', '#0095CC']
    : ['#00C8FF', '#0090CC', '#60d8f8']
  const linkColor = isLight ? '#0078B4' : '#00C8FF'
  const linkOpacity = isLight ? 0.2 : 0.12

  const base = {
    color: { value: particleColor },
    links: { enable: true, color: linkColor, opacity: linkOpacity, width: 0.8 },
    move: {
      enable: true,
      direction: 'top' as const,
      random: true,
      straight: false,
      outModes: { default: 'out' as const },
    },
    opacity: {
      value: { min: 0.06, max: isLight ? 0.45 : 0.55 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: {
      value: { min: 0.5, max: 2.8 },
      animation: { enable: true, speed: 1.5, sync: false },
    },
    shape: { type: 'circle' },
  }

  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      ...base,
      number: { value: isMobile ? 45 : 95, density: { enable: true } },
      links: { ...base.links, distance: isMobile ? 110 : 155 },
      move: {
        ...base.move,
        speed: isMobile ? 0.5 : { min: 0.3, max: 1.0 },
      },
    },
    interactivity: {
      detectsOn: 'canvas' as const,
      events: { onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
      modes: {
        repulse: isMobile
          ? { distance: 70, duration: 0.4, factor: 2, speed: 0.8 }
          : { distance: 125, duration: 0.5, factor: 3, speed: 1 },
      },
    },
    detectRetina: true,
  }
}

export default function ParticleField() {
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setIsLight(document.documentElement.getAttribute('data-theme') === 'light')

    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light')
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))

    return () => observer.disconnect()
  }, [])

  if (!ready) return null

  return (
    <Particles
      key={isLight ? 'light' : 'dark'}
      id="oxygen-particles"
      className="absolute inset-0 w-full h-full"
      options={buildOptions(isLight, isMobile)}
    />
  )
}
```

- [ ] **Step 3: Toggle theme on localhost:3000 — verify Hero background flips and particles change colour**

Expected: dark → light gives blue-gray background, darker blue particles. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx components/ParticleField.tsx
git commit -m "feat: theme-aware Hero background and particle colours"
```

---

## Task 4: Navbar

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Update `components/Navbar.tsx`**

Apply all of these changes:

1. Line 31 — SVG O2Logo `<text>` fill: `fill="#F8F8F8"` → `style={{ fill: 'var(--white)' }}` (remove the `fill` attribute):
```tsx
<text x="22" y="26" textAnchor="middle" fontSize="16" fontWeight="700"
  style={{ fill: 'var(--white)' }}
  fontFamily="var(--font-space-grotesk), sans-serif">O</text>
```

2. Line 35 — logo text: `text-[#F8F8F8]` → `text-white`

3. Lines 58–64 — nav pill inline styles:
```tsx
style={{
  background: 'var(--nav-pill-bg)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid var(--nav-border)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
}}
```

4. Line 70 — links: `hover:text-[#F8F8F8]` → `hover:text-white`

5. Line 106 — mobile overlay style:
```tsx
style={{ background: 'var(--overlay-bg)' }}
```

- [ ] **Step 2: Toggle on localhost:3000 and verify the navbar pill becomes light-tinted in light theme, logo text turns dark navy**

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: theme-aware Navbar pill and logo text"
```

---

## Task 5: IdentityStrip + SocialMarquee

**Files:**
- Modify: `components/IdentityStrip.tsx`
- Modify: `components/SocialMarquee.tsx`

- [ ] **Step 1: Update `components/IdentityStrip.tsx`**

1. Line 28 — section bg: `bg-[#0E0E0E]` → `bg-surface-1`
2. Line 70 — status dot `backgroundColor` inline style:
```tsx
style={{ backgroundColor: status.open ? '#00C8FF' : 'var(--white-muted)' }}
```
3. Line 74 — status label `color` inline style:
```tsx
style={{ color: status.open ? '#00C8FF' : 'var(--white-muted)' }}
```

- [ ] **Step 2: Update `components/SocialMarquee.tsx`**

1. Line 45 — post card: `bg-[#0E0E0E]` → `bg-surface-1`
2. Line 72 — section wrapper: `bg-[#0E0E0E]` → `bg-surface-1`

- [ ] **Step 3: Toggle on localhost:3000 — verify IdentityStrip and SocialMarquee flip to light blue-gray**

- [ ] **Step 4: Commit**

```bash
git add components/IdentityStrip.tsx components/SocialMarquee.tsx
git commit -m "feat: theme-aware IdentityStrip and SocialMarquee"
```

---

## Task 6: Manifesto + ClosingCTA

**Files:**
- Modify: `components/Manifesto.tsx`
- Modify: `components/ClosingCTA.tsx`

- [ ] **Step 1: Update `components/Manifesto.tsx`**

1. Line 38 — quote block: `bg-[#0E0E0E]` → `bg-surface-1`
2. Line 47 — quote number text: `text-[#F8F8F8]` → `text-white`
3. Line 90 — section: `bg-[#050505]` → `bg-black-deep`

- [ ] **Step 2: Update `components/ClosingCTA.tsx`**

1. Line 16 — section: `bg-[#050505]` → `bg-black-deep`
2. Line 62 — text span: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 3: Toggle on localhost:3000 — verify both sections flip correctly**

- [ ] **Step 4: Commit**

```bash
git add components/Manifesto.tsx components/ClosingCTA.tsx
git commit -m "feat: theme-aware Manifesto and ClosingCTA"
```

---

## Task 7: Services + Plans

**Files:**
- Modify: `components/Services.tsx`
- Modify: `components/Plans.tsx`

### Services

- [ ] **Step 1: Update `components/Services.tsx`**

1. Line 76 — service card: `bg-[#141414]` → `bg-surface-2`
2. Line 101 — icon inline style:
```tsx
style={{ color: isActive ? '#00C8FF' : 'var(--white-muted)' }}
```
3. Line 106 — service title: `text-[#F8F8F8]` → `text-white`
4. Line 153 — section: `bg-[#050505]` → `bg-black-deep`
5. Line 174 — section title span: `text-[#F8F8F8]` → `text-white`

### Plans

Note: The **featured plan card** (`plan.featured === true`) stays hardcoded dark — do **not** change `bg-[#141414]` inside the `if (plan.featured)` branch. The `featured-border` CSS class in `globals.css` also stays unchanged. Only the non-featured card changes.

- [ ] **Step 2: Update `components/Plans.tsx` non-featured card only**

1. Line 84 — featured card inner div (inside `if (plan.featured)` branch): **leave unchanged** (`bg-[#141414]`)
2. Line 98 — featured price text: `text-[#F8F8F8]` → **leave unchanged** (stays white-on-dark)
3. Line 137 — **non-featured** card: `bg-[#0E0E0E]` → `bg-surface-1`
4. Line 149 — non-featured price: `text-[#F8F8F8]` → `text-white`
5. Line 173 — non-featured CTA button: `text-[#F8F8F8]/70` → `text-white/70`
6. Line 192 — section wrapper: `bg-[#050505]` → `bg-black-deep`
7. Line 207 — section heading: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 3: Toggle on localhost:3000 — verify service cards flip, non-featured plan cards flip, featured card stays dark**

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx components/Plans.tsx
git commit -m "feat: theme-aware Services and Plans (featured card stays dark)"
```

---

## Task 8: Experience + Trainers

**Files:**
- Modify: `components/Experience.tsx`
- Modify: `components/Trainers.tsx`

- [ ] **Step 1: Update `components/Experience.tsx`**

1. Line 74 — section: `bg-[#050505]` → `bg-black-deep`
2. Line 112 — media card overlay: `bg-[#0E0E0E]` → `bg-surface-1`
3. Line 221 — heading: `text-[#F8F8F8]` → `text-white`
4. Line 255 — item title: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 2: Update `components/Trainers.tsx`**

1. Line 51 — section: `bg-[#050505]` → `bg-black-deep`
2. Line 68 — heading: `text-[#F8F8F8]` → `text-white`
3. Line 93 — trainer card: `bg-[#050505] hover:bg-[#080808]` → `bg-black-deep hover:bg-surface-3`
4. Line 138 — trainer name: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 3: Toggle on localhost:3000 — verify both sections flip and trainer cards show hover on surface-3 in light**

- [ ] **Step 4: Commit**

```bash
git add components/Experience.tsx components/Trainers.tsx
git commit -m "feat: theme-aware Experience and Trainers"
```

---

## Task 9: Classes

**Files:**
- Modify: `components/Classes.tsx`

- [ ] **Step 1: Update `components/Classes.tsx`**

1. Line 66 — section: `bg-[#050505]` → `bg-black-deep`
2. Line 82 — heading: `text-[#F8F8F8]` → `text-white`
3. Line 98 — class card: `bg-[#050505] hover:bg-[#0A0A0A]` → `bg-black-deep hover:bg-surface-3`
4. Line 105 — class name: `text-[#F8F8F8]` → `text-white`
5. Line 126 — day tab inline style:
```tsx
style={{ color: activeDay === day ? 'var(--white)' : 'var(--white-muted)' }}
```
6. Line 153 — schedule slot: `bg-[#050505] hover:bg-[#0A0A0A]` → `bg-black-deep hover:bg-surface-3`
7. Line 158 — time text: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 2: Toggle on localhost:3000 — verify Classes section flips, active day tab uses navy text in light, inactive uses muted**

- [ ] **Step 3: Commit**

```bash
git add components/Classes.tsx
git commit -m "feat: theme-aware Classes section"
```

---

## Task 10: FAQ, PageReveal, WhatsAppButton, CookieBanner

**Files:**
- Modify: `components/FAQ.tsx`
- Modify: `components/PageReveal.tsx`
- Modify: `components/WhatsAppButton.tsx`
- Modify: `components/CookieBanner.tsx`

- [ ] **Step 1: Update `components/FAQ.tsx`**

1. Line 59 — answer text: `group-hover:text-[#F8F8F8]` → `group-hover:text-white`
2. Line 97 — section: `bg-[#050505]` → `bg-black-deep`
3. Line 117 — heading: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 2: Update `components/PageReveal.tsx`**

1. Line 25 — overlay: `bg-[#050505]` → `bg-black-deep`

- [ ] **Step 3: Update `components/WhatsAppButton.tsx`**

1. Line 29 — tooltip bg: `bg-[#0E0E0E]` → `bg-surface-1`
2. Line 35 — tooltip text: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 4: Update `components/CookieBanner.tsx`**

1. Line 36 — banner bg: `bg-[#0E0E0E]` → `bg-surface-1`
2. Line 42 — banner title: `text-[#F8F8F8]` → `text-white`

- [ ] **Step 5: Toggle on localhost:3000 — verify FAQ, cookie banner and WhatsApp tooltip flip correctly. Check the page reveal still works on first load.**

- [ ] **Step 6: Commit**

```bash
git add components/FAQ.tsx components/PageReveal.tsx components/WhatsAppButton.tsx components/CookieBanner.tsx
git commit -m "feat: theme-aware FAQ, PageReveal, WhatsAppButton, CookieBanner"
```

---

## Task 11: Final Verification

- [ ] **Step 1: Run dev server and do a full page visual pass in dark mode**

```bash
npm run dev
```

Open localhost:3000. Scroll through all 10 sections without toggling. Everything should look identical to before this feature was added.

- [ ] **Step 2: Toggle to light theme and scroll through all sections**

Check each section:
- [ ] Hero: blue-gray bg, dark navy text, blue particles
- [ ] IdentityStrip: surface-1 bg
- [ ] Manifesto: surface-1 quote block, black-deep section bg
- [ ] Services: surface-2 cards
- [ ] Experience: black-deep bg, surface-1 card overlay
- [ ] Classes: black-deep bg with surface-3 hover
- [ ] Trainers: black-deep bg with surface-3 hover
- [ ] SocialMarquee: surface-1 bg
- [ ] Plans: surface-1 non-featured cards; **featured card stays dark**
- [ ] ClosingCTA: black-deep bg
- [ ] FAQ: black-deep bg
- [ ] Footer: **stays dark** (unchanged)
- [ ] Navbar: light-tinted pill, dark navy logo text
- [ ] ThemeToggle button: moon icon in dark navy

- [ ] **Step 3: Check mobile (resize browser to 375px width) in both themes**

Verify no layout breakage, mobile nav overlay flips to light bg in light theme.

- [ ] **Step 4: Check for console errors in both themes**

No React hydration warnings, no JS errors.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete light theme demo with floating toggle"
```

---

## Removal Notes (after client decides)

**Keep dark theme:** Delete `ThemeToggle.tsx`, remove its import from `layout.tsx`, delete the `[data-theme="light"]` block from `globals.css`. Leave Tailwind config as-is (CSS variable colours work fine for dark-only too).

**Keep light theme:** In `app/layout.tsx`, add `data-theme="light"` to the `<html>` element. Delete `ThemeToggle.tsx` and its import. Remove the dark default values from the CSS variables (or just leave them — they won't activate without the `data-theme` attribute toggle).
