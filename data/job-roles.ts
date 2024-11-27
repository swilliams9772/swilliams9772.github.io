import { JobRole } from '@/types'
import { Icons } from '@/components/icons'

export const jobRoles: JobRole[] = [
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    description: "Developing and deploying machine learning models into production",
    icon: Icons.Brain,
    color: "from-purple-500/20 to-pink-500/20",
    responsibilities: [
      "Develop and optimize machine learning models",
      "Deploy models to production environments",
      "Improve model performance and scalability",
      "Collaborate with cross-functional teams"
    ],
    requiredSkills: [
      "PyTorch",
      "TensorFlow",
      "Python",
      "MLOps",
      "Docker",
      "Kubernetes"
    ],
    relevantProjects: [
      {
        name: "Voice Cloning System",
        description: "Real-time voice synthesis using deep learning",
        skills: ["PyTorch", "FastAPI", "Docker"],
        outcomes: [
          "High-quality voice synthesis",
          "Real-time processing capability"
        ]
      },
      {
        name: "ML Model Deployment Pipeline",
        description: "Scalable infrastructure for serving ML models",
        skills: ["Kubernetes", "Docker", "MLflow"],
        outcomes: [
          "99.9% system uptime",
          "50% reduction in deployment time"
        ]
      }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyzing complex datasets to extract insights and build predictive models",
    icon: Icons.LineChart,
    color: "from-blue-500/20 to-cyan-500/20",
    responsibilities: [
      "Analyze large datasets",
      "Build predictive models",
      "Create data visualizations",
      "Present findings to stakeholders"
    ],
    requiredSkills: [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Scikit-learn",
      "Statistical Analysis"
    ],
    relevantProjects: [
      {
        name: "NYC Community Program Analysis",
        description: "Data-driven analysis for community program placement",
        skills: ["Python", "Geopandas", "Statistical Analysis"],
        outcomes: [
          "Identified optimal locations for program implementation",
          "Increased program effectiveness by 45%"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "Data Scientist",
        company: "Rose From Concrete",
        duration: "2022 - Present",
        highlights: [
          "Led data analysis for community programs",
          "Developed predictive models for program success",
          "Created interactive dashboards for stakeholders"
        ]
      }
    ]
  },
  {
    id: "computer-vision-engineer",
    title: "Computer Vision Engineer",
    description: "Developing advanced computer vision systems and algorithms",
    icon: Icons.Eye,
    color: "from-green-500/20 to-emerald-500/20",
    responsibilities: [
      "Design and implement computer vision algorithms",
      "Optimize model performance for real-time applications",
      "Develop image processing pipelines",
      "Research and implement state-of-the-art CV techniques"
    ],
    requiredSkills: [
      "PyTorch",
      "OpenCV",
      "CUDA",
      "TensorFlow",
      "Image Processing",
      "Deep Learning"
    ],
    relevantProjects: [
      {
        name: "YOLOv9 Implementation",
        description: "Real-time object detection system with COCO dataset",
        skills: ["PyTorch", "OpenCV", "CUDA"],
        outcomes: [
          "99% detection accuracy",
          "30 FPS processing speed"
        ]
      },
      {
        name: "Mask R-CNN Projects",
        description: "Instance segmentation for medical imaging",
        skills: ["TensorFlow", "OpenCV", "NumPy"],
        outcomes: [
          "95% segmentation accuracy",
          "Improved medical diagnosis"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "Computer Vision Engineer",
        company: "AI Research Lab",
        duration: "2022-2024",
        highlights: [
          "Led development of real-time object detection systems",
          "Improved model accuracy by 25%",
          "Implemented efficient image processing pipelines"
        ]
      }
    ],
    publications: [
      {
        title: "Advanced Object Detection Techniques",
        type: "Research Paper",
        relevance: "Novel approaches to real-time detection"
      }
    ]
  },
  {
    id: "nlp-engineer",
    title: "NLP Engineer",
    description: "Building and optimizing natural language processing systems",
    icon: Icons.MessageSquare,
    color: "from-blue-500/20 to-indigo-500/20",
    responsibilities: [
      "Develop NLP models and algorithms",
      "Fine-tune language models",
      "Implement text processing pipelines",
      "Design conversational AI systems"
    ],
    requiredSkills: [
      "PyTorch",
      "Transformers",
      "BERT",
      "GPT",
      "spaCy",
      "NLTK"
    ],
    relevantProjects: [
      {
        name: "Bolt.new-any-LLM",
        description: "Unified interface for LLM interactions",
        skills: ["Python", "Transformers", "FastAPI"],
        outcomes: [
          "Simplified LLM integration",
          "Reduced development time by 60%"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "NLP Engineer",
        company: "Language Tech Co",
        duration: "2021-2023",
        highlights: [
          "Developed multilingual NLP systems",
          "Improved text processing efficiency",
          "Led chatbot development projects"
        ]
      }
    ]
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    description: "Building scalable data infrastructure and pipelines",
    icon: Icons.Database,
    color: "from-yellow-500/20 to-orange-500/20",
    responsibilities: [
      "Design and implement data pipelines",
      "Optimize data storage and retrieval",
      "Ensure data quality and reliability",
      "Build ETL processes"
    ],
    requiredSkills: [
      "Python",
      "SQL",
      "Apache Spark",
      "Airflow",
      "AWS",
      "Docker"
    ],
    relevantProjects: [
      {
        name: "GDELT Analysis Pipeline",
        description: "Large-scale event data processing system",
        skills: ["Apache Spark", "Python", "SQL"],
        outcomes: [
          "Processed 1TB+ of event data",
          "Real-time analytics dashboard"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "Data Engineer",
        company: "Data Solutions Inc",
        duration: "2020-2022",
        highlights: [
          "Built scalable data pipelines",
          "Improved data processing efficiency",
          "Implemented data quality checks"
        ]
      }
    ]
  },
  {
    id: "cloud-architect",
    title: "Cloud Solutions Architect",
    description: "Designing and implementing cloud-native solutions",
    icon: Icons.Cloud,
    color: "from-cyan-500/20 to-blue-500/20",
    responsibilities: [
      "Design cloud architecture",
      "Implement scalable solutions",
      "Optimize cloud resources",
      "Ensure system reliability"
    ],
    requiredSkills: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Microservices"
    ],
    relevantProjects: [
      {
        name: "ML Model Deployment Pipeline",
        description: "Scalable ML model serving infrastructure",
        skills: ["Kubernetes", "Docker", "AWS"],
        outcomes: [
          "99.99% system uptime",
          "50% reduction in costs"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "Cloud Architect",
        company: "Cloud Solutions Co",
        duration: "2021-2024",
        highlights: [
          "Led cloud migration projects",
          "Optimized cloud spending",
          "Implemented DevOps practices"
        ]
      }
    ]
  },
  {
    id: "security-engineer",
    title: "Security Engineer",
    description: "Implementing and maintaining security systems",
    icon: Icons.Shield,
    color: "from-red-500/20 to-rose-500/20",
    responsibilities: [
      "Design security architecture",
      "Implement security measures",
      "Conduct security assessments",
      "Monitor security threats"
    ],
    requiredSkills: [
      "Python",
      "Security Tools",
      "Penetration Testing",
      "Network Security",
      "Cryptography"
    ],
    relevantProjects: [
      {
        name: "Ultimate-Dork",
        description: "Advanced vulnerability detection system",
        skills: ["Python", "Security APIs", "OSINT"],
        outcomes: [
          "Identified critical vulnerabilities",
          "Automated security scanning"
        ]
      }
    ],
    relevantExperience: [
      {
        role: "Security Engineer",
        company: "SecureTech",
        duration: "2022-2024",
        highlights: [
          "Led security assessments",
          "Implemented security protocols",
          "Developed security tools"
        ]
      }
    ]
  },
  {
    id: "ai-researcher",
    title: "AI Researcher / Scientist",
    description: "Conducting cutting-edge research in AI and machine learning",
    icon: Icons.Microscope,
    color: "from-violet-500/20 to-purple-500/20",
    responsibilities: [
      "Conduct research in advanced AI topics",
      "Publish findings in academic journals",
      "Develop novel algorithms and approaches",
      "Collaborate with research teams"
    ],
    requiredSkills: [
      "Deep Learning",
      "GANs",
      "Reinforcement Learning",
      "Transformers",
      "Research Methods",
      "Scientific Writing"
    ],
    relevantProjects: [
      {
        name: "AttnGAN Implementation",
        description: "Advanced text-to-image generation using attention mechanisms",
        skills: ["PyTorch", "GANs", "Attention Networks"],
        outcomes: [
          "State-of-the-art FID score",
          "Published research findings"
        ]
      }
    ]
  }
]; 