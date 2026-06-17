'use client'

import { motion, useTransform } from 'framer-motion'
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
