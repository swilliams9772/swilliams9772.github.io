"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { projectsData, projectCategories } from '@/data/projects-data'
import { Project } from '@/types'

interface ViewMode {
  id: string
  icon: keyof typeof Icons
  label: string
}

const viewModes: ViewMode[] = [
  { id: 'grid', icon: 'Grid', label: 'Grid View' },
  { id: 'timeline', icon: 'Timeline', label: 'Timeline' },
  { id: 'category', icon: 'Folders', label: 'Categories' },
  { id: 'showcase', icon: 'Presentation', label: 'Showcase' }
]

export function ProjectGrid() {
  const [selectedMode, setSelectedMode] = useState<string>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const renderProjectCard = (project: Project) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            </div>
            {project.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          {project.metrics && (
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map(metric => (
                <div key={metric.name} className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-semibold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.name}
                  </div>
                  <div className="text-xs text-green-500">
                    {metric.improvement}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-2">
              {project.technologies.slice(0, 3).map(tech => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <ClientIcon icon={Icons.ArrowRight} className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderTimelineView = () => (
    <div className="space-y-8">
      {Object.entries(
        projectsData.reduce((acc, project) => {
          const year = project.timeline.split('-')[0]
          return {
            ...acc,
            [year]: [...(acc[year] || []), project]
          }
        }, {} as Record<string, Project[]>)
      ).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, projects]) => (
        <div key={year}>
          <h3 className="text-2xl font-bold mb-4">{year}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => renderProjectCard(project))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderCategoryView = () => (
    <div className="space-y-8">
      {Object.values(projectCategories).map(category => (
        <div key={category}>
          <h3 className="text-2xl font-bold mb-4">{category}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData
              .filter(p => p.category === category)
              .map(project => renderProjectCard(project))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderShowcaseView = () => (
    <div className="space-y-12">
      {projectsData
        .filter(p => p.featured)
        .map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-8"
          >
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              {project.metrics && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.metrics.map(metric => (
                    <Card key={metric.name} className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.name}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {viewModes.map(mode => (
          <Button
            key={mode.id}
            variant={selectedMode === mode.id ? "default" : "outline"}
            onClick={() => setSelectedMode(mode.id)}
            className="flex items-center gap-2"
          >
            <ClientIcon icon={Icons[mode.icon]} className="h-4 w-4" />
            {mode.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMode === 'grid' && (
          <motion.div
            key="grid"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projectsData.map(project => renderProjectCard(project))}
          </motion.div>
        )}
        {selectedMode === 'timeline' && renderTimelineView()}
        {selectedMode === 'category' && renderCategoryView()}
        {selectedMode === 'showcase' && renderShowcaseView()}
      </AnimatePresence>
    </div>
  )
} 