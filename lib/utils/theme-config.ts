export const gradients = {
  primary: 'from-primary/5 to-secondary/5',
  secondary: 'from-secondary/5 to-primary/5',
  blue: 'from-blue-500/20 to-purple-500/20',
  green: 'from-green-500/20 to-emerald-500/20',
  orange: 'from-orange-500/20 to-red-500/20',
  pink: 'from-pink-500/20 to-rose-500/20',
  purple: 'from-purple-500/20 to-indigo-500/20',
  accent: 'from-accent/5 to-accent/20'
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
  fast: 'transition-all duration-200',
  medium: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  bounce: 'transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'
}

export const glassEffect = {
  light: 'bg-white/30 backdrop-blur-md',
  dark: 'bg-black/30 backdrop-blur-md',
  subtle: 'bg-background/80 backdrop-blur-sm',
  strong: 'bg-background/90 backdrop-blur-lg'
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
  primary: 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
  blue: 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
  green: 'bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent',
  accent: 'bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent'
} 