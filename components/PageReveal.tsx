'use client'

import { useEffect, useState } from 'react'

export default function PageReveal() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Two rAFs to let React paint before starting the fade
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFading(true)
        const t = setTimeout(() => setGone(true), 700)
        return () => clearTimeout(t)
      })
    })
    return () => cancelAnimationFrame(raf1)
  }, [])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 bg-black-deep pointer-events-none"
      style={{
        zIndex: 9997,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    />
  )
}
