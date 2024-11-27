"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { Card } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface Node {
  id: string;
  group: string;
  size: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface ProjectGraphData {
  nodes: Node[];
  links: Link[];
}

interface ProjectRelationshipGraphProps {
  data: ProjectGraphData;
  width?: number;
  height?: number;
  className?: string;
}

export function ProjectRelationshipGraph({ 
  data, 
  width = 800, 
  height = 600,
  className 
}: ProjectRelationshipGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Create SVG elements
    const svg = d3.select(svgRef.current);

    // Add links
    const links = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // Add nodes
    const nodes = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles to nodes
    nodes.append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => d.color)
      .attr("class", "transition-all duration-300 hover:filter hover:brightness-110");

    // Add labels to nodes
    nodes.append("text")
      .text((d) => d.id)
      .attr("x", 0)
      .attr("y", (d) => -d.size - 5)
      .attr("text-anchor", "middle")
      .attr("class", "text-sm fill-current");

    // Add group badges
    nodes.append("g")
      .attr("transform", (d) => `translate(${d.size + 5}, 0)`)
      .append("text")
      .text((d) => d.group)
      .attr("class", "text-xs fill-muted-foreground");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  return (
    <Card className={cn("p-4 overflow-hidden", className)}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
      />
    </Card>
  );
} 