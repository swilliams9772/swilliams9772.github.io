"use client"

import React from 'react'
import { CareerPathVisualization } from '@/components/ui/career-path-visualization'
import { careerPathData } from '@/data/career-path-data'

export default function CareerPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Career Journey</h1>
      <CareerPathVisualization data={careerPathData} />
    </div>
  )
} 