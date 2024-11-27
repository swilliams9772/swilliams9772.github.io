"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { Card } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface SkillNode {
  id: string;
  group: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  projects: number;
  relatedSkills: string[];
}

interface SkillLink {
  source: string;
  target: string;
  strength: number;
  projects: number;
}

interface SkillGraph {
  nodes: SkillNode[];
  links: SkillLink[];
}

interface SkillRelationshipVisualizationProps {
  data: SkillGraph;
  width?: number;
  height?: number;
  className?: string;
  onNodeClick?: (node: SkillNode) => void;
}

const levelColors = {
  Expert: '#22c55e',
  Advanced: '#3b82f6',
  Intermediate: '#f59e0b'
};

export function SkillRelationshipVisualization({
  data,
  width = 800,
  height = 600,
  className,
  onNodeClick
}: SkillRelationshipVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("z-index", "100");

    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(d => 100 / (d as any).strength)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    const svg = d3.select(svgRef.current);

    // Create gradient definitions
    const defs = svg.append("defs");
    
    // Add gradients for each skill level
    Object.entries(levelColors).forEach(([level, color]) => {
      const gradient = defs.append("radialGradient")
        .attr("id", `gradient-${level}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.2);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.8);
    });

    // Create links
    const links = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.projects));

    // Create nodes
    const nodes = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      )
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip)
      .on("click", (event, d) => onNodeClick?.(d));

    // Add circles to nodes
    nodes.append("circle")
      .attr("r", d => Math.sqrt(d.projects) * 5)
      .attr("fill", d => `url(#gradient-${d.level})`)
      .attr("stroke", d => levelColors[d.level])
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300 hover:filter hover:brightness-110");

    // Add labels to nodes
    nodes.append("text")
      .text(d => d.id)
      .attr("x", 0)
      .attr("y", d => -Math.sqrt(d.projects) * 5 - 5)
      .attr("text-anchor", "middle")
      .attr("class", "text-sm fill-current");

    // Add group badges
    nodes.append("text")
      .text(d => d.group)
      .attr("x", d => Math.sqrt(d.projects) * 5 + 5)
      .attr("y", 0)
      .attr("class", "text-xs fill-muted-foreground");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodes.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Tooltip functions
    function showTooltip(event: MouseEvent, d: SkillNode) {
      tooltip
        .style("visibility", "visible")
        .html(`
          <div class="space-y-2">
            <div class="font-semibold">${d.id}</div>
            <div>Level: ${d.level}</div>
            <div>Projects: ${d.projects}</div>
            <div>Group: ${d.group}</div>
            <div>Related Skills: ${d.relatedSkills.join(', ')}</div>
          </div>
        `);
      moveTooltip(event);
    }

    function moveTooltip(event: MouseEvent) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    }

    function hideTooltip() {
      tooltip.style("visibility", "hidden");
    }

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, SkillNode, SkillNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, SkillNode, SkillNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, SkillNode, SkillNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, width, height, onNodeClick]);

  return (
    <Card className={cn("p-4 relative overflow-hidden", className)}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
      />
      <div ref={tooltipRef} />
    </Card>
  );
} 