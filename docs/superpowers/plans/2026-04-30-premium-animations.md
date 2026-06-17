# Premium Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three layers of premium animation to the OXYGEN gym landing page: scroll-velocity skew (global inertia effect), parallax in the Hero, unique entrance animations per section, and a magnetic cursor upgrade.

**Architecture:** A shared `useScrollVelocity` hook feeds a `SkewContainer` wrapper component that applies a subtle `skewY` to section inner content. Each section independently imports `SkewContainer` and wraps its inner content div. The Hero gets parallax via `useTransform` on its existing `scrollY`. The cursor gets magnetic attraction via direct DOM style manipulation using CSS `translate` property (separate from Framer Motion's `transform`) to avoid conflicts.

**Tech Stack:** Next.js 14, TypeScript, Framer Motion v11, Tailwind CSS. Zero new dependencies.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `hooks/useScrollVelocity.ts` | Scroll velocity MotionValue (spring-smoothed) |
| Create | `components/SkewContainer.tsx` | Applies skewY based on velocity to inner content |
| Modify | `components/Hero.tsx` | Parallax on particles + text layers |
| Modify | `components/IdentityStrip.tsx` | 3D word-flip entrance |
| Modify | `components/Manifesto.tsx` | Word-by-word blur reveal |
| Modify | `components/Services.tsx` | rotateX card entrance + SkewContainer |
| Modify | `components/Experience.tsx` | Clip-path wipe entrance + SkewContainer |
| Modify | `components/Classes.tsx` | Fan-out card entrance + SkewContainer |
| Modify | `components/Trainers.tsx` | Scan-reveal per photo + SkewContainer |
| Modify | `components/Plans.tsx` | Glow pulse + cascade rise + SkewContainer |
| Modify | `components/ClosingCTA.tsx` | Word convergence entrance |
| Modify | `components/CustomCursor.tsx` | Magnetic pull on buttons |

---

## Task 1: Create `hooks/useScrollVelocity.ts`

**Files:**
- Create: `hooks/useScrollVelocity.ts`

- [ ] **Step 1: Create the hook file**

```typescript
'use client'

import { useScroll, useVelocity, useSpring } from 'framer-motion'

export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  return useSpring(scrollVelocity, { stiffness: 400, damping: 90 })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add hooks/useScrollVelocity.ts
git commit -m "feat: add useScrollVelocity hook"
```

---

## Task 2: Create `components/SkewContainer.tsx`

**Files:**
- Create: `components/SkewContainer.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import { useScrollVelocity } from '@/hooks/useScrollVelocity'

export default function SkewContainer({ children }: { children: React.ReactNode }) {
  const smoothVelocity = useScrollVelocity()
  const skewY = useTransform(smoothVelocity, [-2000, 0, 2000], [-2.5, 0, 2.5])

  return (
    <motion.div style={{ skewY }}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/SkewContainer.tsx
git commit -m "feat: add SkewContainer for scroll-velocity skew effect"
```

---

## Task 3: Hero parallax

**Files:**
- Modify: `components/Hero.tsx`

The Hero already has `const { scrollY } = useScroll()`. Add two `useTransform` calls and apply `y` motion values to the particle layer and text layer.

- [ ] **Step 1: Add parallax transforms**

After the existing `const { scrollY } = useScroll()` line (line 24), add:

```tsx
const particleY = useTransform(scrollY, [0, 600], [0, -80])
const textY = useTransform(scrollY, [0, 600], [0, -160])
```

Add `useTransform` to the import — the existing import line 5 already has it if not, update to:
```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
```

- [ ] **Step 2: Apply to particle layer**

Find the particle div (line 39-41):
```tsx
{/* Particles */}
<div className="absolute inset-0 z-0">
  <ParticleField />
</div>
```

Replace with:
```tsx
{/* Particles */}
<motion.div className="absolute inset-0 z-0" style={{ y: particleY }}>
  <ParticleField />
</motion.div>
```

- [ ] **Step 3: Apply to hero content**

Find the hero content div (line 47):
```tsx
<div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
```

Replace with:
```tsx
<motion.div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto" style={{ y: textY }}>
```

And close it with `</motion.div>` instead of `</div>`.

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Visit: `http://localhost:3000`
Expected: scroll down slowly — particles move up slower than the text, creating a depth/parallax effect on the hero.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add parallax layers to Hero section"
```

---

## Task 4: IdentityStrip — 3D word-flip entrance

**Files:**
- Modify: `components/IdentityStrip.tsx`

Replace the static `<p>` with animated segments that flip in from alternating sides using `rotateY`.

- [ ] **Step 1: Replace the entire IdentityStrip component**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASING = [0.25, 0.1, 0.25, 1] as const

function getGymStatus() {
  const now = new Date()
  const day = now.getDay()
  const h = now.getHours()
  const m = now.getMinutes()
  const time = h * 60 + m

  if (day === 0) return { open: false, label: 'FECHADO HOJE' }
  if (day === 6) return { open: time >= 480 && time < 1200, label: time < 480 ? 'ABRE ÀS 8H' : time >= 1200 ? 'FECHADO' : 'ABERTO AGORA' }
  return { open: time >= 360 && time < 1320, label: time < 360 ? 'ABRE ÀS 6H' : time >= 1320 ? 'FECHADO' : 'ABERTO AGORA' }
}

const segments = [
  { text: 'A TUA MELHOR ESCOLHA', dir: -1 },
  { text: 'CALDAS DA RAINHA', dir: 1 },
  { text: 'OXYGEN GYM & FITNESS', dir: -1 },
]

export default function IdentityStrip() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    setStatus(getGymStatus())
    const interval = setInterval(() => setStatus(getGymStatus()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="identity" className="relative w-full bg-surface-1 border-y border-white/[0.04] overflow-hidden scan-container">
      <div className="scan-line" />

      <div
        className="absolute inset-0 flex items-center pointer-events-none select-none"
        style={{ paddingLeft: '2%' }}
      >
        <span
          className="font-space font-black text-outline leading-none"
          style={{ fontSize: 'clamp(120px, 18vw, 200px)', opacity: 0.04, color: 'transparent', WebkitTextStroke: '1px rgba(0,159,223,0.3)' }}
        >
          O₂
        </span>
      </div>

      <div ref={ref} className="relative z-10 flex items-center justify-center gap-4 md:gap-8 py-5 px-6" style={{ perspective: 800 }}>
        <span className="hidden md:block w-1 h-1 rounded-full bg-[#009FDF]/40" />

        <p className="font-space font-semibold tracking-[0.25em] uppercase text-[0.72rem] md:text-[0.8rem] text-white/70 text-center flex items-center gap-2 flex-wrap justify-center">
          {segments.map((seg, i) => (
            <span key={seg.text} className="inline-flex items-center gap-2">
              <motion.span
                className="text-[#009FDF]/60"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.18, duration: 0.3 }}
              >
                ·
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: seg.dir * 90, x: seg.dir * 20 }}
                animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
                transition={{ delay: i * 0.18 + 0.05, duration: 0.7, ease: EASING }}
                style={{ display: 'inline-block' }}
              >
                {seg.text}
              </motion.span>
            </span>
          ))}
          <motion.span
            className="text-[#009FDF]/60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: segments.length * 0.18, duration: 0.3 }}
          >
            ·
          </motion.span>
        </p>

        {status && (
          <motion.div
            className="hidden md:flex items-center gap-2 ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: status.open ? '#009FDF' : 'var(--white-muted)' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-inter text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: status.open ? '#009FDF' : 'var(--white-muted)' }}>
              {status.label}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Visit: `http://localhost:3000`
Scroll to the IdentityStrip (just below the hero).
Expected: each text segment flips in from alternating sides with a 3D perspective effect.

- [ ] **Step 3: Commit**

```bash
git add components/IdentityStrip.tsx
git commit -m "feat: add 3D word-flip entrance to IdentityStrip"
```

---

## Task 5: Manifesto — word-by-word blur reveal

**Files:**
- Modify: `components/Manifesto.tsx`

Replace the line-by-line `clipPath` reveal with a word-by-word `opacity + blur + y` stagger.

- [ ] **Step 1: Replace the ManifestoLine component**

The current `ManifestoLine` component (lines 60-80) animates each line as a block. Replace the entire component:

```tsx
function ManifestoLine({ line, lineIndex }: { line: string; lineIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const words = line.split(' ')

  return (
    <div ref={ref} className="flex flex-wrap gap-x-[0.35em] gap-y-1">
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${lineIndex}-${wordIndex}`}
          className="font-space text-manifesto font-medium text-white/85 leading-[1.35] inline-block"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            delay: lineIndex * 0.15 + wordIndex * 0.07,
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
```

Update the `ManifestoLine` usage in the JSX (around line 124) to pass `lineIndex`:
```tsx
{manifestoLines.map((line, i) => (
  <ManifestoLine key={line} line={line} lineIndex={i} />
))}
```

- [ ] **Step 2: Verify in browser**

Scroll to the Manifesto section.
Expected: each word blurs in individually with a staggered wave effect, creating a "materialising" appearance.

- [ ] **Step 3: Commit**

```bash
git add components/Manifesto.tsx
git commit -m "feat: upgrade Manifesto to word-by-word blur reveal"
```

---

## Task 6: Services — rotateX card entrance + SkewContainer

**Files:**
- Modify: `components/Services.tsx`

Add `rotateX` entrance to service cards and wrap inner content in SkewContainer.

- [ ] **Step 1: Import SkewContainer**

Add to existing imports in `Services.tsx`:
```tsx
import SkewContainer from '@/components/SkewContainer'
```

- [ ] **Step 2: Add transformPerspective and rotateX to ServiceCard**

In the `ServiceCard` component, update the `motion.div` (around line 74):

Change:
```tsx
<motion.div
  ref={ref}
  className={`service-card group relative bg-surface-2 p-5 flex flex-col gap-4 h-full min-h-[160px] border border-white/[0.04] ${service.span}`}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{
    delay: index * 0.08,
    duration: 0.6,
    ease: EASING,
  }}
```

To:
```tsx
<motion.div
  ref={ref}
  className={`service-card group relative bg-surface-2 p-5 flex flex-col gap-4 h-full min-h-[160px] border border-white/[0.04] ${service.span}`}
  initial={{ opacity: 0, y: 30, rotateX: 20 }}
  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
  transition={{
    delay: index * 0.08,
    duration: 0.7,
    ease: EASING,
  }}
  style={{ transformPerspective: 800 }}
```

- [ ] **Step 3: Wrap inner content in SkewContainer**

In the `Services` component's return, find the `<div className="max-w-7xl mx-auto px-8 md:px-16">` div (line ~155). Wrap its contents in SkewContainer:

```tsx
<section id="servicos" ref={sectionRef} className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden">
  <SkewContainer>
    <div className="max-w-7xl mx-auto px-8 md:px-16">
      {/* ... all existing content ... */}
    </div>
  </SkewContainer>
</section>
```

- [ ] **Step 4: Verify in browser**

Scroll to the Services section.
Expected: cards "fall" into place from a 3D perspective angle. Section content skews subtly when scrolling fast.

- [ ] **Step 5: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: add rotateX entrance and skew to Services section"
```

---

## Task 7: Experience — clip-path wipe entrance + SkewContainer

**Files:**
- Modify: `components/Experience.tsx`

Replace the fade+slide entrance with clip-path wipes (left column top-to-bottom, right column left-to-right).

- [ ] **Step 1: Import SkewContainer**

```tsx
import SkewContainer from '@/components/SkewContainer'
```

- [ ] **Step 2: Replace left column entrance animation**

Find the left column `motion.div` (around line 84):
```tsx
<motion.div
  className="flex flex-col gap-6"
  initial={{ opacity: 0, x: -40 }}
  animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.9, ease: EASING }}
>
```

Replace with:
```tsx
<motion.div
  className="flex flex-col gap-6"
  initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
  animate={isSectionInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
  transition={{ duration: 1.0, ease: EASING }}
>
```

- [ ] **Step 3: Replace right column entrance animation**

The right div has `ref={rightRef}` (line ~210). Change it from a plain `div` to a `motion.div`:

```tsx
<motion.div
  ref={rightRef}
  className="flex flex-col justify-center space-y-10"
  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
  animate={isRightInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
  transition={{ duration: 1.0, ease: EASING }}
>
```

- [ ] **Step 4: Wrap section inner content in SkewContainer**

```tsx
<section id="experiencia" ref={sectionRef} className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden">
  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,159,223,0.03) 0%, transparent 65%)' }} />
  <SkewContainer>
    <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {/* ... all existing columns ... */}
    </div>
  </SkewContainer>
</section>
```

- [ ] **Step 5: Verify in browser**

Scroll to Experience.
Expected: left column wipes in from top, right column wipes in from the right side. Clean cinematic reveal.

- [ ] **Step 6: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: add clip-path wipe entrance to Experience section"
```

---

## Task 8: Classes — fan-out card entrance + SkewContainer

**Files:**
- Modify: `components/Classes.tsx`

Replace the basic `y: 16` stagger with a fan-out effect (cards start rotated and scaled down, settle into place).

- [ ] **Step 1: Import SkewContainer**

```tsx
import SkewContainer from '@/components/SkewContainer'
```

- [ ] **Step 2: Update classType card entrance animation**

Find the `motion.div` for each class card (around line 96):
```tsx
<motion.div
  key={cls.name}
  className="relative bg-black-deep p-5 flex flex-col gap-3 group hover:bg-surface-3 transition-colors duration-300"
  initial={{ opacity: 0, y: 16 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASING }}
>
```

Replace with:
```tsx
<motion.div
  key={cls.name}
  className="relative bg-black-deep p-5 flex flex-col gap-3 group hover:bg-surface-3 transition-colors duration-300"
  initial={{ opacity: 0, scale: 0.85, rotateZ: (i - 2.5) * 1.8 }}
  animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
  transition={{
    delay: 0.1 + i * 0.07,
    duration: 0.6,
    ease: [0.34, 1.56, 0.64, 1],
  }}
>
```

- [ ] **Step 3: Wrap section content in SkewContainer**

```tsx
<section id="aulas" ref={sectionRef} className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden">
  <SkewContainer>
    <div className="max-w-7xl mx-auto px-8 md:px-16">
      {/* ... all existing content ... */}
    </div>
  </SkewContainer>
</section>
```

- [ ] **Step 4: Verify in browser**

Scroll to Classes section.
Expected: class cards fan out like a deck of cards being spread on a table, each settling with a slight spring bounce.

- [ ] **Step 5: Commit**

```bash
git add components/Classes.tsx
git commit -m "feat: add fan-out card entrance to Classes section"
```

---

## Task 9: Trainers — scan-reveal per photo + SkewContainer

**Files:**
- Modify: `components/Trainers.tsx`

Replace the basic fade+y entrance with a clip-path scan-reveal (top to bottom) on each trainer photo, followed by a fade-up on the info text.

- [ ] **Step 1: Import SkewContainer**

```tsx
import SkewContainer from '@/components/SkewContainer'
```

- [ ] **Step 2: Update trainer card to use scan-reveal**

The current trainer card is a single `motion.div` for the whole card. Split into two animated parts: photo reveal + info fade.

Find the trainer card map (around line 90) and replace the entire `motion.div` with:

```tsx
{trainers.map((trainer, i) => (
  <div
    key={trainer.name}
    className="group bg-black-deep hover:bg-surface-3 transition-colors duration-500 flex flex-col"
  >
    {/* Photo — scan reveal */}
    <motion.div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '3/4',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(0,159,223,0.05) 0%, rgba(8,8,8,1) 70%)',
      }}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ delay: i * 0.15, duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Subtle scan lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full border border-white/[0.08] flex items-center justify-center bg-white/[0.03]">
          <span className="font-space font-black text-xl text-[#009FDF]/70">{trainer.initials}</span>
        </div>
        <span className="font-inter text-[0.52rem] tracking-[0.3em] uppercase text-white/15">
          Foto em breve
        </span>
      </div>
      <div className="absolute top-0 left-0 w-6 h-[1px] bg-[#009FDF]/25" />
      <div className="absolute top-0 left-0 w-[1px] h-6 bg-[#009FDF]/25" />
      <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-[#009FDF]/25" />
      <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-[#009FDF]/25" />
      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 border border-white/[0.06] font-inter text-[0.52rem] tracking-[0.18em] uppercase text-white/30">
        {trainer.role}
      </div>
    </motion.div>

    {/* Info — fade up after photo */}
    <motion.div
      className="p-5 flex flex-col flex-1"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.15 + 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="font-space font-bold text-white text-base mb-0.5">{trainer.name}</div>
      <div className="font-inter text-xs text-[#009FDF]/70 mb-3">{trainer.specialty}</div>
      <p className="font-inter text-xs text-white/28 leading-relaxed mb-4 flex-1">{trainer.bio}</p>
      <div className="flex flex-wrap gap-1.5">
        {trainer.certs.map((cert) => (
          <span
            key={cert}
            className="font-inter text-[0.57rem] tracking-[0.1em] uppercase px-2 py-1 border border-white/[0.07] text-white/30"
          >
            {cert}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
))}
```

- [ ] **Step 3: Wrap section content in SkewContainer**

```tsx
<section id="equipa" ref={sectionRef} className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden">
  <SkewContainer>
    <div className="max-w-7xl mx-auto px-8 md:px-16">
      {/* ... header + cards ... */}
    </div>
  </SkewContainer>
</section>
```

- [ ] **Step 4: Verify in browser**

Scroll to Trainers section.
Expected: each trainer photo wipes in from top to bottom like a scanner reading the card, then the info fades up below it.

- [ ] **Step 5: Commit**

```bash
git add components/Trainers.tsx
git commit -m "feat: add scan-reveal entrance to Trainers section"
```

---

## Task 10: Plans — glow pulse + cascade rise + SkewContainer

**Files:**
- Modify: `components/Plans.tsx`

Add a one-time glow pulse to the featured card on entry, and improve stagger easing for non-featured cards.

- [ ] **Step 1: Import SkewContainer**

```tsx
import SkewContainer from '@/components/SkewContainer'
```

- [ ] **Step 2: Add glow pulse overlay to featured card**

In the `PlanCard` component, find the featured card branch (the `if (plan.featured)` block, line ~69).

Inside the featured card's inner `div` (the one with `className="relative bg-[#141414] rounded-[11px] p-7..."`), add a glow overlay after the opening div:

```tsx
<div className="relative bg-[#141414] rounded-[11px] p-7 md:p-9 flex flex-col gap-6 h-full">
  {/* Glow pulse — fires once on entry */}
  {isInView && (
    <motion.div
      className="absolute inset-0 rounded-[11px] pointer-events-none"
      initial={{ boxShadow: '0 0 0px rgba(0,159,223,0)' }}
      animate={{
        boxShadow: [
          '0 0 0px rgba(0,159,223,0)',
          '0 0 80px rgba(0,159,223,0.4)',
          '0 0 20px rgba(0,159,223,0.08)',
        ],
      }}
      transition={{ delay: 0.6, duration: 1.4, ease: 'easeOut' }}
    />
  )}
  {/* ... rest of featured card content unchanged ... */}
```

- [ ] **Step 3: Improve non-featured card easing**

Find the non-featured `motion.div` (around line 134):
```tsx
transition={{ delay: index * 0.12, duration: 0.65, ease: EASING }}
```

Replace with spring-like easing:
```tsx
transition={{ delay: index * 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
```

- [ ] **Step 4: Wrap section content in SkewContainer**

```tsx
<section id="planos" ref={sectionRef} className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden">
  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,159,223,0.04) 0%, transparent 55%)' }} />
  <SkewContainer>
    <div className="max-w-6xl mx-auto px-8 md:px-16">
      {/* ... all existing content ... */}
    </div>
  </SkewContainer>
</section>
```

- [ ] **Step 5: Verify in browser**

Scroll to Plans section.
Expected: featured (trimestral) card pulses a blue glow on entry; non-featured cards spring into place. All cards skew subtly during fast scroll.

- [ ] **Step 6: Commit**

```bash
git add components/Plans.tsx
git commit -m "feat: add glow pulse and spring easing to Plans section"
```

---

## Task 11: ClosingCTA — word convergence entrance

**Files:**
- Modify: `components/ClosingCTA.tsx`

Split the main headline into individual words, each entering from a fixed offset position and converging to their natural position.

- [ ] **Step 1: Replace the ClosingCTA component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASING = [0.25, 0.1, 0.25, 1] as const

const headlineWords = [
  { text: 'A', color: '#F8F8F8', x: -80, y: 30 },
  { text: 'tua', color: '#F8F8F8', x: 50, y: -60 },
  { text: 'transformação', color: '#F8F8F8', x: -40, y: 70 },
  { text: 'começa', color: '#009FDF', x: 70, y: -30 },
  { text: 'hoje.', color: '#009FDF', x: -60, y: -80 },
]

export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative w-full bg-black-deep overflow-hidden py-0"
    >
      <div className="w-full h-[1px] bg-[#009FDF]/20" />

      <div className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden">
        {/* Giant rotating O₂ background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <motion.span
            className="font-space font-black leading-none"
            style={{
              fontSize: 'clamp(200px, 40vw, 480px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,159,223,0.06)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            O₂
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Label */}
          <motion.p
            className="font-inter text-label uppercase tracking-[0.4em] text-white/30 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASING }}
          >
            PRONTO?
          </motion.p>

          {/* Headline — word convergence */}
          <h2
            className="font-space font-extrabold leading-[1.1] mb-8 flex flex-wrap justify-center gap-x-[0.3em] gap-y-1"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={word.text + i}
                style={{ color: word.color, display: 'inline-block' }}
                initial={{ opacity: 0, x: word.x, y: word.y, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>

          {/* Subtext */}
          <motion.p
            className="font-inter text-base text-white/40 max-w-sm mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            Caldas da Rainha tem um ginásio que finalmente está à altura das tuas ambições.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.7, ease: EASING }}
          >
            <button
              className="group inline-flex items-center gap-3 bg-[#009FDF] text-[#050505] font-space font-bold text-sm tracking-[0.2em] uppercase px-12 py-5 rounded-sm hover:bg-[#80CFEF] transition-colors duration-300"
              data-hover="true"
            >
              Vem treinar connosco
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>

            <p className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-white/25">
              Sem fidelização · Sem compromisso · Só resultados
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#009FDF]/20" />
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to ClosingCTA.
Expected: each word in "A tua transformação começa hoje." flies in from a different direction and converges with a spring bounce. The effect should feel energetic — matching the gym's identity.

- [ ] **Step 3: Commit**

```bash
git add components/ClosingCTA.tsx
git commit -m "feat: add word convergence entrance to ClosingCTA"
```

---

## Task 12: CustomCursor — magnetic pull

**Files:**
- Modify: `components/CustomCursor.tsx`

Add magnetic attraction: buttons and links with `data-hover="true"` gently move toward the cursor when it's within 80px.

Uses the CSS `translate` property (separate from `transform`) to avoid conflicts with Framer Motion animations on the same elements.

- [ ] **Step 1: Replace the CustomCursor component**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>(0)
  const rafMagRef = useRef<number>(0)
  const posRef = useRef({ x: -100, y: -100 })

  const springConfig = { stiffness: 350, damping: 28, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const updateCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(posRef.current.x)
        cursorY.set(posRef.current.y)
      })
    }

    const applyMagnetic = (e: MouseEvent) => {
      cancelAnimationFrame(rafMagRef.current)
      rafMagRef.current = requestAnimationFrame(() => {
        const els = document.querySelectorAll<HTMLElement>('[data-hover="true"]')
        els.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) return

          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const distX = e.clientX - centerX
          const distY = e.clientY - centerY
          const dist = Math.sqrt(distX * distX + distY * distY)

          if (dist < 80) {
            const strength = (80 - dist) / 80
            const moveX = distX * strength * 0.3
            const moveY = distY * strength * 0.3
            el.style.translate = `${moveX}px ${moveY}px`
            el.style.transition = 'translate 0.2s ease-out'
          } else if (el.style.translate && el.style.translate !== '0px 0px') {
            el.style.translate = '0px 0px'
            el.style.transition = 'translate 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }
        })
      })
    }

    const onMouseEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('button') || el.closest('a') || el.getAttribute('data-hover')) {
        setIsHovered(true)
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('button') || el.closest('a') || el.getAttribute('data-hover')) {
        setIsHovered(false)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      updateCursor(e)
      applyMagnetic(e)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseEnter)
    document.addEventListener('mouseout', onMouseLeave)
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) setIsVisible(false)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseEnter)
      document.removeEventListener('mouseout', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(rafMagRef.current)
      document.querySelectorAll<HTMLElement>('[data-hover="true"]').forEach((el) => {
        el.style.translate = ''
        el.style.transition = ''
      })
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-electric/40"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 36 : 24,
          height: isHovered ? 36 : 24,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovered ? 'rgba(0,159,223,0.8)' : 'rgba(0,159,223,0.35)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-electric"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

Move the cursor near CTA buttons (Hero "Começa agora", Plans buttons, ClosingCTA button).
Expected: buttons gently lean toward the cursor when it approaches within ~80px. The cursor ring enlarges as before. The magnetic pull is subtle — max 12px displacement.

- [ ] **Step 3: Commit**

```bash
git add components/CustomCursor.tsx
git commit -m "feat: add magnetic pull to CustomCursor"
```

---

## Final Verification

- [ ] **Run full build to catch any TypeScript errors**

```bash
npm run build
```
Expected: build completes with no errors.

- [ ] **Smoke test in browser**

Run: `npm run dev`
Visit: `http://localhost:3000`

Check each section by scrolling through:
1. Hero: particles move slower than text when scrolling
2. IdentityStrip: segments flip in 3D on first view
3. Manifesto: words blur in individually
4. Services: cards fall in with rotateX perspective
5. Experience: left wipes top→bottom, right wipes left→right
6. Classes: cards fan out like a deck
7. Trainers: photos scan in from top, info fades below
8. Plans: featured card glows on entry
9. ClosingCTA: words converge from random directions
10. Global: fast scroll causes subtle skew on all sections
11. Cursor: buttons attract the cursor magnetically

- [ ] **Final commit**

```bash
git add -A
git commit -m "feat: complete premium animation layer — scroll skew, parallax, section signatures, magnetic cursor"
```
