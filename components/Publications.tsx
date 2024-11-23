"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Book, Presentation, Github, ExternalLink, Calendar, Award, Video, Volume2, Play, Pause, Download, ArrowRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const publications = [
  {
    title: 'Mastering Kubernetes (Third Edition)',
    type: 'Book',
    date: '2023',
    description: 'Comprehensive guide on Docker and Kubernetes solutions for production environments and open-source communities.',
    link: 'https://example.com/mastering-kubernetes',
    media: {
      type: 'video',
      url: '/videos/kubernetes-overview.mp4',
      thumbnail: '/images/kubernetes-thumb.jpg',
      duration: '5:30'
    }
  },
  {
    title: 'Machine Learning for Cybersecurity',
    type: 'Tutorial Series',
    date: '2023',
    description: 'Practical tutorials on building ethical, secure systems for social justice applications using machine learning.',
    link: 'https://example.com/ml-cybersecurity',
    media: {
      type: 'audio',
      url: '/audio/ml-cybersecurity-podcast.mp3',
      duration: '25:15'
    }
  },
  {
    title: 'Hands-On Web Scraping with Python',
    type: 'Educational Content',
    date: '2022',
    description: 'Comprehensive guide on web scraping techniques, including specialized crawlers for social and historical content preservation.',
    link: 'https://example.com/web-scraping-guide',
  },
  {
    title: 'Practical Applications of GANs in Social Impact Projects',
    type: 'Research Paper',
    date: '2023',
    description: 'Comprehensive study on using GANs for social good, including case studies and implementation guidelines.',
    link: 'https://example.com/gans-social-impact',
  },
  {
    title: 'Building Ethical AI Systems',
    type: 'Tutorial Series',
    date: '2023',
    description: 'Guide to developing AI systems with built-in ethical considerations and social responsibility.',
    link: 'https://example.com/ethical-ai',
  },
]

const workshops = [
  {
    title: 'GraphNR Workshop 2023',
    event: 'Network Science Conference',
    date: 'September 2023',
    description: 'Hands-on workshop covering network analysis fundamentals, practical applications, and simulations.',
    materials: 'https://example.com/graphnr-workshop',
    recording: {
      type: 'video',
      url: '/videos/graphnr-workshop.mp4',
      thumbnail: '/images/workshop-thumb.jpg',
      duration: '1:45:00'
    },
    slides: {
      url: '/slides/graphnr-workshop.pdf',
      previewImages: [
        '/images/slide1.jpg',
        '/images/slide2.jpg',
        '/images/slide3.jpg'
      ]
    }
  },
  {
    title: 'Hacktivism & Digital Security',
    event: 'Community Tech Summit',
    date: 'July 2023',
    description: 'Workshop on digital tools for activism, covering secure communication, ethical hacking, and digital privacy.',
    materials: 'https://example.com/hacktivism-workshop',
  },
  {
    title: 'AI for Social Impact',
    event: 'Tech4Good Conference',
    date: 'May 2023',
    description: 'Workshop on leveraging AI and ML for community development and social justice initiatives.',
    materials: 'https://example.com/ai-social-impact',
  },
  {
    title: 'Reinforcement Learning for Social Good',
    event: 'AI4Social Conference',
    date: 'August 2023',
    description: 'Workshop on applying RL techniques to solve social challenges and improve community outcomes.',
    materials: 'https://example.com/rl-social-good',
  },
  {
    title: 'Community-Centered Tech Development',
    event: 'Tech4Justice Summit',
    date: 'June 2023',
    description: 'Hands-on workshop on building technology solutions that prioritize community needs and social impact.',
    materials: 'https://example.com/community-tech',
  },
]

const openSourceContributions = [
  {
    project: 'TensorFlow',
    description: 'Contributed to documentation improvements and bug fixes in the core ML library',
    contributions: [
      'Enhanced documentation clarity for neural network components',
      'Fixed issues in data preprocessing pipeline',
      'Improved error handling in model training workflows'
    ],
    link: 'https://github.com/tensorflow/tensorflow'
  },
  {
    project: 'Scikit-learn',
    description: 'Contributed to enhancement of machine learning algorithms and documentation',
    contributions: [
      'Improved algorithm efficiency in clustering methods',
      'Enhanced documentation for model evaluation metrics',
      'Fixed bugs in cross-validation implementations'
    ],
    link: 'https://github.com/scikit-learn/scikit-learn'
  },
  {
    project: 'Hugging Face Transformers',
    description: 'Contributed to improvements in NLP model implementations',
    contributions: [
      'Enhanced tokenizer functionality',
      'Improved documentation for fine-tuning procedures',
      'Fixed memory optimization issues'
    ],
    link: 'https://github.com/huggingface/transformers'
  }
]

const MediaPlayer = ({ media }: { media: any }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null)

  const togglePlay = async () => {
    if (!mediaRef.current) return

    try {
      if (isPlaying) {
        await mediaRef.current.pause()
        setIsPlaying(false)
      } else {
        // Only attempt to play if the media is ready
        if (isReady) {
          const playPromise = mediaRef.current.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch(error => {
                console.error("Playback failed:", error)
                setIsPlaying(false)
              })
          }
        }
      }
    } catch (error) {
      console.error("Media control error:", error)
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const progress = (mediaRef.current.currentTime / mediaRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleLoadedMetadata = () => {
    setIsReady(true)
  }

  const handleError = (e: Event) => {
    console.error("Media error:", e)
    setIsPlaying(false)
    setIsReady(false)
  }

  useEffect(() => {
    const currentMedia = mediaRef.current
    if (currentMedia) {
      currentMedia.addEventListener('loadedmetadata', handleLoadedMetadata)
      currentMedia.addEventListener('error', handleError)
    }

    return () => {
      if (currentMedia) {
        currentMedia.removeEventListener('loadedmetadata', handleLoadedMetadata)
        currentMedia.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden bg-background/50">
      {media.type === 'video' ? (
        <div className="aspect-video relative">
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={media.url}
            poster={media.thumbnail}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            preload="metadata"
            playsInline
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={togglePlay}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary"
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-12 w-12" />
              ) : (
                <Play className="h-12 w-12" />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="hover:text-primary"
            disabled={!isReady}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={media.url}
            onTimeUpdate={handleTimeUpdate}
            preload="metadata"
          />
          <div className="flex-grow">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground">{media.duration}</span>
        </div>
      )}
    </div>
  )
}

const Publications = () => {
  return (
    <section id="publications" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Publications & Contributions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              Publications
            </h3>
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="transform transition-all duration-300"
              >
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{pub.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className="bg-primary/10 text-primary"
                      >
                        {pub.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      {pub.date}
                    </div>
                    <p className="text-muted-foreground mb-4">{pub.description}</p>
                    {pub.media && (
                      <div className="mb-4">
                        <MediaPlayer media={pub.media} />
                      </div>
                    )}
                    <div className="flex gap-4">
                      <Button asChild>
                        <a 
                          href={pub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Read Publication
                        </a>
                      </Button>
                      {pub.media && (
                        <Button asChild variant="outline">
                          <a 
                            href={pub.media.url} 
                            download
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download Media
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Presentation className="h-6 w-6 text-primary" />
              Workshops & Talks
            </h3>
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="transform transition-all duration-300"
              >
                <Card className="bg-gradient-to-r from-secondary/5 to-primary/5">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{workshop.title}</CardTitle>
                      <Badge 
                        variant="outline"
                        className="bg-secondary/10 text-secondary-foreground"
                      >
                        {workshop.event}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      {workshop.date}
                    </div>
                    <p className="text-muted-foreground mb-4">{workshop.description}</p>
                    <div className="flex gap-4">
                      <Button asChild variant="outline">
                        <a 
                          href={workshop.materials} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Materials
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Github className="h-6 w-6 text-primary" />
              Open Source Contributions
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {openSourceContributions.map((contribution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transform transition-all duration-300"
                >
                  <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{contribution.project}</h4>
                          <p className="text-sm text-muted-foreground">{contribution.description}</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <a 
                            href={contribution.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            View Project
                          </a>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {contribution.contributions.map((item, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Publications

