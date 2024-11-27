import { 
  Brain, 
  Database,
  Code,
  Cloud,
  Server,
  Globe,
  Cpu,
  Network,
  Shield,
  Blocks,
  Box,
  Boxes,
  Braces,
  CircuitBoard,
  Cog,
  Command,
  Container,
  FileCode,
  GitBranch,
  HardDrive,
  Laptop,
  LayoutGrid,
  Library,
  Microscope,
  Monitor,
  Puzzle,
  Radio,
  Rocket,
  Satellite,
  Search,
  Settings,
  Share2,
  Sigma,
  Terminal,
  TestTube,
  Webhook,
  Wifi,
  Activity,
  Bot,
  Chip,
  Codesandbox,
  Fingerprint,
  Flask,
  Gauge,
  GitFork,
  GitMerge,
  GitPullRequest,
  Infinity,
  LineChart,
  Lock,
  MessageSquare,
  Microchip,
  Microscope2,
  Plug,
  Power,
  QrCode,
  Router,
  Scan,
  Sparkles,
  Syringe,
  Table,
  Tablet,
  Thermometer,
  Timer,
  Variable,
  Wand2,
  Waves,
  Zap,
  AlertTriangle,
  Aperture,
  Archive,
  Atom,
  Beaker,
  Binary,
  BookOpen,
  BrainCircuit,
  ChartBar,
  ChipSet,
  CloudCog,
  CloudRain,
  Compass,
  Construction,
  Cpu2,
  CpuIcon,
  Crosshair,
  DnaOff,
  Factory,
  FileJson,
  FileSearch,
  Filter,
  FlaskConical,
  FolderGit,
  FolderKanban,
  FolderSearch,
  Function,
  GitCompare,
  GitGraph,
  Glasses,
  GraduationCap,
  HardDriveDownload,
  HardDriveUpload,
  Heading1,
  HeartPulse,
  History,
  Hourglass,
  ImagePlus,
  KeyRound,
  LayoutDashboard,
  Lightbulb,
  Link2,
  ListChecks,
  Loader2,
  LogIn,
  Mail,
  Map,
  MessageCircle,
  Microscope,
  MonitorDot,
  Moon,
  Mountain,
  MousePointer2,
  Network,
  Newspaper,
  NotebookPen,
  PackageOpen,
  PanelLeftClose,
  PanelRightClose,
  Pencil,
  PenTool,
  PersonStanding,
  PieChart,
  Pipette,
  Plane,
  Play,
  Pointer,
  Power,
  Printer,
  QrCode,
  Radio,
  RadioTower,
  Repeat,
  Replace,
  Robot,
  Rocket,
  RocketIcon,
  Ruler,
  Scan,
  School2,
  ScrollText,
  Search,
  SearchCode,
  Send,
  Server,
  Settings2,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Signal,
  Sigma,
  Sliders,
  Smartphone,
  Sparkles,
  Speaker,
  SpellCheck,
  Split,
  Sprout,
  Square,
  Star,
  Stethoscope,
  Sun,
  Syringe,
  Table,
  Table2,
  Tablet,
  Tags,
  Target,
  Terminal,
  TestTube2,
  TestTubes,
  ThermometerSun,
  Timer,
  ToggleLeft,
  Tool,
  Trash2,
  TreeDeciduous,
  Trophy,
  Undo2,
  Upload,
  UserCog,
  Users,
  Variable,
  Video,
  Wallet,
  Wand2,
  Waves,
  Webhook,
  Wind,
  Workflow,
  Wrench,
  X,
  XCircle,
  ZoomIn,
  type LucideIcon
} from 'lucide-react'

// Technology domain icons
export const domainIcons: Record<string, LucideIcon> = {
  // AI & ML
  Brain,
  Bot,
  Sparkles,
  Microscope,
  Microscope2,
  
  // Data & Analytics
  Database,
  Table,
  LineChart,
  Activity,
  
  // Development
  Code,
  FileCode,
  Terminal,
  Braces,
  Variable,
  
  // Infrastructure
  Cloud,
  Server,
  Container,
  Router,
  
  // Hardware
  Cpu,
  Chip,
  Microchip,
  CircuitBoard,
  
  // Networking
  Network,
  Globe,
  Wifi,
  Plug,
  
  // Security
  Shield,
  Lock,
  Fingerprint,
  Scan,
  
  // Version Control
  GitBranch,
  GitFork,
  GitMerge,
  GitPullRequest,
  
  // Tools & Utilities
  Cog,
  Settings,
  Wand2,
  Command,
  
  // Testing & Monitoring
  TestTube,
  Flask,
  Syringe,
  Gauge,
  
  // Mobile & Devices
  Laptop,
  Tablet,
  Monitor,
  HardDrive,
  
  // Integration & APIs
  Webhook,
  Puzzle,
  Share2,
  Blocks,
  
  // IoT & Embedded
  Radio,
  Thermometer,
  Timer,
  Power,
  
  // Math & Science
  Sigma,
  Infinity,
  Waves,
  Zap,
  
  // Storage & Containers
  Box,
  Boxes,
  Codesandbox,
  LayoutGrid,
  
  // Misc
  Library,
  Rocket,
  Satellite,
  Search,
  QrCode,
  
  // AI & Machine Learning
  ai: {
    Brain,
    BrainCircuit,
    Robot,
    Sparkles,
    Function,
    Network,
    ChartBar,
    Target
  },

  // Data Science & Analytics
  data: {
    Database,
    Table,
    Table2,
    PieChart,
    ChartBar,
    FileSearch,
    Filter,
    Search
  },

  // Development & Programming
  development: {
    Code,
    Terminal,
    Git: FolderGit,
    Github: FolderGit,
    Variable,
    Function,
    SearchCode,
    Binary
  },

  // Infrastructure & Cloud
  infrastructure: {
    Server,
    Cloud,
    CloudCog,
    Database,
    Network,
    Settings2,
    Shield,
    Lock
  },

  // Hardware & IoT
  hardware: {
    Cpu,
    Cpu2,
    ChipSet,
    Circuit: BrainCircuit,
    Radio,
    RadioTower,
    Bluetooth: Signal,
    Wifi
  },

  // Security & Privacy
  security: {
    Shield,
    ShieldAlert,
    ShieldCheck,
    Lock,
    KeyRound,
    Scan,
    AlertTriangle,
    UserCog
  },

  // Testing & Quality
  testing: {
    TestTube2,
    TestTubes,
    Beaker,
    FlaskConical,
    Bug: AlertTriangle,
    SpellCheck,
    ListChecks,
    CheckCircle: ShieldCheck
  },

  // Documentation & Learning
  documentation: {
    BookOpen,
    ScrollText,
    GraduationCap,
    School2,
    NotebookPen,
    Heading1,
    FileJson,
    Newspaper
  },

  // Visualization & Design
  visualization: {
    PenTool,
    ImagePlus,
    Aperture,
    Eye: Glasses,
    Ruler,
    Layout: LayoutDashboard,
    Palette: PenTool,
    Compass
  },

  // Monitoring & Performance
  monitoring: {
    Activity,
    HeartPulse,
    Gauge: Timer,
    Chart: ChartBar,
    Monitor: MonitorDot,
    History,
    Hourglass,
    Timer
  },

  // Scientific & Research
  scientific: {
    Microscope,
    Atom,
    Dna: DnaOff,
    Lab: FlaskConical,
    Research: Search,
    Experiment: TestTubes,
    Pipette,
    Infinity
  },

  // Tools & Utilities
  tools: {
    Tool,
    Wrench,
    Settings: Settings2,
    Sliders,
    Construction,
    Wand2,
    Magic: Sparkles,
    Factory
  }
}

// Technology level indicators
export const levelIndicators = {
  core: {
    icon: Zap,
    color: '#22c55e',
    size: 40
  },
  primary: {
    icon: Star,
    color: '#3b82f6',
    size: 32
  },
  secondary: {
    icon: Plus,
    color: '#f59e0b',
    size: 28
  },
  auxiliary: {
    icon: Dot,
    color: '#ef4444',
    size: 24
  }
}

// Relationship type indicators
export const relationshipTypes = {
  dependency: {
    icon: ArrowRight,
    color: '#94a3b8',
    strokeWidth: 2,
    dashArray: '0'
  },
  integration: {
    icon: Plug,
    color: '#64748b',
    strokeWidth: 1.5,
    dashArray: '5,5'
  },
  alternative: {
    icon: GitFork,
    color: '#475569',
    strokeWidth: 1,
    dashArray: '2,2'
  }
}

// Category colors
export const categoryColors = {
  language: 'from-blue-500/20 to-indigo-500/20',
  framework: 'from-green-500/20 to-emerald-500/20',
  infrastructure: 'from-orange-500/20 to-amber-500/20',
  cloud: 'from-cyan-500/20 to-sky-500/20',
  data: 'from-violet-500/20 to-purple-500/20',
  security: 'from-red-500/20 to-rose-500/20',
  tool: 'from-teal-500/20 to-green-500/20',
  platform: 'from-pink-500/20 to-fuchsia-500/20'
}

// Animation presets
export const animationPresets = {
  nodeEnter: {
    duration: 750,
    ease: d3.easeCubicOut,
    delay: (d: any, i: number) => i * 50
  },
  nodeExit: {
    duration: 500,
    ease: d3.easeCubicIn
  },
  linkEnter: {
    duration: 1000,
    ease: d3.easeCubicInOut,
    delay: (d: any, i: number) => i * 30
  },
  linkExit: {
    duration: 500,
    ease: d3.easeLinear
  },
  entry: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    scaleIn: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5, ease: 'backOut' }
    },
    slideIn: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  hover: {
    pulse: {
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    glow: {
      filter: 'brightness(1.2)',
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    bounce: {
      y: -5,
      transition: { duration: 0.2, type: 'spring', stiffness: 300 }
    }
  },
  exit: {
    fadeOut: {
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    },
    scaleOut: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    },
    slideOut: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  },
  interaction: {
    click: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    focus: {
      scale: 1.05,
      boxShadow: '0 0 0 2px var(--primary)',
      transition: { duration: 0.2 }
    },
    active: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  loading: {
    spin: {
      rotate: 360,
      transition: { duration: 1, ease: 'linear', repeat: Infinity }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity }
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 1, ease: 'easeInOut', repeat: Infinity }
    }
  }
} 