"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { VisualizationContainer } from './visualization-container'
import { VisualizationTooltip } from './visualization-tooltip'
import { VisualizationLegend } from './visualization-legend'
import { useVisualizationResize } from '@/hooks/use-visualization-resize'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'
import type { Contributor, Collaboration } from '@/types/visualization'

interface ProjectCollaboration {
  contributors: Contributor[];
  collaborations: Collaboration[];
  timeRange: string;
  totalCommits: number;
  totalReviews: number;
  totalIssues: number;
}

interface ProjectCollaborationNetworkProps {
  data: ProjectCollaboration;
  className?: string;
  onContributorClick?: (contributor: Contributor) => void;
}

const collaborationTypes = {
  review: {
    color: '#22c55e',
    icon: Icons.GitMerge,
    label: 'Code Reviews'
  },
  coauthor: {
    color: '#3b82f6',
    icon: Icons.GitCommit,
    label: 'Co-authored Commits'
  },
  discussion: {
    color: '#f59e0b',
    icon: Icons.MessageSquare,
    label: 'Discussions'
  },
  bugfix: {
    color: '#ef4444',
    icon: Icons.Bug,
    label: 'Bug Fixes'
  }
} as const;

export function ProjectCollaborationNetwork({
  data = {
    contributors: [],
    collaborations: [],
    timeRange: '',
    totalCommits: 0,
    totalReviews: 0,
    totalIssues: 0
  },
  className,
  onContributorClick
}: ProjectCollaborationNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const { containerRef, width, height } = useVisualizationResize()

  useEffect(() => {
    if (!svgRef.current || !data?.contributors?.length) return

    // Validate collaborations
    const validCollaborations = data.collaborations.filter(collab => {
      const sourceExists = data.contributors.some(c => c.id === collab.source)
      const targetExists = data.contributors.some(c => c.id === collab.target)
      return sourceExists && targetExists
    })

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Create force simulation
    const simulation = d3.forceSimulation(data.contributors)
      .force("link", d3.forceLink(validCollaborations)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50))

    // Add gradients
    const defs = svg.append("defs")
    
    Object.entries(collaborationTypes).forEach(([type, config]) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `link-${type}`)
        .attr("gradientUnits", "userSpaceOnUse")

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", config.color)
        .attr("stop-opacity", 0.2)

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", config.color)
        .attr("stop-opacity", 0.6)
    })

    // Add links
    const links = svg.append("g")
      .selectAll("line")
      .data(validCollaborations)
      .join("line")
      .attr("stroke", d => collaborationTypes[d.type].color)
      .attr("stroke-width", d => Math.sqrt(d.count))
      .attr("stroke-opacity", 0.6)

    // Add nodes
    const nodes = svg.append("g")
      .selectAll("g")
      .data(data.contributors)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseenter", handleNodeMouseEnter)
      .on("mouseleave", handleNodeMouseLeave)
      .on("click", (event, d) => onContributorClick?.(d))
      .style("cursor", "pointer")

    // Add circles
    nodes.append("circle")
      .attr("r", d => Math.sqrt(d.commits + d.reviews) * 2)
      .attr("fill", "white")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300 hover:filter hover:brightness-110")

    // Add avatars
    nodes.append("clipPath")
      .attr("id", d => `clip-${d.id}`)
      .append("circle")
      .attr("r", d => Math.sqrt(d.commits + d.reviews) * 2)

    nodes.append("image")
      .attr("xlink:href", d => d.avatar)
      .attr("x", d => -Math.sqrt(d.commits + d.reviews) * 2)
      .attr("y", d => -Math.sqrt(d.commits + d.reviews) * 2)
      .attr("width", d => Math.sqrt(d.commits + d.reviews) * 4)
      .attr("height", d => Math.sqrt(d.commits + d.reviews) * 4)
      .attr("clip-path", d => `url(#clip-${d.id})`)

    // Add labels
    nodes.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("y", d => Math.sqrt(d.commits + d.reviews) * 2 + 20)
      .attr("class", "text-sm font-medium")

    nodes.append("text")
      .text(d => d.role)
      .attr("text-anchor", "middle")
      .attr("y", d => Math.sqrt(d.commits + d.reviews) * 2 + 35)
      .attr("class", "text-xs text-muted-foreground")

    // Update positions
    simulation.on("tick", () => {
      links
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y)

      nodes.attr("transform", d => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Contributor, Contributor>) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Contributor, Contributor>) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Contributor, Contributor>) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    // Add keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      const node = d3.select(document.activeElement as SVGGElement)
      if (!node.empty()) {
        switch (event.key) {
          case 'ArrowRight':
            // Navigate to next node
            break;
          case 'ArrowLeft':
            // Navigate to previous node
            break;
          case 'Enter':
            // Trigger click event
            break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [data, width, height, onContributorClick])

  const handleNodeMouseEnter = (event: MouseEvent, d: Contributor) => {
    setTooltipContent(
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={d.avatar} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">{d.name}</div>
            <div className="text-xs text-muted-foreground">{d.role}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <ClientIcon Icon={Icons.GitCommit} className="w-3 h-3" />
              <span>{d.commits} commits</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ClientIcon Icon={Icons.GitMerge} className="w-3 h-3" />
              <span>{d.reviews} reviews</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <ClientIcon Icon={Icons.MessageSquare} className="w-3 h-3" />
              <span>{d.issues} issues</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <ClientIcon Icon={Icons.TrendingUp} className="w-3 h-3" />
              <span>+{d.additions}</span>
            </div>
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

  const legendItems = Object.entries(collaborationTypes).map(([key, config]) => ({
    label: config.label,
    icon: config.icon,
    color: config.color
  }))

  return (
    <VisualizationContainer
      title="Project Collaborations"
      timeRange={data.timeRange}
      summary={{
        'Total Commits': data.totalCommits,
        'Code Reviews': data.totalReviews,
        'Issues Resolved': data.totalIssues
      }}
      className={className}
      isEmpty={!data?.contributors?.length}
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
          title="Collaboration Types"
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