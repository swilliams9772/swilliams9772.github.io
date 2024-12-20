import {
  Network,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  Star,
  Brain,
  Code,
  Database,
  Cloud,
  Globe,
  Server,
  Shield,
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  MessageSquare,
  Bug,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  BarChart,
  LineChart,
  Book,
  Trophy,
  type LucideIcon
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  Network,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  Star,
  Brain,
  Code,
  Database,
  Cloud,
  Globe,
  Server,
  Shield,
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  MessageSquare,
  Bug,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  BarChart,
  LineChart,
  Book,
  Trophy
} as const

export type IconKey = keyof typeof Icons 