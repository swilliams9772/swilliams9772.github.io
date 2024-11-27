"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'

export default function Blog() {
  const posts = [
    {
      title: "Optimizing Neural Networks for Real-Time Applications",
      excerpt: "Exploring techniques to improve neural network performance in real-time scenarios...",
      date: "2024-03-15",
      readTime: "5 min read",
      tags: ["Machine Learning", "Performance", "Neural Networks"],
      link: "https://example.com/blog/1"
    }
    // Add more blog posts as needed
  ]

  return (
    <SectionLayout id="blog" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Blog" 
          subtitle="Thoughts and insights on AI, software engineering, and technology"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2 flex-grow">
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

