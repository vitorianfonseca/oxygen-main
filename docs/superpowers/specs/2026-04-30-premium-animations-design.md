# Premium Animations — Design Spec
**Date:** 2026-04-30  
**Project:** OXYGEN Gym & Fitness landing page  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion (already installed)  
**New dependencies:** none

---

## Goal

Add premium, complex animations that make the site feel unique and cinematic without adding weight. Three layers working together: scroll-driven foundations, per-section entrance signatures, and a magnetic cursor upgrade.

---

## Layer 1: Scroll Cinema (global infrastructure)

### `hooks/useScrollVelocity.ts`
Custom hook using Framer Motion's `useVelocity` on `scrollY`. Returns a `smoothVelocity` MotionValue (low-pass filtered with `useSpring`). Used by all animated components.

### `components/SkewContainer.tsx`
Wrapper component that applies `skewY` proportional to scroll velocity.  
- Max skew: `2.5deg`  
- Spring config: `stiffness: 400, damping: 90`  
- Applied to: IdentityStrip, Manifesto, Services, Experience, Classes, Trainers, Plans  
- NOT applied to: Hero, SocialMarquee, ClosingCTA, Footer

### Hero parallax upgrade
- Particle layer: `y = scrollY * 0.15`
- Text content: `y = scrollY * 0.4`
- Both via `useTransform(scrollY, ...)` — already uses `useScroll`

---

## Layer 2: Section Entrance Signatures

Each section has a unique entrance. No two sections share the same pattern.

| Section | Signature | Technique |
|---|---|---|
| IdentityStrip | Words enter from alternating left/right with `rotateY` 3D flip | `rotateY: 90 → 0`, perspective wrapper |
| Manifesto | Word-by-word blur reveal (upgrade from line-by-line) | Split text by word, stagger `filter: blur(12px) → 0` + `opacity` |
| Services | Cards fall into place with `rotateX(20deg)` perspective | `transformPerspective: 800, rotateX: 20 → 0` per card |
| Experience | Diagonal wipe clip-path from bottom-left corner | `clip-path: polygon(0 100%, 0 100%, 0 100%) → polygon(0 0, 100% 0, 100% 100%, 0 100%)` |
| Classes | Cards fan out — first card centers, others unfold left/right | `x` offsets collapse to 0 with stagger |
| Trainers | Photos scan-reveal top to bottom per card | `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)` staggered |
| Plans | Featured card pulses glow on enter; others rise with cascade | `boxShadow` keyframe on featured + `y` stagger on others |
| ClosingCTA | Words split and converge from random directions | Split by word, random `x/y` origin, all converge to 0 |

---

## Layer 3: Magnetic Cursor

Upgrade `CustomCursor.tsx` to add magnetic attraction.

### Behavior
- All elements with `data-hover="true"` become magnetic
- When cursor is within 80px of element center: element moves toward cursor (max 12px displacement)
- Cursor gets `scale(1.4)` and opacity shift when magnetic pull activates
- On mouse leave: element springs back to original position

### Implementation
- `mousemove` listener on `document`
- For each `data-hover` element in viewport: calculate distance to cursor, apply `transform: translate(dx, dy)` via Framer Motion `animate()`
- Spring: `stiffness: 150, damping: 15`

---

## Performance constraints

- `will-change: transform` set only when animation is running, removed after completion
- All scroll listeners use Framer Motion's `MotionValue` pipeline (no manual `addEventListener`)
- `prefers-reduced-motion` already handled globally in `globals.css` — covers all animations automatically
- Skew and parallax use `transform` only — no layout-triggering properties

---

## Files to create
- `hooks/useScrollVelocity.ts`
- `components/SkewContainer.tsx`

## Files to modify
- `components/Hero.tsx` — add parallax layers
- `components/IdentityStrip.tsx` — 3D word flip entrance
- `components/Manifesto.tsx` — upgrade to word-by-word blur reveal
- `components/Services.tsx` — rotateX card entrance
- `components/Experience.tsx` — diagonal clip-path wipe
- `components/Classes.tsx` — fan-out card entrance
- `components/Trainers.tsx` — scan-reveal per photo
- `components/Plans.tsx` — glow pulse + cascade rise
- `components/ClosingCTA.tsx` — word convergence entrance
- `components/CustomCursor.tsx` — magnetic pull upgrade
- `app/page.tsx` — wrap sections in SkewContainer where applicable
