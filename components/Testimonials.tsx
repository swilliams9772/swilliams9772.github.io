"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'

interface Testimonial {
  id: string
  content: string
  author: {
    name: string
    role: string
    company: string
    image?: string
  }
  rating: number
  project: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    content: "Exceptional work on our machine learning infrastructure. The improvements in model performance and deployment efficiency were remarkable.",
    author: {
      name: "Sarah Chen",
      role: "CTO",
      company: "TechForward",
      image: "/testimonials/sarah.jpg"
    },
    rating: 5,
    project: "ML Infrastructure Optimization"
  }
]

export default function Testimonials() {
  return (
    <SectionLayout id="testimonials" pattern="dots">
      <SectionHeader
        title="Client Testimonials"
        subtitle="What others say about working with me"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-start">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <ClientIcon
                      key={i}
                      icon={Icons.Star}
                      className="h-5 w-5 text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground">"{testimonial.content}"</p>

                <div className="flex items-center gap-4">
                  <Avatar>
                    {testimonial.author.image ? (
                      <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                    ) : (
                      <AvatarFallback>
                        {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.role} at {testimonial.author.company}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground border-t pt-4">
                  Project: {testimonial.project}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  )
}

