"use client"

import React, { createContext, useContext, useState } from 'react'
import { TechNode } from '@/types/technology'

interface TechnologyContextType {
  selectedTech: TechNode | null
  setSelectedTech: (tech: TechNode | null) => void
  layout: 'grid' | 'force' | 'tree'
  setLayout: (layout: 'grid' | 'force' | 'tree') => void
  showLabels: boolean
  setShowLabels: (show: boolean) => void
  showMetrics: boolean
  setShowMetrics: (show: boolean) => void
  strengthFilter: number
  setStrengthFilter: (value: number) => void
}

const TechnologyContext = createContext<TechnologyContextType | undefined>(undefined)

export function TechnologyProvider({ children }: { children: React.ReactNode }) {
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null)
  const [layout, setLayout] = useState<'grid' | 'force' | 'tree'>('grid')
  const [showLabels, setShowLabels] = useState(true)
  const [showMetrics, setShowMetrics] = useState(true)
  const [strengthFilter, setStrengthFilter] = useState(0)

  return (
    <TechnologyContext.Provider
      value={{
        selectedTech,
        setSelectedTech,
        layout,
        setLayout,
        showLabels,
        setShowLabels,
        showMetrics,
        setShowMetrics,
        strengthFilter,
        setStrengthFilter,
      }}
    >
      {children}
    </TechnologyContext.Provider>
  )
}

export function useTechnology() {
  const context = useContext(TechnologyContext)
  if (context === undefined) {
    throw new Error('useTechnology must be used within a TechnologyProvider')
  }
  return context
} 