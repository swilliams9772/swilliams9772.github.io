"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ProjectCard } from '@/components/ui/project-card'
import { ProjectImpactVisualization } from '@/components/ui/project-impact-visualization'
import { ProjectAnalyticsDashboard } from '@/components/ui/project-analytics-dashboard'
import { ProjectRelationships } from '@/components/ui/project-relationships'
import { ProjectTimelineView } from '@/components/ui/project-timeline-view'
import { ProjectKanbanView } from '@/components/ui/project-kanban-view'
import { ProjectMatrixView } from '@/components/ui/project-matrix-view'
import { ProjectMetricsVisualization } from '@/components/ui/project-metrics-visualization'
import { ProjectFilters } from '@/components/ui/project-filters'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { projectsData } from '@/data/projects-data'
import { Project } from '@/types'

type ViewMode = 'grid' | 'analytics' | 'relationships' | 'timeline' | 'kanban' | 'matrix' | 'metrics'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeView, setActiveView] = useState<ViewMode>('grid')
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    technology: '',
    difficulty: null as number | null,
    status: '',
    featured: false
  })

  const viewOptions = [
    { id: 'grid', label: 'Grid View', icon: Icons.Grid },
    { id: 'analytics', label: 'Analytics', icon: Icons.BarChart },
    { id: 'relationships', label: 'Relationships', icon: Icons.Network },
    { id: 'timeline', label: 'Timeline', icon: Icons.Calendar },
    { id: 'kanban', label: 'Kanban', icon: Icons.Layout },
    { id: 'matrix', label: 'Matrix', icon: Icons.Grid3x3 },
    { id: 'metrics', label: 'Metrics', icon: Icons.LineChart }
  ] as const

  // Filter projects based on selected options
  const filteredProjects = projectsData.filter(project => {
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.category && project.category !== filters.category) return false
    if (filters.technology && !project.technologies.includes(filters.technology)) return false
    if (filters.difficulty && project.difficulty !== filters.difficulty) return false
    if (filters.status && project.status !== filters.status) return false
    if (filters.featured && !project.featured) return false
    return true
  })

  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setSelectedProject(prev => prev?.id === project.id ? null : project)
  }

  return (
    <SectionLayout id="projects">
      <div className="container mx-auto px-4 space-y-8">
        <SectionHeader 
          title="Projects" 
          subtitle="Explore my technical projects and their impact"
        />

        {/* View Toggle and Filters */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            {viewOptions.map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? "default" : "outline"}
                onClick={() => setActiveView(view.id as ViewMode)}
                className="flex items-center gap-2"
              >
                <ClientIcon icon={view.icon} className="h-4 w-4" />
                {view.label}
              </Button>
            ))}
          </div>

          <ProjectFilters
            projects={projectsData}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* View Components */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-[400px]"
          >
            {activeView === 'grid' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>
            )}

            {activeView === 'analytics' && (
              <ProjectAnalyticsDashboard projects={filteredProjects} />
            )}

            {activeView === 'relationships' && (
              <ProjectRelationships 
                project={selectedProject || filteredProjects[0]}
                allProjects={filteredProjects}
              />
            )}

            {activeView === 'timeline' && (
              <ProjectTimelineView projects={filteredProjects} />
            )}

            {activeView === 'kanban' && (
              <ProjectKanbanView 
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
              />
            )}

            {activeView === 'matrix' && (
              <ProjectMatrixView 
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
              />
            )}

            {activeView === 'metrics' && selectedProject && (
              <ProjectMetricsVisualization project={selectedProject} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Selected Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t"
            >
              <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{selectedProject.category}</Badge>
                  <h3 className="font-semibold">{selectedProject.title}</h3>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => setSelectedProject(null)}
                >
                  <ClientIcon icon={Icons.X} className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionLayout>
  )
}

