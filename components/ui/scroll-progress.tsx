"use client"

import { motion, useScroll } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform-none z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
} 