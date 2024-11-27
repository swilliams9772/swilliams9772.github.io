"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { Circle, Line, ArrowRight } from 'lucide-react'

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'release' | 'update';
  status: 'completed' | 'in-progress' | 'planned';
}

interface ProjectTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const statusColors = {
  completed: "bg-green-500",
  'in-progress': "bg-blue-500",
  planned: "bg-amber-500"
};

const typeIcons = {
  milestone: Circle,
  release: ArrowRight,
  update: Line
};

export function ProjectTimeline({ events, className }: ProjectTimelineProps) {
  return (
    <div className={cn("relative space-y-8", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

      {/* Timeline events */}
      {events.map((event, index) => {
        const Icon = typeIcons[event.type];
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10"
          >
            {/* Timeline dot */}
            <div 
              className={cn(
                "absolute left-3 w-3 h-3 rounded-full -translate-x-1.5",
                statusColors[event.status]
              )}
            />

            <Card className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">{event.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
                <Badge variant="outline">{event.date}</Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 