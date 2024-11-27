"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

interface CareerMilestone {
  id: string;
  title: string;
  date: string;
  type: 'role' | 'project' | 'achievement';
  description: string;
  skills: string[];
  icon: keyof typeof Icons;
  status: string;
  organization: string;
  location: string;
  highlights: string[];
  metrics?: {
    label: string;
    value: string;
    change: string;
  }[];
}

interface CareerPathData {
  milestones: CareerMilestone[];
  summary: {
    totalYears: number;
    totalRoles: number;
    totalProjects: number;
    impactScore: number;
  };
  skills: any[]; // Using the skills data structure
}

interface CareerPathVisualizationProps {
  data: CareerPathData;
  className?: string;
  onMilestoneClick?: (milestone: CareerMilestone) => void;
}

export function CareerPathVisualization({
  data = {
    milestones: [],
    summary: {
      totalYears: 0,
      totalRoles: 0,
      totalProjects: 0,
      impactScore: 0
    },
    skills: []
  },
  className,
  onMilestoneClick
}: CareerPathVisualizationProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">
              {data.summary.totalYears}+
            </div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">
              {data.summary.totalRoles}
            </div>
            <div className="text-sm text-muted-foreground">Roles</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">
              {data.summary.totalProjects}
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">
              {data.summary.impactScore}%
            </div>
            <div className="text-sm text-muted-foreground">Impact Score</div>
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
        <div className="space-y-12">
          {data.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative grid grid-cols-1 md:grid-cols-2 gap-4",
                index % 2 === 0 ? "md:text-right" : "md:text-left md:grid-flow-dense"
              )}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={cn(
                  "w-4 h-4 rounded-full border-2",
                  milestone.status === 'completed' && "bg-green-500 border-green-500",
                  milestone.status === 'in-progress' && "bg-blue-500 border-blue-500",
                  milestone.status === 'planned' && "bg-amber-500 border-amber-500"
                )} />
              </div>

              {/* Content */}
              <motion.div
                className={cn(
                  "col-span-1",
                  index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                )}
              >
                <Card className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {milestone.type}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {milestone.organization} • {milestone.location}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {milestone.skills.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Highlights */}
                  {milestone.highlights?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Highlights</div>
                      <ul className="space-y-1">
                        {milestone.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <ClientIcon icon={Icons.CheckCircle} className="h-4 w-4 text-green-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metrics */}
                  {milestone.metrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {milestone.metrics.map(metric => (
                        <div key={metric.label} className="text-center">
                          <div className="text-lg font-semibold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                          {metric.change && (
                            <div className="text-xs text-green-500">
                              {metric.change}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Date */}
              <div className="text-sm text-muted-foreground self-center">
                {milestone.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 