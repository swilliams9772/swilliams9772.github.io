"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Github, ExternalLink, Play, Pause, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { sortProjects, filterProjects } from '@/lib/utils/project-utils'
import type { Project } from '@/types'

const projects = [
  {
    title: 'Voice Cloning & Audio Processing Suite',
    category: 'Audio Processing & AI',
    difficulty: 5,
    completionDate: '2023',
    teamSize: 3,
    technologies: ['TensorFlow TTS', 'PyTorch', 'Whisper', 'FastAPI', 'React'],
    impact: 'Enabled high-fidelity audio synthesis for accessibility tools',
    github: 'https://github.com/swilliams9772/voice-clone',
    demo: 'https://voice-clone-demo.com',
    challenges: 'Optimizing real-time performance and maintaining voice fidelity',
    achievements: 'Successfully implemented one-shot voice cloning with high accuracy',
    description: 'Comprehensive audio processing system including real-time voice cloning, multilingual transcription, and speaker diarization.',
    featured: true,
  },
  {
    title: 'Community Grant Management System',
    category: 'Full-Stack Development',
    difficulty: 4,
    completionDate: '2023',
    teamSize: 2,
    technologies: ['Next.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    impact: 'Optimized fund allocation for 100+ community projects',
    github: 'https://github.com/swilliams9772/grant-manager',
    challenges: 'Building complex reporting and impact assessment features',
    achievements: 'Improved grant distribution efficiency by 40%',
    description: 'Grant tracking and impact assessment system for health, education, and social justice initiatives.',
  },
  {
    title: 'DALL-E 2 PyTorch Implementation',
    category: 'Generative AI',
    difficulty: 5,
    completionDate: '2023-03-01',
    teamSize: 2,
    technologies: ['PyTorch', 'CUDA', 'Docker'],
    impact: 'Open-source project with 1000+ stars on GitHub',
    github: 'https://github.com/username/dalle-pytorch',
    challenges: 'Scaling training to large datasets, optimizing inference speed',
    achievements: 'Achieved state-of-the-art results on image generation benchmarks',
    videoPreview: 'https://example.com/dalle-preview.mp4',
    description: 'An efficient PyTorch implementation of the DALL-E 2 model, capable of generating high-quality images from textual descriptions. This project focuses on optimizing the model for faster inference and improved scalability.',
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
  },
  {
    title: 'Wikipedia Connection Finder',
    category: 'Network Analysis',
    difficulty: 4,
    completionDate: '2022-11-30',
    teamSize: 1,
    technologies: ['Python', 'NetworkX', 'Flask'],
    impact: '10k+ monthly users',
    github: 'https://github.com/username/wiki-connection-finder',
    demo: 'https://wiki-connections.com',
    challenges: 'Efficiently traversing large graph structures',
    achievements: 'Featured on ProductHunt',
    videoPreview: 'https://example.com/wiki-connection-preview.mp4',
    description: 'A web application that finds the shortest path between two Wikipedia articles, showcasing the interconnectedness of knowledge. This project utilizes graph theory and efficient algorithms to quickly navigate the vast network of Wikipedia pages.',
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
  },
  {
    title: 'NYC Education Analytics',
    category: 'Data Science',
    difficulty: 4,
    completionDate: '2022-09-15',
    teamSize: 4,
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
    impact: '20% improvement in educational outcomes',
    github: 'https://github.com/username/nyc-edu-analytics',
    challenges: 'Cleaning and integrating data from multiple sources',
    achievements: 'Presented findings to NYC Department of Education',
    videoPreview: 'https://example.com/nyc-edu-preview.mp4',
    description: 'A comprehensive data analysis project that examines various factors affecting educational outcomes in New York City schools. This project involves data cleaning, statistical analysis, and machine learning to identify key areas for improvement in the education system.',
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
  },
  {
    title: 'Multi-Agent RL Environment',
    category: 'Reinforcement Learning',
    difficulty: 5,
    completionDate: '2023-01-20',
    teamSize: 2,
    technologies: ['Python', 'TensorFlow', 'OpenAI Gym'],
    impact: 'Used in multiple research papers',
    github: 'https://github.com/username/multi-agent-rl',
    challenges: 'Designing scalable and flexible environment for various RL scenarios',
    achievements: 'Cited in a major RL textbook',
    videoPreview: 'https://example.com/multi-agent-rl-preview.mp4',
    description: 'A flexible and scalable environment for multi-agent reinforcement learning research. This project provides a framework for developing and testing various RL algorithms in complex, multi-agent scenarios, contributing to advancements in cooperative and competitive AI behaviors.',
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
  },
  {
    title: 'Autonomous UAV Fleet',
    category: 'Robotics & IoT',
    difficulty: 5,
    completionDate: '2019-Present',
    teamSize: 1,
    technologies: ['Raspberry Pi', 'Arduino', 'Lidar', 'Python'],
    impact: 'Created fully autonomous fleet of UAVs and model cars',
    github: 'https://github.com/shaqwilliams/uav-fleet',
    challenges: 'Integrating multiple hardware components and ensuring reliable autonomous operation',
    achievements: 'Successfully implemented advanced autonomous navigation systems',
    description: 'A personal project involving the design and construction of autonomous UAVs and model cars. This project integrates various technologies including Raspberry Pi, Arduino, and Lidar cameras to create a fleet of self-operating vehicles.',
    featured: true,
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
  },
]

interface ProjectFilter {
  category: string
  technology: string
  difficulty: string
}

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<ProjectFilter>({ 
    category: 'All', 
    technology: 'All', 
    difficulty: 'All' 
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedProjects, setDisplayedProjects] = useState(projects)
  const projectsPerPage = 6

  useEffect(() => {
    const sorted = sortProjects(projects, sortOption)
    const filtered = filterProjects(sorted, filter, searchTerm)
    setDisplayedProjects(filtered)
    setCurrentPage(1) // Reset to first page when filter changes
  }, [sortOption, filter, searchTerm])

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = displayedProjects.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(displayedProjects.length / projectsPerPage)) return
    setCurrentPage(pageNumber)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const technologies = ['All', ...Array.from(new Set(projects.flatMap(p => p.technologies)))]
  const difficulties = ['All', ...Array.from(new Set(projects.map(p => p.difficulty.toString())))]

  const featuredProject = projects.find(p => p.featured)

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

        {featuredProject && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Featured Project</h3>
            <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video">
                  <video
                    src={featuredProject.videoPreview}
                    className="w-full h-full object-cover rounded-lg"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <CardTitle className="mb-2">{featuredProject.title}</CardTitle>
                  <Badge className="mb-4 bg-primary/10">{featuredProject.category}</Badge>
                  <p className="text-muted-foreground mb-4">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-background/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button asChild>
                      <a 
                        href={featuredProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    {featuredProject.demo && (
                      <Button asChild variant="outline">
                        <a 
                          href={featuredProject.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          <Select 
            onValueChange={(value) => setFilter(prev => ({ ...prev, category: value }))}
            defaultValue="All"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            onValueChange={(value) => setFilter(prev => ({ ...prev, technology: value }))}
            defaultValue="All"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Technology" />
            </SelectTrigger>
            <SelectContent>
              {technologies.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            onValueChange={(value) => setFilter(prev => ({ ...prev, difficulty: value }))}
            defaultValue="All"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((level) => (
                <SelectItem key={level} value={level}>
                  {level === 'All' ? 'All Levels' : `Level ${level}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className="h-full flex flex-col bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <Badge className="w-fit">{project.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    <video
                      src={project.videoPreview}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      onMouseEnter={() => setActiveVideo(project.title)}
                      onMouseLeave={() => setActiveVideo(null)}
                    />
                    <AnimatePresence>
                      {activeVideo === project.title && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50"
                        >
                          {activeVideo === project.title ? (
                            <Play className="h-12 w-12 text-white" />
                          ) : (
                            <Pause className="h-12 w-12 text-white" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Difficulty: {'★'.repeat(project.difficulty)}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Completed: {project.completionDate}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Team Size: {project.teamSize}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-background/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="mx-4 flex items-center">
            Page {currentPage} of {Math.ceil(displayedProjects.length / projectsPerPage)}
          </span>
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProject >= displayedProjects.length}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProject.title}</DialogTitle>
                  <DialogDescription>{selectedProject.category}</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <video
                          src={selectedProject.videoPreview}
                          className="w-full aspect-video object-cover rounded-lg"
                          controls
                          loop
                          muted
                          playsInline
                        />
                      </div>
                      <div>
                        <p className="mb-4">{selectedProject.description}</p>
                        <p className="mb-2">
                          <strong>Impact:</strong> {selectedProject.impact}
                        </p>
                        <p className="mb-2">
                          <strong>Challenges:</strong> {selectedProject.challenges}
                        </p>
                        <p className="mb-4">
                          <strong>Achievements:</strong> {selectedProject.achievements}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedProject.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <Button asChild>
                            <a 
                              href={selectedProject.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Github className="h-4 w-4" /> GitHub
                            </a>
                          </Button>
                          {selectedProject.demo && (
                            <Button asChild variant="outline">
                              <a 
                                href={selectedProject.demo} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="h-4 w-4" /> Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="gallery">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedProject.images?.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${selectedProject.title} screenshot ${index + 1}`} 
                          className="w-full h-auto rounded-lg"
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="demo">
                    <div className="aspect-video">
                      <iframe
                        src={selectedProject.demo}
                        className="w-full h-full rounded-lg"
                        title={`${selectedProject.title} Interactive Demo`}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Projects

