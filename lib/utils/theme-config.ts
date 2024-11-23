export const gradients = {
  primary: 'from-primary/10 via-primary/5 to-transparent',
  secondary: 'from-secondary/10 via-secondary/5 to-transparent',
  accent: 'from-accent/10 via-accent/5 to-transparent',
  blue: 'from-blue-500/10 via-blue-500/5 to-transparent',
  purple: 'from-purple-500/10 via-purple-500/5 to-transparent',
  green: 'from-green-500/10 via-green-500/5 to-transparent'
}

export const shadows = {
  sm: 'shadow-sm hover:shadow-md',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl',
  xl: 'shadow-xl hover:shadow-2xl',
  inner: 'shadow-inner',
  none: 'shadow-none'
}

export const transitions = {
  fast: 'transition-all duration-300',
  medium: 'transition-all duration-500',
  slow: 'transition-all duration-700',
  bounce: 'transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'
}

export const glassEffect = {
  light: 'bg-white/30 backdrop-blur-md border border-white/20',
  dark: 'bg-black/30 backdrop-blur-md border border-white/10',
  subtle: 'bg-background/80 backdrop-blur-sm border border-border/50',
  strong: 'bg-background/90 backdrop-blur-lg border border-border'
}

export const borderStyles = {
  subtle: 'border border-border/50',
  medium: 'border-2 border-border',
  strong: 'border-4 border-primary',
  gradient: 'border border-transparent bg-gradient-to-r from-primary to-secondary'
}

export const hoverEffects = {
  scale: 'hover:scale-[1.02] active:scale-[0.98]',
  glow: 'hover:shadow-glow-primary',
  lift: 'hover:-translate-y-1',
  shine: 'hover:before:opacity-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity overflow-hidden relative',
  pulse: 'hover:animate-pulse',
  bounce: 'hover:animate-bounce'
}

export const textGradients = {
  primary: 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary',
  secondary: 'bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary',
  accent: 'bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary'
}

export const patterns = {
  dots: `bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_1px,transparent_1px)] 
         bg-[length:24px_24px] 
         [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]`,
  grid: `bg-[linear-gradient(to_right,_var(--tw-gradient-from)_1px,transparent_1px),
         linear-gradient(to_bottom,_var(--tw-gradient-from)_1px,transparent_1px)] 
         bg-[length:24px_24px]
         [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]`,
  waves: `bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,transparent_70%)]
          [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]`,
  none: ''
} 