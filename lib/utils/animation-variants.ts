import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3
    }
  }
}

export const fadeInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -50,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100
    }
  }
}

export const fadeInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 50,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100
    }
  }
}

export const containerVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      type: 'spring',
      stiffness: 100
    }
  }
}

export const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  }
}

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})

export const staggerItem = (index: number): Variants => ({
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}) 