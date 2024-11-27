import { Icons } from '@/components/icons'
import { Project } from '@/types'

export const projectCategories = {
  AI_ML: "Artificial Intelligence & Machine Learning",
  AUDIO: "Audio & Speech Processing",
  CV: "Computer Vision",
  DATA: "Data & Analytics",
  AUTO: "Automation & Tools",
  DEV: "Development & Infrastructure",
  NLP: "Natural Language Processing",
  SEC: "Security",
  DOC: "Documentation & Learning",
  MSG: "Messaging & Communication",
  SPEC: "Specialized Projects",
  VIZ: "Visualization"
} as const

export const projectsData: Project[] = [
  // AI & ML Projects
  {
    id: "generative-ai",
    title: "Generative AI Suite",
    description: "Collection of state-of-the-art GAN implementations including AttnGAN, AnimeGANv3, SinGAN, and Stable Diffusion",
    category: projectCategories.AI_ML,
    timeline: "2023-2024",
    tags: ["Deep Learning", "GANs", "Image Generation"],
    technologies: ["PyTorch", "TensorFlow", "CUDA"],
    outcomes: [
      "Implemented multiple state-of-the-art GAN architectures",
      "Created realistic image generation pipelines",
      "Advanced understanding of generative modeling"
    ],
    metrics: [
      {
        name: "FID Score",
        value: "18.3",
        improvement: "25% better than baseline"
      }
    ],
    featured: true,
    github: "https://github.com/username/generative-ai"
  },
  {
    id: "tech-innovation-ai-agents",
    title: "AI Agents Platform",
    description: "Advanced AI agents using reinforcement learning and LLMs for autonomous decision-making",
    category: projectCategories.AI_ML,
    timeline: "2023-2024",
    tags: ["Reinforcement Learning", "LLMs", "Autonomous Agents"],
    technologies: ["Python", "PyTorch", "OpenAI API"],
    outcomes: [
      "Developed autonomous agents for complex tasks",
      "Integrated multiple LLMs for enhanced decision-making",
      "Created scalable agent architecture"
    ],
    metrics: [
      {
        name: "Task Success Rate",
        value: "92%",
        improvement: "+35%"
      }
    ],
    featured: true
  },
  // Audio Projects
  {
    id: "speaker-diarization",
    title: "Speaker Diarization System",
    description: "Advanced speaker identification and separation system for multi-speaker environments",
    category: projectCategories.AUDIO,
    timeline: "2023-2024",
    tags: ["Speech Processing", "Machine Learning", "Audio Analysis"],
    technologies: ["PyTorch", "SpeechBrain", "Clustering"],
    outcomes: [
      "95% speaker identification accuracy",
      "Real-time processing capability",
      "Support for multiple speakers"
    ],
    metrics: [
      {
        name: "DER",
        value: "5.2%",
        improvement: "40% reduction"
      }
    ],
    featured: true
  },
  // Computer Vision Projects
  {
    id: "yolov9-impl",
    title: "YOLOv9 Implementation",
    description: "State-of-the-art object detection system with real-time processing capabilities",
    category: projectCategories.CV,
    timeline: "Early 2024",
    tags: ["Object Detection", "Deep Learning", "Real-time Processing"],
    technologies: ["PyTorch", "CUDA", "OpenCV"],
    outcomes: [
      "99% detection accuracy",
      "30 FPS processing speed",
      "Optimized for edge devices"
    ],
    metrics: [
      {
        name: "mAP",
        value: "63.7%",
        improvement: "+5.2%"
      }
    ],
    featured: true
  },
  // NLP Projects
  {
    id: "chatgpt-archive-parser",
    title: "ChatGPT Archive Parser",
    description: "Advanced tool for analyzing and extracting insights from AI-generated conversations",
    category: projectCategories.NLP,
    timeline: "2023-2024",
    tags: ["NLP", "Data Analysis", "Machine Learning"],
    technologies: ["Python", "Transformers", "spaCy", "FastAPI"],
    outcomes: [
      "Processed 1M+ chat messages",
      "Created semantic search capabilities",
      "Generated conversation insights"
    ],
    metrics: [
      {
        name: "Processing Speed",
        value: "10K msgs/s",
        improvement: "+200%"
      }
    ],
    featured: true
  },
  {
    id: "bolt-llm",
    title: "Bolt.new-any-LLM",
    description: "Unified interface for interacting with various language models",
    category: projectCategories.NLP,
    timeline: "2023-2024",
    tags: ["LLM", "API", "Integration"],
    technologies: ["Python", "FastAPI", "Transformers", "Redis"],
    outcomes: [
      "60% reduction in integration time",
      "Support for 10+ LLM providers",
      "99.9% uptime"
    ],
    metrics: [
      {
        name: "Response Time",
        value: "150ms",
        improvement: "-40%"
      }
    ],
    featured: true
  },
  // Audio Projects
  {
    id: "advanced-audiobook",
    title: "Advanced Audiobook Generator",
    description: "Text-to-speech system with natural voice synthesis capabilities",
    category: projectCategories.AUDIO,
    timeline: "2023-2024",
    tags: ["TTS", "Deep Learning", "Audio Processing"],
    technologies: ["PyTorch", "Tacotron", "WaveNet", "FastAPI"],
    outcomes: [
      "Natural-sounding voice synthesis",
      "Multi-language support",
      "Emotion control in speech"
    ],
    metrics: [
      {
        name: "MOS Score",
        value: "4.5/5",
        improvement: "+0.8"
      }
    ],
    featured: true
  },
  // Development Projects
  {
    id: "docker-k8s-platform",
    title: "Container Orchestration Platform",
    description: "Comprehensive solution for managing containerized applications",
    category: projectCategories.DEV,
    timeline: "2023-2024",
    tags: ["DevOps", "Containerization", "Cloud"],
    technologies: ["Docker", "Kubernetes", "Terraform", "AWS"],
    outcomes: [
      "99.99% system uptime",
      "50% reduction in deployment time",
      "Automated scaling capabilities"
    ],
    metrics: [
      {
        name: "Cost Savings",
        value: "45%",
        improvement: "+45%"
      }
    ],
    featured: true
  },
  // Security Projects
  {
    id: "cybersecurity-suite",
    title: "Cybersecurity Analysis Tools",
    description: "Suite of security tools for vulnerability scanning and threat detection",
    category: projectCategories.SEC,
    timeline: "2023-2024",
    tags: ["Security", "Network Analysis", "Threat Detection"],
    technologies: ["Python", "Shodan", "Wireshark", "TensorFlow"],
    outcomes: [
      "24/7 automated monitoring",
      "85% faster threat detection",
      "Comprehensive security reports"
    ],
    metrics: [
      {
        name: "Detection Rate",
        value: "99.9%",
        improvement: "+15%"
      }
    ],
    featured: true
  },
  // Additional ML/AI Projects
  {
    id: "recommender-system",
    title: "Advanced Recommendation Engine",
    description: "Built a sophisticated recommendation system using collaborative and content-based filtering",
    category: projectCategories.AI_ML,
    timeline: "2023-2024",
    tags: ["Machine Learning", "Recommendation Systems", "Data Analysis"],
    technologies: ["Python", "TensorFlow", "Redis", "PostgreSQL"],
    outcomes: [
      "15% increase in user engagement",
      "Real-time recommendation capabilities",
      "Scalable to millions of users"
    ],
    metrics: [
      {
        name: "Accuracy",
        value: "92%",
        improvement: "+25%"
      }
    ],
    featured: true
  },
  {
    id: "secret-agent",
    title: "Secret Agent - Autonomous AI",
    description: "Created autonomous agents incorporating ML, NLP, and computer vision for task automation",
    category: projectCategories.AI_ML,
    timeline: "2023-2024",
    tags: ["AI Agents", "Automation", "Multi-modal"],
    technologies: ["Python", "PyTorch", "OpenAI API", "LangChain"],
    outcomes: [
      "Automated complex workflows",
      "Multi-modal task handling",
      "Self-improving capabilities"
    ],
    metrics: [
      {
        name: "Task Success",
        value: "95%",
        improvement: "+40%"
      }
    ],
    featured: true
  },
  // Additional Computer Vision Projects
  {
    id: "action-detection-sign-language",
    title: "Sign Language Detection System",
    description: "Created a real-time sign language detection and translation system",
    category: projectCategories.CV,
    timeline: "2023-2024",
    tags: ["Sign Language", "Action Recognition", "Accessibility"],
    technologies: ["MediaPipe", "TensorFlow", "LSTM Networks"],
    outcomes: [
      "90% accuracy in gesture recognition",
      "Real-time translation capabilities",
      "Support for multiple sign languages"
    ],
    metrics: [
      {
        name: "Recognition Rate",
        value: "90%",
        improvement: "+30%"
      }
    ],
    featured: true
  },
  // Additional Data Projects
  {
    id: "c1-transaction-analysis",
    title: "Financial Transaction Analysis",
    description: "Analyzed financial transaction data to build predictive models for customer behavior",
    category: projectCategories.DATA,
    timeline: "2023-2024",
    tags: ["Financial Analysis", "Predictive Modeling", "Big Data"],
    technologies: ["Python", "PySpark", "SQL", "Tableau"],
    outcomes: [
      "Identified key spending patterns",
      "Developed fraud detection models",
      "Created interactive dashboards"
    ],
    metrics: [
      {
        name: "Fraud Detection",
        value: "99.9%",
        improvement: "+15%"
      }
    ],
    featured: true
  },
  // Additional Security Projects
  {
    id: "ghost-track",
    title: "GhostTrack Security Suite",
    description: "Developed a comprehensive security monitoring and analysis system",
    category: projectCategories.SEC,
    timeline: "2023",
    tags: ["Security", "Monitoring", "Analytics"],
    technologies: ["Python", "Elasticsearch", "Kibana", "Docker"],
    outcomes: [
      "Real-time threat detection",
      "Automated incident response",
      "Comprehensive security reporting"
    ],
    metrics: [
      {
        name: "Detection Rate",
        value: "99.9%",
        improvement: "+25%"
      }
    ],
    featured: true
  },
  // Additional Documentation Projects
  {
    id: "desktop-tutorial",
    title: "GitHub Desktop Guide",
    description: "Created comprehensive documentation and tutorials for GitHub Desktop",
    category: projectCategories.DOC,
    timeline: "2023",
    tags: ["Documentation", "Git", "Education"],
    technologies: ["Markdown", "Git", "GitHub Desktop"],
    outcomes: [
      "Improved user onboarding",
      "Reduced support tickets",
      "Community contributions"
    ],
    metrics: [
      {
        name: "User Adoption",
        value: "+200%",
        improvement: "3 months"
      }
    ],
    featured: false
  },
  // Advanced ML Projects
  {
    id: "llm-fine-tuning",
    title: "LLM Fine-Tuning Platform",
    description: "Platform for efficient fine-tuning of large language models on domain-specific tasks",
    category: projectCategories.AI_ML,
    timeline: "2024",
    tags: ["LLM", "Transfer Learning", "MLOps"],
    technologies: ["PyTorch", "Transformers", "PEFT", "Ray"],
    outcomes: [
      "90% reduction in training time",
      "Efficient parameter-efficient fine-tuning",
      "Support for multiple model architectures"
    ],
    metrics: [
      {
        name: "Performance",
        value: "95%",
        improvement: "+25%"
      },
      {
        name: "Resource Usage",
        value: "-80%",
        improvement: "Memory efficient"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    teamSize: 3
  },
  // Audio Processing Projects
  {
    id: "multilingual-tts",
    title: "Multilingual Text-to-Speech",
    description: "Advanced TTS system supporting multiple languages with natural prosody",
    category: projectCategories.AUDIO,
    timeline: "2024",
    tags: ["Speech Synthesis", "Deep Learning", "NLP"],
    technologies: ["Coqui TTS", "PyTorch", "Transformers"],
    outcomes: [
      "Support for 25+ languages",
      "Natural prosody and emotion",
      "Real-time synthesis"
    ],
    metrics: [
      {
        name: "MOS Score",
        value: "4.2/5",
        improvement: "+0.8"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Data Engineering Projects
  {
    id: "data-pipeline-platform",
    title: "Scalable Data Pipeline Platform",
    description: "Enterprise-grade data processing pipeline with real-time monitoring",
    category: projectCategories.DATA,
    timeline: "2024",
    tags: ["Data Engineering", "ETL", "Stream Processing"],
    technologies: ["Apache Kafka", "Spark", "Airflow", "dbt"],
    outcomes: [
      "Processing 1TB+ daily data",
      "99.9% pipeline reliability",
      "Real-time data validation"
    ],
    metrics: [
      {
        name: "Throughput",
        value: "1TB/day",
        improvement: "+300%"
      },
      {
        name: "Latency",
        value: "< 5s",
        improvement: "-80%"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 5,
    teamSize: 4
  },
  // DevOps Projects
  {
    id: "mlops-platform",
    title: "MLOps Automation Platform",
    description: "End-to-end MLOps platform for model deployment and monitoring",
    category: projectCategories.DEV,
    timeline: "2024",
    tags: ["MLOps", "DevOps", "Automation"],
    technologies: ["Kubernetes", "Kubeflow", "Prometheus", "ArgoCD"],
    outcomes: [
      "Automated ML pipeline deployment",
      "Real-time model monitoring",
      "A/B testing infrastructure"
    ],
    metrics: [
      {
        name: "Deployment Time",
        value: "15min",
        improvement: "-85%"
      },
      {
        name: "Model Versions",
        value: "100+",
        improvement: "Managed"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 5
  },
  // Quantum Computing Projects
  {
    id: "quantum-basics",
    title: "Elementary Quantum Computations",
    description: "Implementation of basic quantum algorithms and exploration of quantum computing principles",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Quantum Computing", "Algorithms", "Research"],
    technologies: ["Qiskit", "Python", "IBM Quantum", "Cirq"],
    outcomes: [
      "Implemented basic quantum algorithms",
      "Explored quantum entanglement",
      "Created educational materials"
    ],
    metrics: [
      {
        name: "Quantum Bits",
        value: "5-qubit",
        improvement: "Stable"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5
  },
  // Language Processing Projects
  {
    id: "language-ar",
    title: "Arabic Language Processing Suite",
    description: "Comprehensive NLP toolkit for Arabic language processing and analysis",
    category: projectCategories.NLP,
    timeline: "2024",
    tags: ["NLP", "Arabic", "Language Processing"],
    technologies: ["PyTorch", "CAMeL Tools", "FastAPI", "React"],
    outcomes: [
      "95% accuracy in Arabic text analysis",
      "Support for multiple Arabic dialects",
      "Real-time processing capabilities"
    ],
    metrics: [
      {
        name: "Accuracy",
        value: "95%",
        improvement: "+25%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Media Literacy Projects
  {
    id: "media-literacy",
    title: "Media Literacy Interactive Platform",
    description: "Educational platform for promoting critical media consumption and analysis",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Media Literacy", "Education", "Interactive"],
    technologies: ["Next.js", "D3.js", "TailwindCSS", "Firebase"],
    outcomes: [
      "10,000+ active users",
      "Interactive learning modules",
      "Real-time fact-checking tools"
    ],
    metrics: [
      {
        name: "User Engagement",
        value: "85%",
        improvement: "+40%"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 3
  },
  // Network Analysis Projects
  {
    id: "social-network-analysis",
    title: "Advanced Network Analysis Platform",
    description: "Platform for analyzing and visualizing complex social and information networks",
    category: projectCategories.DATA,
    timeline: "2024",
    tags: ["Network Analysis", "Graph Theory", "Visualization"],
    technologies: ["NetworkX", "Neo4j", "D3.js", "Python"],
    outcomes: [
      "Analyzed networks with 1M+ nodes",
      "Community detection algorithms",
      "Interactive visualizations"
    ],
    metrics: [
      {
        name: "Scale",
        value: "1M+ nodes",
        improvement: "+200%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Open Source Projects
  {
    id: "annas-archive",
    title: "Anna's Archive Enhancement",
    description: "Contributions to open-access knowledge platform with enhanced search and accessibility",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Open Access", "Search", "Accessibility"],
    technologies: ["Python", "Elasticsearch", "React", "TypeScript"],
    outcomes: [
      "Improved search accuracy",
      "Enhanced accessibility features",
      "Mobile-responsive interface"
    ],
    metrics: [
      {
        name: "Search Speed",
        value: "200ms",
        improvement: "-60%"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 4
  },
  // Specialized NLP Projects
  {
    id: "rfc-aid",
    title: "RFC Document Parser & Analyzer",
    description: "Advanced tool for parsing and simplifying technical RFC documents",
    category: projectCategories.NLP,
    timeline: "2024",
    tags: ["NLP", "Technical Documentation", "Accessibility"],
    technologies: ["Python", "spaCy", "FastAPI", "ElasticSearch"],
    outcomes: [
      "Simplified 1000+ RFC documents",
      "Created searchable knowledge base",
      "Automated document summarization"
    ],
    metrics: [
      {
        name: "Accuracy",
        value: "95%",
        improvement: "+30%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Advanced Data Analysis Projects
  {
    id: "geospatial-analysis",
    title: "Urban Development Analysis Platform",
    description: "Comprehensive geospatial analysis platform for urban planning",
    category: projectCategories.DATA,
    timeline: "2024",
    tags: ["GIS", "Urban Planning", "Data Analysis"],
    technologies: ["GeoPandas", "PostGIS", "Folium", "Dash"],
    outcomes: [
      "Analyzed 50+ urban development metrics",
      "Created interactive map visualizations",
      "Optimized resource allocation"
    ],
    metrics: [
      {
        name: "Coverage",
        value: "500km²",
        improvement: "+200%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Automation Projects
  {
    id: "facebook-crawler",
    title: "Social Media Data Crawler",
    description: "Automated system for ethical social media data collection and analysis",
    category: projectCategories.AUTO,
    timeline: "2024",
    tags: ["Web Scraping", "Data Collection", "Analytics"],
    technologies: ["Selenium", "BeautifulSoup", "MongoDB", "NLP"],
    outcomes: [
      "Collected data from 100K+ posts",
      "Automated sentiment analysis",
      "Real-time trend detection"
    ],
    metrics: [
      {
        name: "Processing",
        value: "10K/hour",
        improvement: "+150%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 3
  },
  // Educational Projects
  {
    id: "interactive-ml",
    title: "Interactive ML Learning Platform",
    description: "Educational platform for hands-on machine learning experimentation",
    category: projectCategories.DOC,
    timeline: "2024",
    tags: ["Education", "ML", "Interactive"],
    technologies: ["Python", "Streamlit", "Scikit-learn", "Plotly"],
    outcomes: [
      "Created 20+ interactive tutorials",
      "Supported 1000+ learners",
      "Real-time model experimentation"
    ],
    metrics: [
      {
        name: "User Rating",
        value: "4.8/5",
        improvement: "+0.8"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 3
  },
  // Research Projects
  {
    id: "quantum-ml",
    title: "Quantum-Classical ML Hybrid",
    description: "Research project exploring quantum computing for ML acceleration",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Quantum Computing", "ML", "Research"],
    technologies: ["Qiskit", "PyTorch", "IBM Quantum", "Python"],
    outcomes: [
      "Implemented quantum ML algorithms",
      "Achieved quantum advantage demos",
      "Published research findings"
    ],
    metrics: [
      {
        name: "Speed-up",
        value: "10x",
        improvement: "Classical ML"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 5
  },
  // Infrastructure Projects
  {
    id: "ml-monitoring",
    title: "ML Model Monitoring System",
    description: "Comprehensive monitoring and alerting system for ML models in production",
    category: projectCategories.DEV,
    timeline: "2024",
    tags: ["MLOps", "Monitoring", "DevOps"],
    technologies: ["Prometheus", "Grafana", "Python", "FastAPI"],
    outcomes: [
      "99.9% model availability",
      "Real-time performance tracking",
      "Automated incident response"
    ],
    metrics: [
      {
        name: "MTTR",
        value: "5min",
        improvement: "-75%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 4
  },
  // Blockchain Projects
  {
    id: "defi-analytics",
    title: "DeFi Analytics Platform",
    description: "Advanced analytics platform for DeFi protocols and transactions",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Blockchain", "DeFi", "Analytics"],
    technologies: ["Web3.js", "Python", "PostgreSQL", "React"],
    outcomes: [
      "Tracked $500M+ in transactions",
      "Real-time protocol analytics",
      "Risk assessment models"
    ],
    metrics: [
      {
        name: "Data Coverage",
        value: "$500M+",
        improvement: "+300%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Microservices",
      pipeline: [
        {
          name: "Data Collection",
          performance: { value: "100k tx/hour", percentage: 95 }
        },
        {
          name: "Analysis",
          performance: { value: "Real-time", percentage: 90 }
        }
      ]
    }
  },
  // Privacy & Security Projects
  {
    id: "privacy-preserving-ml",
    title: "Privacy-Preserving ML Framework",
    description: "Framework for training ML models while preserving data privacy",
    category: projectCategories.SEC,
    timeline: "2024",
    tags: ["Privacy", "Machine Learning", "Security"],
    technologies: ["PyTorch", "Crypten", "Differential Privacy"],
    outcomes: [
      "Zero data leakage",
      "Maintained model accuracy",
      "Compliance with regulations"
    ],
    metrics: [
      {
        name: "Privacy Score",
        value: "99.9%",
        improvement: "+40%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Federated Learning",
      pipeline: [
        {
          name: "Privacy Guarantee",
          performance: { value: "ε=0.1", percentage: 99 }
        }
      ]
    }
  },
  // Robotics & Control Systems
  {
    id: "autonomous-drone",
    title: "Autonomous Drone Control System",
    description: "Advanced control system for autonomous drone navigation and obstacle avoidance",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Robotics", "Control Systems", "Computer Vision"],
    technologies: ["ROS", "Python", "OpenCV", "PX4"],
    outcomes: [
      "Achieved 99.9% navigation accuracy",
      "Real-time obstacle avoidance",
      "Energy-efficient path planning"
    ],
    metrics: [
      {
        name: "Accuracy",
        value: "99.9%",
        improvement: "+15%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Distributed Control",
      pipeline: [
        {
          name: "Perception",
          performance: { value: "30fps", percentage: 95 }
        },
        {
          name: "Planning",
          performance: { value: "10ms", percentage: 98 }
        }
      ]
    }
  },
  // Edge Computing Projects
  {
    id: "edge-ml",
    title: "Edge ML Optimization Framework",
    description: "Framework for deploying and optimizing ML models on edge devices",
    category: projectCategories.SPEC,
    timeline: "2024",
    tags: ["Edge Computing", "ML Optimization", "IoT"],
    technologies: ["TensorFlow Lite", "ONNX", "C++", "ARM NEON"],
    outcomes: [
      "90% reduction in model size",
      "5x inference speed improvement",
      "Cross-platform deployment"
    ],
    metrics: [
      {
        name: "Latency",
        value: "<10ms",
        improvement: "-80%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Edge-First",
      pipeline: [
        {
          name: "Quantization",
          performance: { value: "8-bit", percentage: 92 }
        },
        {
          name: "Optimization",
          performance: { value: "5x", percentage: 95 }
        }
      ]
    }
  },
  // Advanced Visualization Projects
  {
    id: "3d-med-viz",
    title: "3D Medical Visualization Platform",
    description: "Advanced platform for 3D visualization of medical imaging data",
    category: projectCategories.VIZ,
    timeline: "2024",
    tags: ["Medical Imaging", "3D Visualization", "WebGL"],
    technologies: ["Three.js", "WebGL", "DICOM", "React"],
    outcomes: [
      "Real-time 3D rendering",
      "Multi-modality support",
      "Collaborative annotation"
    ],
    metrics: [
      {
        name: "Performance",
        value: "60fps",
        improvement: "+100%"
      }
    ],
    featured: true,
    status: 'in-progress',
    difficulty: 4,
    technical: {
      architecture: "WebGL Pipeline",
      pipeline: [
        {
          name: "Volume Rendering",
          performance: { value: "60fps", percentage: 90 }
        },
        {
          name: "Data Processing",
          performance: { value: "Real-time", percentage: 85 }
        }
      ]
    }
  },
  // Computer Vision & AR Projects
  {
    id: "ar-medical-training",
    title: "AR Medical Training Platform",
    description: "Advanced AR platform for medical procedure training and visualization",
    category: projectCategories.CV,
    timeline: "2024",
    tags: ["AR", "Medical", "Computer Vision"],
    technologies: ["Unity", "ARCore", "TensorFlow", "C#"],
    outcomes: [
      "50% reduction in training time",
      "98% accuracy in procedure tracking",
      "Multi-user collaboration support"
    ],
    metrics: [
      {
        name: "Training Efficiency",
        value: "2x",
        improvement: "+100%"
      },
      {
        name: "Tracking Accuracy",
        value: "98%",
        improvement: "+23%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Distributed AR",
      pipeline: [
        {
          name: "Object Tracking",
          performance: { value: "60fps", percentage: 98 }
        },
        {
          name: "Gesture Recognition",
          performance: { value: "30ms", percentage: 95 }
        }
      ]
    }
  },
  // NLP & Language Models
  {
    id: "multilingual-nlp",
    title: "Multilingual NLP Framework",
    description: "Advanced NLP framework for cross-lingual understanding and generation",
    category: projectCategories.NLP,
    timeline: "2024",
    tags: ["NLP", "Transformers", "Multilingual"],
    technologies: ["PyTorch", "Transformers", "ONNX", "FastAPI"],
    outcomes: [
      "Support for 100+ languages",
      "Zero-shot cross-lingual transfer",
      "Efficient model deployment"
    ],
    metrics: [
      {
        name: "Language Coverage",
        value: "100+",
        improvement: "+150%"
      },
      {
        name: "Inference Speed",
        value: "15ms",
        improvement: "-70%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Transformer-based",
      pipeline: [
        {
          name: "Tokenization",
          performance: { value: "1M tokens/s", percentage: 96 }
        },
        {
          name: "Model Inference",
          performance: { value: "15ms", percentage: 94 }
        }
      ]
    }
  },
  // MLOps & Infrastructure
  {
    id: "mlops-platform",
    title: "Enterprise MLOps Platform",
    description: "Comprehensive MLOps platform for model lifecycle management",
    category: projectCategories.DEV,
    timeline: "2024",
    tags: ["MLOps", "DevOps", "Infrastructure"],
    technologies: ["Kubernetes", "TensorFlow", "MLflow", "Argo"],
    outcomes: [
      "90% reduction in deployment time",
      "Automated model monitoring",
      "Scalable training pipelines"
    ],
    metrics: [
      {
        name: "Deployment Time",
        value: "5min",
        improvement: "-90%"
      },
      {
        name: "Resource Utilization",
        value: "85%",
        improvement: "+40%"
      }
    ],
    featured: true,
    status: 'completed',
    difficulty: 5,
    technical: {
      architecture: "Microservices",
      pipeline: [
        {
          name: "CI/CD",
          performance: { value: "5min", percentage: 95 }
        },
        {
          name: "Monitoring",
          performance: { value: "Real-time", percentage: 98 }
        }
      ]
    }
  }
]

// Helper functions
export const getProjectsByCategory = (category: typeof projectCategories[keyof typeof projectCategories]) => {
  return projectsData.filter(project => project.category === category)
}

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

export const getProjectsByTechnology = (technology: string) => {
  return projectsData.filter(project => 
    project.technologies.includes(technology)
  )
}

export const getProjectMetrics = () => {
  return {
    totalProjects: projectsData.length,
    featuredProjects: projectsData.filter(p => p.featured).length,
    categories: new Set(projectsData.map(p => p.category)).size,
    technologies: new Set(projectsData.flatMap(p => p.technologies)).size
  }
} 