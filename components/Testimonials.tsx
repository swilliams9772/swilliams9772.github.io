"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Quote, Star, Building2, Target, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionLayout } from './ui/section-layout'
import { SectionHeader } from './ui/section-header'

const testimonials = [
  {
    name: 'Dr. Emily Chen',
    role: 'CTO, AI Innovations Inc.',
    avatar: '/avatars/emily-chen.jpg',
    content: 'Shaquille\'s expertise in AI and machine learning is truly exceptional. His contributions to our voice cloning project were invaluable and helped us achieve breakthrough results.',
    company: 'AI Innovations Inc.',
    project: 'Voice Cloning System',
    impact: 'Reduced inference time by 75%',
    rating: 5,
    duration: '6 months',
    achievements: [
      'Optimized model performance',
      'Implemented real-time processing',
      'Improved voice quality'
    ],
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Data Scientist, TechCorp',
    avatar: '/avatars/michael-rodriguez.jpg',
    content: 'Working with Shaquille was a game-changer for our team. His deep understanding of complex ML algorithms and ability to implement them efficiently set new standards for our projects.',
    company: 'TechCorp',
    project: 'ML Infrastructure Scaling',
    impact: '40% cost reduction',
    rating: 5,
    duration: '8 months',
    achievements: [
      'Automated deployment pipeline',
      'Reduced operational costs',
      'Improved model monitoring'
    ],
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    name: 'Sarah Thompson',
    role: 'VP of Engineering, DataTech Solutions',
    avatar: '/avatars/sarah-thompson.jpg',
    content: 'Shaquille\'s work on our data pipeline optimization was outstanding. His innovative approach not only solved our immediate challenges but also set us up for future scalability.',
    company: 'DataTech Solutions',
    project: 'Data Pipeline Optimization',
    impact: '10x throughput increase',
    rating: 5,
    duration: '4 months',
    achievements: [
      'Enhanced data processing',
      'Implemented real-time analytics',
      'Improved system reliability'
    ],
    color: 'from-orange-500/20 to-red-500/20'
  }
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setActiveIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection
      if (newIndex < 0) newIndex = testimonials.length - 1
      if (newIndex >= testimonials.length) newIndex = 0
      return newIndex
    })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <SectionLayout id="testimonials" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Client Testimonials" 
          subtitle="Hear what others say about our collaboration and results"
        />
        
        <div className="relative h-[600px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              className="absolute w-full"
            >
              <Card 
                className={`bg-gradient-to-r ${testimonials[activeIndex].color} p-8 max-w-4xl mx-auto transform transition-all duration-300`}
              >
                <CardContent className="relative">
                  <Quote className="absolute text-primary/20 h-24 w-24 -top-4 -left-4 -z-10" />
                  
                  <div className="grid md:grid-cols-[1fr,2fr] gap-8">
                    <div className="text-center md:text-left">
                      <Avatar className="h-24 w-24 mx-auto md:mx-0 mb-4 ring-2 ring-primary/20">
                        <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                        <AvatarFallback>{testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-xl mb-1">{testimonials[activeIndex].name}</h3>
                      <p className="text-muted-foreground mb-2">{testimonials[activeIndex].role}</p>
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <p>{testimonials[activeIndex].company}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <blockquote className="text-lg italic relative">
                        <Quote className="absolute -left-4 -top-2 h-4 w-4 text-primary/40 transform -scale-x-100" />
                        {testimonials[activeIndex].content}
                        <Quote className="absolute -right-4 -bottom-2 h-4 w-4 text-primary/40" />
                      </blockquote>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium">Project</p>
                          </div>
                          <p className="text-muted-foreground">{testimonials[activeIndex].project}</p>
                        </div>
                        <div className="bg-background/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium">Impact</p>
                          </div>
                          <p className="text-muted-foreground">{testimonials[activeIndex].impact}</p>
                        </div>
                      </div>

                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Key Achievements</h4>
                        <div className="flex flex-wrap gap-2">
                          {testimonials[activeIndex].achievements.map((achievement, i) => (
                            <Badge 
                              key={i}
                              variant="outline"
                              className="bg-background/50"
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            className="rounded-full hover:scale-110 transition-transform"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            className="rounded-full hover:scale-110 transition-transform"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}

export { Testimonials }

