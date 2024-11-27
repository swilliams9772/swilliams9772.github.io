"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { LearningPath } from '@/types/skills'
import { projectsData } from '@/data/projects-data'
import { skillsData } from '@/data/skills-data'

interface LearningJourneyVisualizationProps {
  data?: LearningPath[];
  className?: string;
}

export function LearningJourneyVisualization({ 
  data = [], // Provide default empty array
  className 
}: LearningJourneyVisualizationProps) {
  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center text-muted-foreground">
          <ClientIcon icon={Icons.BookOpen} className="h-12 w-12 mx-auto mb-4" />
          <h3 className="font-semibold">No Learning Paths</h3>
          <p className="text-sm">No learning journey data available.</p>
        </div>
      </div>
    );
  }

  // Group learning paths by category
  const pathsByCategory = data.reduce((acc, path) => {
    if (!path?.category) return acc; // Skip if category is missing
    const category = path.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(path);
    return acc;
  }, {} as Record<string, LearningPath[]>);

  // Get related projects for a learning path
  const getRelatedProjects = (path: LearningPath) => {
    if (!path?.projects) return [];
    return projectsData.filter(project => 
      path.projects.includes(project.id)
    );
  };

  // Get related skills for a learning path
  const getRelatedSkills = (path: LearningPath) => {
    if (!path?.skills) return [];
    return skillsData
      .flatMap(cat => cat.skills)
      .filter(skill => path.skills.includes(skill.name));
  };

  return (
    <div className={cn("space-y-8", className)}>
      {Object.entries(pathsByCategory).map(([category, paths], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((path, pathIndex) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (pathIndex * 0.05) }}
              >
                <Card className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {path.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        path.status === 'completed' && "text-green-500",
                        path.status === 'in-progress' && "text-blue-500",
                        path.status === 'planned' && "text-amber-500"
                      )}
                    >
                      {path.status}
                    </Badge>
                  </div>

                  {/* Timeline */}
                  <div className="text-sm text-muted-foreground">
                    {path.startDate} → {path.endDate || 'Present'}
                  </div>

                  {/* Skills */}
                  {path.skills?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {getRelatedSkills(path).map(skill => (
                          <Badge key={skill.name} variant="secondary">
                            {skill.name}
                            {skill.level && (
                              <span className="ml-1 text-xs">
                                ({skill.level}%)
                              </span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestones */}
                  {path.milestones?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Milestones</div>
                      <div className="space-y-2">
                        {path.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ClientIcon
                              icon={
                                milestone.status === 'completed'
                                  ? Icons.CheckCircle
                                  : milestone.status === 'in-progress'
                                  ? Icons.Clock
                                  : Icons.Circle
                              }
                              className={cn(
                                "h-4 w-4",
                                milestone.status === 'completed' && "text-green-500",
                                milestone.status === 'in-progress' && "text-blue-500",
                                milestone.status === 'planned' && "text-muted-foreground"
                              )}
                            />
                            <span>{milestone.title}</span>
                            <span className="text-muted-foreground ml-auto">
                              {milestone.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {path.metrics && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {path.metrics.proficiency}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Proficiency
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {path.metrics.projectsCompleted}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {path.metrics.hoursSpent}h
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hours
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Related Projects */}
                  {path.projects?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Related Projects</div>
                      <div className="flex flex-wrap gap-2">
                        {getRelatedProjects(path).map(project => (
                          <Badge
                            key={project.id}
                            variant="outline"
                            className="bg-background/50"
                          >
                            {project.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 