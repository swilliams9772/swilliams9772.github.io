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

// Helper functions for layout transitions
export function transitionToLayout(
  simulation: d3.Simulation<TechNode, TechLink>,
  layout: 'force' | 'radial' | 'hierarchical',
  nodes: TechNode[],
  links: TechLink[],
  width: number,
  height: number
) {
  // Stop current simulation
  simulation.stop();

  // Create new simulation based on layout type
  const newSimulation = layout === 'radial'
    ? createRadialLayout(nodes, links, width, height)
    : layout === 'hierarchical'
    ? createHierarchicalLayout(nodes, links, width, height)
    : createForceLayout(nodes, links, width, height);

  // Copy current positions for smooth transition
  nodes.forEach(node => {
    node.fx = node.x;
    node.fy = node.y;
  });

  // Run new simulation and gradually release fixed positions
  newSimulation
    .alpha(1)
    .restart();

  // Release fixed positions over time
  setTimeout(() => {
    nodes.forEach(node => {
      node.fx = null;
      node.fy = null;
    });
  }, 100);

  return newSimulation;
}

// Layout animation helpers
export function animateLayoutTransition(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  links: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  duration: number = 750
) {
  // Animate nodes
  nodes.transition()
    .duration(duration)
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Animate links
  links.transition()
    .duration(duration)
    .attr("x1", d => (d.source as any).x)
    .attr("y1", d => (d.source as any).y)
    .attr("x2", d => (d.target as any).x)
    .attr("y2", d => (d.target as any).y);
}

// Zoom and pan helpers
export function setupZoomBehavior(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number
) {
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 4])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  // Add zoom controls
  return {
    zoomIn: () => {
      svg.transition()
        .duration(750)
        .call(zoom.scaleBy, 1.2);
    },
    zoomOut: () => {
      svg.transition()
        .duration(750)
        .call(zoom.scaleBy, 0.8);
    },
    resetZoom: () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    },
    fitView: () => {
      const bounds = g.node()?.getBBox();
      if (bounds) {
        const dx = bounds.width;
        const dy = bounds.height;
        const x = bounds.x + (dx / 2);
        const y = bounds.y + (dy / 2);

        const scale = Math.min(0.9 / Math.max(dx / width, dy / height));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(translate[0], translate[1])
              .scale(scale)
          );
      }
    }
  };
} 