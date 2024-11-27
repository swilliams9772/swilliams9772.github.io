"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { cn } from '@/lib/utils'
import { 
  CheckCircle, 
  XCircle,
  ArrowRight,
  GitBranch,
  GitCommit,
  GitMerge
} from 'lucide-react'

interface ProjectMetric {
  name: string;
  values: {
    [key: string]: {
      value: string | number;
      improvement?: string;
      status?: 'positive' | 'negative' | 'neutral';
    };
  };
}

interface ProjectComparison {
  metrics: ProjectMetric[];
  technologies: {
    [key: string]: string[];
  };
  features: {
    [key: string]: string[];
  };
  performance: {
    [key: string]: {
      name: string;
      value: number;
      unit: string;
    }[];
  };
  timeline: {
    [key: string]: {
      start: string;
      end: string;
      duration: string;
    };
  };
}

interface ProjectComparisonViewProps {
  projects: string[];
  comparison: ProjectComparison;
  className?: string;
}

export function ProjectComparisonView({ 
  projects, 
  comparison,
  className 
}: ProjectComparisonViewProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-8">
        {/* Project Headers */}
        <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <div className="font-medium text-muted-foreground">Metrics</div>
          {projects.map(project => (
            <div key={project} className="font-semibold text-lg">
              {project}
            </div>
          ))}
        </div>

        {/* Metrics Comparison */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4">Key Metrics</h3>
          {comparison.metrics.map((metric, idx) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4 items-center"
            >
              <div className="text-sm text-muted-foreground">
                {metric.name}
              </div>
              {projects.map(project => {
                const value = metric.values[project];
                return (
                  <div key={project} className="space-y-1">
                    <div className="font-medium">
                      {value.value}
                    </div>
                    {value.improvement && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs",
                          value.status === 'positive' && "text-green-500",
                          value.status === 'negative' && "text-red-500"
                        )}
                      >
                        {value.improvement}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Technologies Comparison */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4">Technologies</h3>
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {projects.map(project => (
              <div key={project} className="flex flex-wrap gap-2">
                {comparison.technologies[project].map((tech, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {projects.map(project => (
              <div key={project} className="space-y-2">
                {comparison.features[project].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4">Performance</h3>
          {projects.map(project => (
            <div key={project} className="space-y-4">
              {comparison.performance[project].map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.name}</span>
                    <span>{metric.value}{metric.unit}</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Timeline Comparison */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4">Timeline</h3>
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {projects.map(project => {
              const timeline = comparison.timeline[project];
              return (
                <div key={project} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GitBranch className="h-4 w-4" />
                    Start: {timeline.start}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GitMerge className="h-4 w-4" />
                    End: {timeline.end}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GitCommit className="h-4 w-4" />
                    Duration: {timeline.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
} 