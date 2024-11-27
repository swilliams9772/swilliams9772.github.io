import { Icons } from '@/components/icons'
import { SkillCategory } from '@/types'
import { SKILL_METRICS } from '@/lib/constants/technology'

export const skillsData: SkillCategory[] = [
  {
    name: "Programming Languages & Tools",
    icon: Icons.Code,
    color: "from-blue-500/20 to-cyan-500/20",
    skills: [
      {
        name: "Python",
        level: 95,
        description: "AI/ML, data analysis, automation, web development",
        projects: 35,
        experience: "15+ years",
        endorsements: 25,
        tools: ["NumPy", "Pandas", "Flask", "FastAPI"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH",
        achievements: [
          "Led development of multiple large-scale ML projects",
          "Built and deployed production AI systems",
          "Created automated data processing pipelines"
        ]
      },
      {
        name: "JavaScript/TypeScript",
        level: 90,
        description: "Full-stack development, React, Node.js",
        projects: 20,
        experience: "10+ years",
        endorsements: 18,
        tools: ["React", "Next.js", "Node.js"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH"
      },
      {
        name: "C/C++",
        level: 85,
        description: "Systems programming, performance optimization",
        projects: 15,
        experience: "12+ years",
        endorsements: 15,
        tools: ["CMake", "CUDA", "OpenCV"],
        impact: "HIGH",
        growth: "STEADY",
        demand: "HIGH"
      }
    ]
  },
  {
    name: "Artificial Intelligence",
    icon: Icons.Brain,
    color: "from-purple-500/20 to-pink-500/20",
    skills: [
      {
        name: "Deep Learning",
        level: 92,
        description: "Neural networks, GANs, transformers",
        projects: 25,
        experience: "8+ years",
        endorsements: 20,
        tools: ["PyTorch", "TensorFlow", "Keras"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH",
        achievements: [
          "Implemented multiple state-of-the-art GAN architectures",
          "Developed Stable Diffusion projects",
          "Created deep learning solutions for genomics"
        ]
      },
      {
        name: "Computer Vision",
        level: 88,
        description: "Object detection, image segmentation",
        projects: 15,
        experience: "6+ years",
        endorsements: 16,
        tools: ["OpenCV", "YOLOv9", "Mask R-CNN"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH",
        achievements: [
          "Implemented YOLOv9 for real-time object detection",
          "Developed camera scanning systems",
          "Created face detection applications"
        ]
      },
      {
        name: "NLP",
        level: 90,
        description: "Text processing, language models, chatbots",
        projects: 20,
        experience: "5+ years",
        endorsements: 18,
        tools: ["BERT", "GPT", "Transformers"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH"
      }
    ]
  },
  {
    name: "Data Analysis & Processing",
    icon: Icons.BarChart,
    color: "from-green-500/20 to-emerald-500/20",
    skills: [
      {
        name: "Data Manipulation",
        level: 95,
        description: "Data cleaning, transformation, analysis",
        projects: 30,
        experience: "12+ years",
        endorsements: 24,
        tools: ["pandas", "NumPy", "SQL"],
        impact: "HIGH",
        growth: "STEADY",
        demand: "HIGH",
        achievements: [
          "Built data processing pipelines for terabyte-scale datasets",
          "Developed automated data cleaning and validation systems",
          "Created efficient data transformation workflows"
        ]
      },
      {
        name: "Data Visualization",
        level: 90,
        description: "Creating insightful visualizations",
        projects: 20,
        experience: "10+ years",
        endorsements: 19,
        tools: ["Matplotlib", "Seaborn", "Plotly"]
      }
    ]
  },
  {
    name: "Audio Processing",
    icon: Icons.Music,
    color: "from-yellow-500/20 to-orange-500/20",
    skills: [
      {
        name: "Speech Processing",
        level: 88,
        description: "Speaker diarization, voice analysis",
        projects: 12,
        experience: "4+ years",
        endorsements: 15,
        tools: ["Pyannote", "Whisper", "SoundFile"],
        impact: "HIGH",
        growth: "RAPID",
        demand: "HIGH",
        achievements: [
          "Developed speaker diarization system",
          "Created advanced audiobook generator",
          "Implemented seamless speech processing"
        ]
      }
    ]
  },
  {
    name: "Development & Infrastructure",
    icon: Icons.Server,
    color: "from-yellow-500/20 to-orange-500/20",
    skills: [
      {
        name: "Web Development",
        level: 88,
        description: "Full-stack web development",
        projects: 25,
        experience: "10+ years",
        endorsements: 17,
        tools: ["React", "Next.js", "Node.js"],
        impact: "HIGH",
        growth: "STEADY",
        demand: "HIGH"
      },
      {
        name: "DevOps",
        level: 85,
        description: "Container orchestration, CI/CD",
        projects: 12,
        experience: "6+ years",
        endorsements: 15,
        tools: ["Docker", "Kubernetes", "GitHub Actions"]
      }
    ]
  },
  {
    name: "Security",
    icon: Icons.Shield,
    color: "from-red-500/20 to-rose-500/20",
    skills: [
      {
        name: "Cybersecurity",
        level: 82,
        description: "Network security, ethical hacking",
        projects: 8,
        experience: "5+ years",
        endorsements: 14,
        tools: ["Shodan", "Wireshark", "Security APIs"],
        achievements: [
          "Developed machine learning for security applications",
          "Created security analysis tools",
          "Implemented hacking prevention systems"
        ]
      }
    ]
  }
] 