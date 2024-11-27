"use client"

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { VisualizationContainer } from './visualization-container'
import { VisualizationTooltip } from './visualization-tooltip'
import { VisualizationLegend } from './visualization-legend'
import { useVisualizationResize } from '@/hooks/use-visualization-resize'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { ClientIcon } from './client-icon'
import { calculateTechStats, getTechnologyConnections } from '@/lib/utils/technology'

interface TechNode {
  id: string;
  name: string;
  category: string;
  icon: keyof typeof Icons;
  proficiency: number;
  experience: string;
  projects: number;
  connections: string[];
  description: string;
  skills: string[];
  tools: string[];
  status: 'active' | 'learning' | 'planned';
}

interface TechEcosystem {
  nodes: TechNode[];
  categories: {
    name: string;
    color: string;
    icon: keyof typeof Icons;
  }[];
  timeRange?: string;
  summary?: {
    totalTechnologies: number;
    activeTechnologies: number;
    averageProficiency: number;
  };
}

interface TechnologyEcosystemVisualizationProps {
  data: TechEcosystem;
  className?: string;
  onNodeClick?: (node: TechNode) => void;
}

const statusColors = {
  active: "bg-green-500/10 text-green-500",
  learning: "bg-blue-500/10 text-blue-500",
  planned: "bg-amber-500/10 text-amber-500"
};

export function TechnologyEcosystemVisualization({
  data = {
    nodes: [],
    categories: [],
    timeRange: '',
    summary: {
      totalTechnologies: 0,
      activeTechnologies: 0,
      averageProficiency: 0
    }
  },
  className,
  onNodeClick
}: TechnologyEcosystemVisualizationProps) {
  const [error, setError] = useState<Error | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);
  const [strengthFilter, setStrengthFilter] = useState(0);

  // Calculate technology statistics
  const techStats = useMemo(() => calculateTechStats(), []);
  const connections = useMemo(() => getTechnologyConnections(), []);

  // Filter connections based on strength
  const filteredConnections = useMemo(() => {
    const filtered = new Map<string, Set<string>>();
    connections.forEach((connected, tech) => {
      const strength = (connected.size / techStats.get(tech)!.projects.length) * 100;
      if (strength >= strengthFilter) {
        filtered.set(tech, connected);
      }
    });
    return filtered;
  }, [connections, techStats, strengthFilter]);

  // Validate data structure
  useEffect(() => {
    try {
      if (!Array.isArray(data.nodes)) {
        throw new Error('Invalid nodes data structure');
      }
      if (!Array.isArray(data.categories)) {
        throw new Error('Invalid categories data structure');
      }
      // Reset error if data is valid
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error occurred'));
    }
  }, [data]);

  if (error) {
    throw error; // This will be caught by VisualizationErrorBoundary
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const { width, height } = useVisualizationResize()
  const nodePositions = useRef(new Map<string, DOMRect>())
  const [paths, setPaths] = React.useState<{ start: DOMRect; end: DOMRect; color: string }[]>([])

  useEffect(() => {
    const updateNodePositions = () => {
      const newPaths: { start: DOMRect; end: DOMRect; color: string }[] = []
      
      if (!data?.nodes) return

      data.nodes.forEach(node => {
        const startElement = document.getElementById(`node-${node.id}`)
        if (!startElement) return
        
        const startPos = startElement.getBoundingClientRect()
        nodePositions.current.set(node.id, startPos)

        node.connections.forEach(targetId => {
          const endElement = document.getElementById(`node-${targetId}`)
          if (!endElement) return

          const endPos = endElement.getBoundingClientRect()
          const category = data.categories.find(c => 
            c.name === node.category
          )

          if (category) {
            newPaths.push({
              start: startPos,
              end: endPos,
              color: category.color
            })
          }
        })
      })

      setPaths(newPaths)
    }

    updateNodePositions()
    window.addEventListener('resize', updateNodePositions)
    
    return () => window.removeEventListener('resize', updateNodePositions)
  }, [data])

  const handleNodeMouseEnter = (event: React.MouseEvent, node: TechNode) => {
    setTooltipContent(
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ClientIcon
            Icon={Icons[node.icon]}
            className="h-5 w-5 text-primary"
          />
          <div>
            <div className="font-medium">{node.name}</div>
            <div className="text-sm text-muted-foreground">{node.experience}</div>
          </div>
        </div>
        <div className="text-sm">{node.description}</div>
        <div className="space-y-2">
          <div className="text-xs font-medium">Skills:</div>
          <div className="flex flex-wrap gap-1">
            {node.skills.map((skill, i) => (
              <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs font-medium">Tools:</div>
          <div className="flex flex-wrap gap-1">
            {node.tools.map((tool, i) => (
              <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
    setTooltipPosition({ x: event.pageX, y: event.pageY })
    setShowTooltip(true)
  }

  const handleNodeMouseLeave = () => {
    setShowTooltip(false)
  }

  const legendItems = data.categories.map(category => ({
    label: category.name,
    icon: Icons[category.icon],
    color: category.color
  }))

  return (
    <VisualizationContainer
      title="Technology Ecosystem"
      timeRange={data.timeRange}
      summary={{
        totalTechnologies: techStats.size,
        activeTechnologies: Array.from(techStats.values()).filter(t => t.trend === 'rising').length,
        averageProficiency: Array.from(techStats.values())
          .reduce((sum, stat) => sum + stat.proficiency, 0) / techStats.size
      }}
      className={className}
      isEmpty={!techStats.size}
    >
      <div ref={containerRef} className="relative">
        {/* Connection paths */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          {paths.map((path, index) => (
            <motion.path
              key={index}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              d={`M ${path.start.x + path.start.width / 2} ${path.start.y + path.start.height / 2} 
                  L ${path.end.x + path.end.width / 2} ${path.end.y + path.end.height / 2}`}
              stroke={path.color}
              strokeWidth="2"
              fill="none"
            />
          ))}
        </svg>

        {/* Technology nodes */}
        <div className="space-y-8">
          {data.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.nodes
                  .filter(node => node.category === category.name)
                  .map((node, nodeIndex) => (
                    <motion.div
                      id={`node-${node.id}`}
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (categoryIndex * 0.1) + (nodeIndex * 0.05) }}
                      onMouseEnter={(e) => handleNodeMouseEnter(e, node)}
                      onMouseLeave={handleNodeMouseLeave}
                      onClick={() => onNodeClick?.(node)}
                      className="cursor-pointer"
                    >
                      <Card className="relative p-4 hover:shadow-lg transition-all duration-300">
                        {/* Card content */}
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <ClientIcon
                                Icon={Icons[node.icon]}
                                className="h-5 w-5 text-primary"
                              />
                              <div>
                                <h4 className="font-medium">{node.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {node.experience}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(statusColors[node.status])}
                            >
                              {node.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Proficiency</span>
                              <span>{node.proficiency}%</span>
                            </div>
                            <Progress
                              value={node.proficiency}
                              className="h-2"
                              indicatorClassName={cn(
                                "transition-all",
                                node.proficiency >= 80 && "bg-green-500",
                                node.proficiency >= 60 && node.proficiency < 80 && "bg-blue-500",
                                node.proficiency >= 40 && node.proficiency < 60 && "bg-yellow-500",
                                node.proficiency < 40 && "bg-red-500"
                              )}
                            />
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {node.skills.slice(0, 3).map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-background/50"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {node.skills.length > 3 && (
                              <Badge
                                variant="outline"
                                className="bg-background/50"
                              >
                                +{node.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{node.projects} projects</span>
                            <span>{node.connections.length} connections</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        <VisualizationLegend
          title="Technology Categories"
          items={legendItems}
          position="top-right"
        />

        <VisualizationTooltip
          content={tooltipContent}
          visible={showTooltip}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
        />
      </div>
    </VisualizationContainer>
  )
} 