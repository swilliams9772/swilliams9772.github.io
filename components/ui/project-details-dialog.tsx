"use client"

import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { GlassPanel } from '@/components/ui/glass-panel'
import { cn } from '@/lib/utils'
import { X, Github, ExternalLink, Calendar, Users, Target, Brain } from 'lucide-react'
import type { Project } from '@/types'

// Import specialized views
import { SecurityView } from '@/components/project-views/security-view'
import { NLPView } from '@/components/project-views/nlp-view'
import { DevView } from '@/components/project-views/dev-view'
import { AutomationView } from '@/components/project-views/automation-view'
import { DataAnalyticsView } from '@/components/project-views/data-analytics-view'
import { CVView } from '@/components/project-views/cv-view'
import { AIMLView } from '@/components/project-views/ai-ml-view'

interface ProjectDetailsDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailsDialog({ project, onClose }: ProjectDetailsDialogProps) {
  if (!project) return null

  const renderSpecializedView = () => {
    switch (project.category) {
      case 'security':
        return <SecurityView project={project} />
      case 'nlp':
        return <NLPView project={project} />
      case 'dev':
        return <DevView project={project} />
      case 'automation':
        return <AutomationView project={project} />
      case 'data':
        return <DataAnalyticsView project={project} />
      case 'cv':
        return <CVView project={project} />
      case 'ai-ml':
        return <AIMLView project={project} />
      default:
        return null
    }
  }

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="outline">{project.category}</Badge>
              <h2 className="text-3xl font-bold">{project.title}</h2>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassPanel variant="subtle" className="p-4 text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{project.completionDate}</div>
                <div className="text-xs text-muted-foreground">Completion Date</div>
              </GlassPanel>

              <GlassPanel variant="subtle" className="p-4 text-center">
                <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{project.teamSize} Members</div>
                <div className="text-xs text-muted-foreground">Team Size</div>
              </GlassPanel>

              <GlassPanel variant="subtle" className="p-4 text-center">
                <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Level {project.difficulty}/5</div>
                <div className="text-xs text-muted-foreground">Difficulty</div>
              </GlassPanel>

              <GlassPanel variant="subtle" className="p-4 text-center">
                <Brain className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{project.technologies?.length} Tech</div>
                <div className="text-xs text-muted-foreground">Technologies</div>
              </GlassPanel>
            </div>

            {renderSpecializedView()}

            <div className="flex flex-wrap gap-4">
              {project.github && (
                <Button asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button variant="outline" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 