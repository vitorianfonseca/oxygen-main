'use client'

import { useScroll, useVelocity, useSpring } from 'framer-motion'

export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  return useSpring(scrollVelocity, { stiffness: 400, damping: 90 })
}
