"use client"

import { motion } from 'framer-motion'

export function NoiseTexture() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: 'url("/noise.png")',
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        opacity: 0.4
      }}
    />
  )
} 