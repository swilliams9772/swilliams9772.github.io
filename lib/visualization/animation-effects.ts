import * as d3 from 'd3'
import { TechNode, TechLink } from '@/types'

// Enhanced transition configurations
const TRANSITION_CONFIGS = {
  default: {
    duration: 750,
    ease: d3.easeCubicInOut
  },
  fast: {
    duration: 300,
    ease: d3.easeQuadOut
  },
  slow: {
    duration: 1200,
    ease: d3.easeElasticOut.amplitude(1).period(0.5)
  },
  bounce: {
    duration: 1000,
    ease: d3.easeBounceOut
  }
} as const

// Node entrance animations
export function animateNodeEntrance(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  config = TRANSITION_CONFIGS.default
) {
  // Scale up nodes from center
  nodes
    .attr("transform", d => `translate(${d.x},${d.y}) scale(0)`)
    .transition()
    .duration(config.duration)
    .ease(config.ease)
    .attr("transform", d => `translate(${d.x},${d.y}) scale(1)`);

  // Fade in node elements
  nodes.selectAll("circle, text")
    .style("opacity", 0)
    .transition()
    .duration(config.duration)
    .ease(config.ease)
    .style("opacity", 1);

  return nodes;
}

// Link entrance animations
export function animateLinkEntrance(
  links: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  config = TRANSITION_CONFIGS.default
) {
  // Animate link drawing
  const totalLength = links.node()?.getTotalLength() || 0;
  
  links
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(config.duration)
    .ease(config.ease)
    .attr("stroke-dashoffset", 0);

  return links;
}

// Node highlight effects
export function animateNodeHighlight(
  node: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  isHighlighted: boolean,
  config = TRANSITION_CONFIGS.fast
) {
  // Pulse effect on highlight
  node.select("circle")
    .transition()
    .duration(config.duration / 2)
    .ease(d3.easeQuadInOut)
    .attr("r", d => (d.size || 30) * (isHighlighted ? 1.2 : 1))
    .attr("stroke-width", isHighlighted ? 3 : 2)
    .attr("filter", isHighlighted ? "url(#glow)" : null);

  // Text emphasis
  node.select("text")
    .transition()
    .duration(config.duration / 2)
    .ease(d3.easeQuadInOut)
    .style("font-weight", isHighlighted ? "bold" : "normal")
    .style("font-size", isHighlighted ? "14px" : "12px");

  return node;
}

// Link highlight effects
export function animateLinkHighlight(
  link: d3.Selection<SVGLineElement, TechLink, SVGGElement, unknown>,
  isHighlighted: boolean,
  config = TRANSITION_CONFIGS.fast
) {
  link.transition()
    .duration(config.duration)
    .ease(config.ease)
    .attr("stroke-width", d => 
      Math.sqrt(d.value || 1) * (isHighlighted ? 2 : 1)
    )
    .style("stroke-opacity", isHighlighted ? 1 : 0.6);

  return link;
}

// Cluster transition animation
export function animateClusterTransition(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  clusters: { [key: string]: { x: number; y: number } },
  config = TRANSITION_CONFIGS.slow
) {
  nodes.transition()
    .duration(config.duration)
    .ease(config.ease)
    .attr("transform", d => {
      const cluster = clusters[d.category];
      return `translate(${cluster.x},${cluster.y})`;
    });

  return nodes;
}

// Force-directed layout animation
export function animateForceLayout(
  simulation: d3.Simulation<TechNode, TechLink>,
  alpha: number = 0.3,
  config = TRANSITION_CONFIGS.default
) {
  simulation.alpha(alpha);
  
  // Custom tick animation
  let tickCounter = 0;
  const maxTicks = 300;
  
  simulation.on("tick", () => {
    tickCounter++;
    if (tickCounter >= maxTicks) {
      simulation.stop();
    }
  });

  simulation.restart();
}

// Radial expansion animation
export function animateRadialExpansion(
  nodes: d3.Selection<SVGGElement, TechNode, SVGGElement, unknown>,
  center: { x: number; y: number },
  radius: number,
  config = TRANSITION_CONFIGS.bounce
) {
  const angleStep = (2 * Math.PI) / nodes.size();
  
  nodes.transition()
    .duration(config.duration)
    .ease(config.ease)
    .attr("transform", (d, i) => {
      const angle = i * angleStep;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      return `translate(${x},${y})`;
    });

  return nodes;
}

// Add SVG filters for visual effects
export function setupSVGFilters(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
  // Glow effect
  const defs = svg.append("defs");
  
  const filter = defs.append("filter")
    .attr("id", "glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

  filter.append("feGaussianBlur")
    .attr("stdDeviation", "3")
    .attr("result", "coloredBlur");

  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in", "coloredBlur");
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

  // Gradient definitions
  const gradient = defs.append("radialGradient")
    .attr("id", "node-gradient")
    .attr("gradientUnits", "objectBoundingBox")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "var(--primary)")
    .attr("stop-opacity", 0.2);

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "var(--primary)")
    .attr("stop-opacity", 0.8);

  return svg;
} 