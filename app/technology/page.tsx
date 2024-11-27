"use client"

import React, { Suspense } from 'react'
import { TechnologyEcosystemVisualization } from '@/components/ui/technology-ecosystem-visualization'
import { techEcosystemData } from '@/data/visualization-data'
import { Card } from '@/components/ui/card'
import { GradientText } from '@/components/ui/gradient-text'
import { VisualizationErrorBoundary } from '@/components/ui/visualization-error-boundary'
import { TechEcosystemControls } from '@/components/ui/tech-ecosystem-controls'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function TechnologyPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <header className="text-center space-y-4">
        <GradientText className="text-4xl font-bold">
          Technology Ecosystem
        </GradientText>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          An interactive visualization of my technical expertise, project experience, and continuous learning journey.
        </p>
      </header>

      <Card className="p-6">
        <VisualizationErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <TechnologyEcosystemVisualization 
              data={techEcosystemData}
              className="min-h-[600px]"
            />
          </Suspense>
        </VisualizationErrorBoundary>
      </Card>
    </div>
  )
} 