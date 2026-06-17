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
