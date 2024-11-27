"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface SectionLayoutProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function SectionLayout({ id, className, children }: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 container mx-auto px-4",
        className
      )}
    >
      {children}
    </section>
  )
} 