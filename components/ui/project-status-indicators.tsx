"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { cn } from '@/lib/utils'
import {
  CheckCircle,
  Clock,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  XCircle,
  Activity
} from 'lucide-react'

interface ProjectStatus {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'planned' | 'paused' | 'cancelled';
  progress: number;
  lastUpdated: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  health: 'healthy' | 'at-risk' | 'critical';
  dependencies?: number;
  blockers?: number;
}

interface ProjectStatusIndicatorsProps {
  projects: ProjectStatus[];
  className?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  'in-progress': {
    icon: PlayCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  planned: {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  paused: {
    icon: PauseCircle,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10"
  }
};

const priorityConfig = {
  high: {
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  medium: {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  low: {
    color: "text-green-500",
    bg: "bg-green-500/10"
  }
};

const healthConfig = {
  healthy: {
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  'at-risk': {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  critical: {
    color: "text-red-500",
    bg: "bg-red-500/10"
  }
};

export function ProjectStatusIndicators({ projects, className }: ProjectStatusIndicatorsProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {projects.map((project) => {
        const StatusIcon = statusConfig[project.status].icon;
        
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Card className="p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <h4 className="font-medium flex items-center gap-2">
                    <StatusIcon 
                      className={cn(
                        "h-5 w-5",
                        statusConfig[project.status].color
                      )}
                    />
                    {project.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge 
                      variant="outline"
                      className={cn(
                        priorityConfig[project.priority].bg,
                        priorityConfig[project.priority].color
                      )}
                    >
                      {project.priority} priority
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={cn(
                        healthConfig[project.health].bg,
                        healthConfig[project.health].color
                      )}
                    >
                      {project.health}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last updated: {project.lastUpdated}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    {project.dependencies && (
                      <span className="text-muted-foreground">
                        {project.dependencies} dependencies
                      </span>
                    )}
                    {project.blockers && (
                      <span className="text-red-500">
                        {project.blockers} blockers
                      </span>
                    )}
                  </div>
                  
                  {project.dueDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {project.dueDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 