"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { VisualizationContainer } from './visualization-container'
import { VisualizationTooltip } from './visualization-tooltip'
import { VisualizationLegend } from './visualization-legend'
import { useVisualizationResize } from '@/hooks/use-visualization-resize'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'

// Enhanced interfaces
interface SkillMilestone {
  date: string;
  level: number;
  description: string;
  achievement?: string;
  impact?: string;
}

interface Skill {
  name: string;
  level: number;
  date: string;
  category: string;
  milestones: SkillMilestone[];
  description?: string;
  projects?: number;
  impact?: string;
  timeline?: number[];
  certifications?: string[];
  tools?: string[];
  relatedSkills?: string[];
  status: 'active' | 'learning' | 'planned';
}

interface SkillCategory {
  name: string;
  color: string;
  icon: keyof typeof Icons;
  skills: Skill[];
  description?: string;
  totalProjects?: number;
  averageLevel?: number;
}

interface SkillEvolutionTimelineProps {
  categories: SkillCategory[];
  className?: string;
  onSkillClick?: (skill: Skill) => void;
  onCategoryClick?: (category: SkillCategory) => void;
  showMilestones?: boolean;
  showTimeline?: boolean;
  showRelatedSkills?: boolean;
}

// Enhanced configuration
const levelConfig = {
  beginner: {
    color: '#22c55e',
    icon: Icons.Star,
    label: 'Beginner',
    range: [0, 25]
  },
  intermediate: {
    color: '#3b82f6',
    icon: Icons.Award,
    label: 'Intermediate',
    range: [26, 50]
  },
  advanced: {
    color: '#f59e0b',
    icon: Icons.Trophy,
    label: 'Advanced',
    range: [51, 75]
  },
  expert: {
    color: '#ef4444',
    icon: Icons.Zap,
    label: 'Expert',
    range: [76, 100]
  }
} as const;

export function SkillEvolutionTimeline({
  categories = [],
  className,
  onSkillClick,
  onCategoryClick,
  showMilestones = true,
  showTimeline = true,
  showRelatedSkills = true
}: SkillEvolutionTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const { containerRef, width, height } = useVisualizationResize()

  useEffect(() => {
    if (!svgRef.current || !categories?.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 40, right: 40, bottom: 40, left: 100 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create main group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Enhanced data processing
    const allSkills = categories.flatMap(category => 
      category.skills.map(skill => ({
        ...skill,
        categoryName: category.name,
        categoryColor: category.color
      }))
    )

    // Create scales with enhanced domains
    const timeScale = d3.scaleTime()
      .domain(d3.extent(allSkills.flatMap(skill => 
        [new Date(skill.date), ...skill.milestones.map(m => new Date(m.date))]
      )) as [Date, Date])
      .range([0, innerWidth])

    const levelScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0])

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(levelScale)
        .tickSize(-innerWidth)
        .tickFormat(() => "")
      )
      .style("stroke-opacity", 0.1)

    // Enhanced skill paths
    categories.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.timeline && skill.timeline.length > 1) {
          const line = d3.line<number>()
            .x((_, i) => timeScale(new Date(skill.date)))
            .y(d => levelScale(d))

          g.append("path")
            .datum(skill.timeline)
            .attr("fill", "none")
            .attr("stroke", category.color)
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.6)
            .attr("d", line)
        }
      })
    })

    // Draw category lanes
    g.selectAll(".category-lane")
      .data(categories)
      .join("rect")
      .attr("class", "category-lane")
      .attr("x", 0)
      .attr("y", d => categoryScale(d.name)!)
      .attr("width", innerWidth)
      .attr("height", categoryScale.bandwidth())
      .attr("fill", d => `url(#gradient-${d.id})`)
      .attr("rx", 4);

    // Create gradients for category lanes
    const defs = svg.append("defs");
    
    categories.forEach(category => {
      const gradient = defs.append("linearGradient")
        .attr("id", `gradient-${category.id}`)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", category.color)
        .attr("stop-opacity", 0.1);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", category.color)
        .attr("stop-opacity", 0.3);
    });

    // Draw skills
    const skillGroups = g.selectAll(".skill")
      .data(allSkills)
      .join("g")
      .attr("class", "skill")
      .attr("transform", d => 
        `translate(${timeScale(new Date(d.date))},${categoryScale(d.categoryName)! + categoryScale.bandwidth() / 2})`
      )
      .style("cursor", "pointer")
      .on("mouseenter", handleSkillMouseEnter)
      .on("mouseleave", handleSkillMouseLeave)
      .on("click", (event, d) => onSkillClick?.(d));

    // Add skill circles
    skillGroups.append("circle")
      .attr("r", 8)
      .attr("fill", d => levelConfig[d.level].color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300 hover:filter hover:brightness-110");

    // Add skill icons
    skillGroups.each(function(d: any) {
      const Icon = Icons[categories.find(c => c.name === d.categoryName)?.icon || 'Star'];
      const iconSize = 12;
      
      d3.select(this)
        .append("foreignObject")
        .attr("width", iconSize)
        .attr("height", iconSize)
        .attr("x", -iconSize / 2)
        .attr("y", -iconSize / 2)
        .append("xhtml:div")
        .attr("class", "flex items-center justify-center h-full")
        .append("xhtml:div")
        .html(`<svg class="w-3 h-3 text-white">${Icon({}).props.children}</svg>`);
    });

    // Add time axis
    const timeAxis = d3.axisBottom(timeScale)
      .ticks(10)
      .tickFormat(d3.timeFormat("%b %Y"));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(timeAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add category labels
    g.selectAll(".category-label")
      .data(categories)
      .join("text")
      .attr("class", "category-label")
      .attr("x", -10)
      .attr("y", d => categoryScale(d.name)! + categoryScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-weight", "bold")
      .text(d => d.name);

    // Tooltip functions
    function handleSkillMouseEnter(event: MouseEvent, skill: Skill & { categoryName: string; categoryColor: string }) {
      setTooltipContent(
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ClientIcon
              Icon={Icons[getSkillIcon(skill.level)]}
              className="h-5 w-5"
              style={{ color: skill.categoryColor }}
            />
            <div>
              <div className="font-medium">{skill.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(skill.date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {skill.description && (
            <div className="text-sm">{skill.description}</div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Level: {getSkillLevel(skill.level)}</div>
            {skill.projects && <div>{skill.projects} projects</div>}
          </div>

          {skill.certifications && skill.certifications.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Certifications:</div>
              <div className="flex flex-wrap gap-1">
                {skill.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {showRelatedSkills && skill.relatedSkills && skill.relatedSkills.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Related Skills:</div>
              <div className="flex flex-wrap gap-1">
                {skill.relatedSkills.map((related, index) => (
                  <Badge key={index} variant="outline" className="bg-muted">
                    {related}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {skill.impact && (
            <div className="text-sm text-green-500">{skill.impact}</div>
          )}
        </div>
      )
      setTooltipPosition({ x: event.pageX, y: event.pageY })
      setShowTooltip(true)
    }

    function handleSkillMouseLeave() {
      setShowTooltip(false)
    }

    function getSkillLevel(level: number) {
      return levelConfig[level].label;
    }

    function getSkillIcon(level: number) {
      return levelConfig[level].icon;
    }

  }, [categories, width, height, showMilestones, showTimeline, showRelatedSkills]);

  const legendItems = [
    ...Object.entries(levelConfig).map(([key, config]) => ({
      label: config.label,
      color: config.color
    })),
    ...categories.map(category => ({
      label: category.name,
      icon: Icons[category.icon],
      color: category.color
    }))
  ]

  return (
    <VisualizationContainer
      title="Skill Evolution"
      className={className}
      isEmpty={!categories?.length}
    >
      <div ref={containerRef} className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
        />
        
        <VisualizationLegend
          title="Skill Levels & Categories"
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