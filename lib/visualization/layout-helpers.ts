import * as d3 from 'd3'
import { TechNode, TechLink } from '@/types'

// Force-directed layout
export function createForceLayout(
  nodes: TechNode[],
  links: TechLink[],
  width: number,
  height: number
) {
  return d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
      .id((d: any) => d.id)
      .distance(d => 100 * (1 - (d as TechLink).strength))
      .strength(d => (d as TechLink).strength))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(60))
    .force("x", d3.forceX(width / 2).strength(0.1))
    .force("y", d3.forceY(height / 2).strength(0.1));
}

// Radial layout
export function createRadialLayout(
  nodes: TechNode[],
  links: TechLink[],
  width: number,
  height: number
) {
  const radius = Math.min(width, height) / 3;
  
  return d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
      .id((d: any) => d.id)
      .distance(d => radius * 0.5)
      .strength(d => (d as TechLink).strength * 0.5))
    .force("r", d3.forceRadial(
      d => {
        switch (d.level) {
          case 'core': return radius * 0.3;
          case 'primary': return radius * 0.6;
          case 'secondary': return radius * 0.8;
          case 'auxiliary': return radius;
          default: return radius * 0.5;
        }
      },
      width / 2,
      height / 2
    ))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("collision", d3.forceCollide().radius(30));
}

// Hierarchical layout
export function createHierarchicalLayout(
  nodes: TechNode[],
  links: TechLink[],
  width: number,
  height: number
) {
  const levels = ['core', 'primary', 'secondary', 'auxiliary'];
  const levelHeight = height / (levels.length + 1);
  
  return d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
      .id((d: any) => d.id)
      .distance(100)
      .strength(0.5))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("x", d3.forceX(width / 2).strength(0.1))
    .force("y", d3.forceY((d: TechNode) => {
      const levelIndex = levels.indexOf(d.level);
      return levelHeight * (levelIndex + 1);
    }).strength(1))
    .force("collision", d3.forceCollide().radius(40));
}

// Helper functions for node positioning
export function calculateNodePositions(
  nodes: TechNode[],
  layout: 'force' | 'radial' | 'hierarchical',
  width: number,
  height: number
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();

  switch (layout) {
    case 'radial':
      const radius = Math.min(width, height) / 3;
      nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * 2 * Math.PI;
        positions.set(node.id, {
          x: width/2 + radius * Math.cos(angle),
          y: height/2 + radius * Math.sin(angle)
        });
      });
      break;

    case 'hierarchical':
      const levels = ['core', 'primary', 'secondary', 'auxiliary'];
      const levelHeight = height / (levels.length + 1);
      nodes.forEach(node => {
        const levelIndex = levels.indexOf(node.level);
        const nodesAtLevel = nodes.filter(n => n.level === node.level);
        const nodeIndex = nodesAtLevel.indexOf(node);
        const xSpacing = width / (nodesAtLevel.length + 1);
        positions.set(node.id, {
          x: xSpacing * (nodeIndex + 1),
          y: levelHeight * (levelIndex + 1)
        });
      });
      break;

    default: // force
      nodes.forEach(node => {
        positions.set(node.id, {
          x: width/2 + (Math.random() - 0.5) * 100,
          y: height/2 + (Math.random() - 0.5) * 100
        });
      });
      break;
  }

  return positions;
}

// Helper functions for link positioning
export function calculateLinkPositions(
  links: TechLink[],
  nodePositions: Map<string, { x: number; y: number }>
): { x1: number; y1: number; x2: number; y2: number }[] {
  return links.map(link => {
    const source = nodePositions.get(link.source as string);
    const target = nodePositions.get(link.target as string);
    
    if (!source || !target) {
      throw new Error(`Node position not found for link: ${link.source} -> ${link.target}`);
    }

    return {
      x1: source.x,
      y1: source.y,
      x2: target.x,
      y2: target.y
    };
  });
}

// Helper function to create simulation
export function createSimulation(
  layout: 'force' | 'radial' | 'hierarchical',
  nodes: TechNode[],
  links: TechLink[],
  width: number,
  height: number
) {
  switch (layout) {
    case 'radial':
      return createRadialLayout(nodes, links, width, height);
    case 'hierarchical':
      return createHierarchicalLayout(nodes, links, width, height);
    default:
      return createForceLayout(nodes, links, width, height);
  }
} 