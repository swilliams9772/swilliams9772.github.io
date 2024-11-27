export const colors = {
  // Primary palette
  primary: {
    DEFAULT: '#dd845b', // Copper Coin - Main brand color
    foreground: '#ffffff',
    muted: '#dd845b33',
    hover: '#db8b40', // Golden Nugget - Hover state
  },

  // Secondary palette  
  secondary: {
    DEFAULT: '#8fa781', // Succulent - Secondary actions
    foreground: '#ffffff',
    muted: '#8fa78133',
    hover: '#a7ad77', // Estragon - Hover state
  },

  // Accent colors
  accent: {
    DEFAULT: '#d6665d', // Happy Hearts - Accent color
    foreground: '#ffffff', 
    muted: '#d6665d33',
    hover: '#dd796b', // Bite My Tongue - Hover state
  },

  // Background colors
  background: {
    DEFAULT: '#ffffff',
    secondary: '#fef5ca', // Bullet Hell - Secondary background
    muted: '#e6e0a6', // Virgin Olive Oil - Muted background
  },

  // Text colors
  text: {
    DEFAULT: '#202124', // Noble Black - Primary text
    muted: '#626365', // Iron - Secondary text
    accent: '#dd845b', // Copper Coin - Accent text
  },

  // Border colors
  border: {
    DEFAULT: '#e3e3e4', // Jupiter - Default border
    muted: '#c8c8c9', // Silverback - Muted border
    hover: '#adaeaf', // Tangled Web - Hover border
  },

  // Status colors
  success: '#b3c784', // Fiddle-Leaf Fig
  warning: '#ecb138', // Cheesy Cheetah  
  error: '#ec6a43', // Opulent Orange
  info: '#a47d38', // Chai Tea
}

export const gradients = {
  primary: 'bg-gradient-to-r from-[#dd845b] to-[#db8b40]',
  secondary: 'bg-gradient-to-r from-[#8fa781] to-[#a7ad77]',
  accent: 'bg-gradient-to-r from-[#d6665d] to-[#dd796b]',
  background: 'bg-gradient-to-b from-background to-background/80',
  text: 'bg-gradient-to-r from-[#202124] to-[#626365]',
  muted: 'bg-gradient-to-r from-[#e6e0a6] to-[#fef5ca]'
}

export const patterns = {
  dots: `bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_1px,transparent_1px)] 
         bg-[length:24px_24px] 
         [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]`,
  grid: `bg-[linear-gradient(to_right,_var(--tw-gradient-from)_1px,transparent_1px),
         linear-gradient(to_bottom,_var(--tw-gradient-from)_1px,transparent_1px)] 
         bg-[length:24px_24px]
         [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]`,
  noise: `[mask-image:url('/noise.png')] 
          [mask-size:256px_256px]`,
}

export const transitions = {
  fast: 'transition-all duration-300',
  medium: 'transition-all duration-500',
  slow: 'transition-all duration-700',
  bounce: 'transition-all duration-500 hover:scale-105',
  slide: 'transition-all duration-500 hover:translate-x-2',
  fade: 'transition-opacity duration-500 hover:opacity-80',
}

export const glassEffect = {
  light: 'bg-white/30 backdrop-blur-md border border-white/20',
  dark: 'bg-black/30 backdrop-blur-md border border-white/10',
  subtle: 'bg-background/80 backdrop-blur-sm border border-border/50',
  strong: 'bg-background/90 backdrop-blur-lg border border-border'
}

export const textGradients = {
  primary: 'bg-clip-text text-transparent bg-gradient-to-r from-[#dd845b] to-[#db8b40]',
  secondary: 'bg-clip-text text-transparent bg-gradient-to-r from-[#8fa781] to-[#a7ad77]',
  accent: 'bg-clip-text text-transparent bg-gradient-to-r from-[#d6665d] to-[#dd796b]',
}

export const themeTransitions = {
  light: {
    background: 'bg-gradient-to-br from-white to-gray-50',
    text: 'text-gray-900',
    accent: 'from-primary/20 to-secondary/20',
    card: 'bg-white/80 backdrop-blur-md',
    border: 'border-gray-200'
  },
  dark: {
    background: 'bg-gradient-to-br from-gray-900 to-gray-950',
    text: 'text-gray-50',
    accent: 'from-primary/10 to-secondary/10',
    card: 'bg-gray-900/80 backdrop-blur-md',
    border: 'border-gray-800'
  }
}

export const animations = {
  card: {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.98
    }
  },
  button: {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95
    }
  }
} 