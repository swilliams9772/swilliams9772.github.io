import * as d3 from 'd3'
import { TechNode, TechLink } from '@/types'

// Enhanced transition configurations
const TRANSITION_DURATION = 750
const TRANSITION_EASE = d3.easeCubicInOut

// Node animation helpers
export function animateNodes(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  duration: number = TRANSITION_DURATION
) {
  // Animate node positions
  nodes.transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Animate node colors
  nodes.select("circle")
    .transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .attr("r", d => d.size || 30)
    .attr("fill-opacity", 0.7)
    .attr("stroke-width", 2);

  // Animate labels
  nodes.select("text")
    .transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .attr("font-size", "12px")
    .attr("dy", 4);

  return nodes;
}

// Link animation helpers
export function animateLinks(
  links: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  duration: number = TRANSITION_DURATION
) {
  links.transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .attr("x1", d => (d.source as any).x)
    .attr("y1", d => (d.source as any).y)
    .attr("x2", d => (d.target as any).x)
    .attr("y2", d => (d.target as any).y)
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => Math.sqrt(d.value || 1));

  return links;
}

// Zoom animation helpers
export function animateZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  transform: d3.ZoomTransform,
  duration: number = TRANSITION_DURATION
) {
  svg.transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .call(
      d3.zoom<SVGSVGElement, unknown>().transform as any,
      transform
    );
}

// Layout transition animations
export function animateLayoutTransition(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  links: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  layout: 'force' | 'radial' | 'hierarchical',
  width: number,
  height: number,
  duration: number = TRANSITION_DURATION
) {
  // Store current positions
  const nodePositions = new Map(
    nodes.data().map(d => [d.id, { x: d.x, y: d.y }])
  );

  // Calculate new positions based on layout
  const newPositions = calculateLayoutPositions(
    nodes.data(),
    layout,
    width,
    height
  );

  // Animate to new positions
  nodes.each(function(d) {
    const node = d3.select(this);
    const oldPos = nodePositions.get(d.id);
    const newPos = newPositions.get(d.id);

    if (oldPos && newPos) {
      node.transition()
        .duration(duration)
        .ease(TRANSITION_EASE)
        .attrTween("transform", () => {
          return t => {
            const x = oldPos.x + (newPos.x - oldPos.x) * t;
            const y = oldPos.y + (newPos.y - oldPos.y) * t;
            return `translate(${x},${y})`;
          };
        });
    }
  });

  // Animate links
  links.transition()
    .duration(duration)
    .ease(TRANSITION_EASE)
    .attrTween("x1", function(d) {
      const source = nodePositions.get((d.source as TechNode).id);
      const targetSource = newPositions.get((d.source as TechNode).id);
      return t => source!.x + (targetSource!.x - source!.x) * t;
    })
    .attrTween("y1", function(d) {
      const source = nodePositions.get((d.source as TechNode).id);
      const targetSource = newPositions.get((d.source as TechNode).id);
      return t => source!.y + (targetSource!.y - source!.y) * t;
    })
    .attrTween("x2", function(d) {
      const target = nodePositions.get((d.target as TechNode).id);
      const targetTarget = newPositions.get((d.target as TechNode).id);
      return t => target!.x + (targetTarget!.x - target!.x) * t;
    })
    .attrTween("y2", function(d) {
      const target = nodePositions.get((d.target as TechNode).id);
      const targetTarget = newPositions.get((d.target as TechNode).id);
      return t => target!.y + (targetTarget!.y - target!.y) * t;
    });
}

// Helper function to calculate positions for different layouts
function calculateLayoutPositions(
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

// Interactive feature animations
export function highlightNode(
  node: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  links: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  isHighlighted: boolean
) {
  // Highlight the selected node
  node.select("circle")
    .transition()
    .duration(300)
    .attr("r", d => (d.size || 30) * (isHighlighted ? 1.2 : 1))
    .attr("stroke-width", isHighlighted ? 3 : 2)
    .attr("stroke-opacity", isHighlighted ? 1 : 0.6);

  // Highlight connected links
  links
    .transition()
    .duration(300)
    .attr("stroke-opacity", d => {
      const isConnected = (d.source as TechNode).id === (node.datum() as TechNode).id ||
                         (d.target as TechNode).id === (node.datum() as TechNode).id;
      return isHighlighted && isConnected ? 1 : 0.6;
    })
    .attr("stroke-width", d => {
      const isConnected = (d.source as TechNode).id === (node.datum() as TechNode).id ||
                         (d.target as TechNode).id === (node.datum() as TechNode).id;
      return isHighlighted && isConnected ? Math.sqrt(d.value || 1) * 2 : Math.sqrt(d.value || 1);
    });
}

// Pulse animation for highlighting
export function pulseNode(
  node: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>
) {
  const circle = node.select("circle");
  const originalRadius = parseFloat(circle.attr("r"));

  circle
    .transition()
    .duration(400)
    .attr("r", originalRadius * 1.3)
    .attr("stroke-opacity", 1)
    .transition()
    .duration(400)
    .attr("r", originalRadius)
    .attr("stroke-opacity", 0.6);
} 