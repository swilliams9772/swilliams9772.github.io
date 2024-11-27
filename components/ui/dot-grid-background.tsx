"use client"

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const pointsRef = useRef<Point[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPoints()
    }

    const initPoints = () => {
      const gridSize = 50
      const points: Point[] = []
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          points.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
          })
        }
      }
      
      pointsRef.current = points
    }

    const drawPoints = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDark = theme === 'dark'
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
      
      pointsRef.current.forEach((point, i) => {
        // Update position
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1
        if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        pointsRef.current.slice(i + 1).forEach(otherPoint => {
          const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y)
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`
              : `rgba(0, 0, 0, ${0.2 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(drawPoints)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    drawPoints()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-50"
      style={{ 
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, #1a1b1e 0%, #000000 100%)' 
          : 'radial-gradient(circle at center, #ffffff 0%, #f5f5f5 100%)'
      }}
    />
  )
} 