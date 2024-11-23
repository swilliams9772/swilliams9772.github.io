"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, Code, Brain, Heart, Lightbulb, Eye } from 'lucide-react'

const blogPosts = [
  {
    title: 'Demystifying Transformer Architecture: A Deep Dive',
    date: 'October 15, 2023',
    readTime: '15 min read',
    excerpt: 'In this post, we break down the Transformer architecture, explaining its components and why it\'s so powerful for NLP tasks.',
    tags: ['Machine Learning', 'NLP', 'Transformers'],
    link: '/blog/demystifying-transformer-architecture',
    category: 'Technical',
    color: 'from-blue-500/20 to-purple-500/20',
    icon: Code,
    featured: true,
    views: '2.5k',
    likes: 156
  },
  {
    title: 'Ethical Considerations in AI Development',
    date: 'September 28, 2023',
    readTime: '10 min read',
    excerpt: 'As AI becomes more prevalent, it\'s crucial to consider the ethical implications. This post explores key ethical considerations in AI development.',
    tags: ['AI Ethics', 'Responsible AI'],
    link: '/blog/ethical-considerations-in-ai',
    category: 'Opinion',
    color: 'from-green-500/20 to-emerald-500/20',
    icon: Brain,
    views: '1.8k',
    likes: 98
  },
  {
    title: 'Building AI Systems for Social Good',
    date: 'August 15, 2023',
    readTime: '12 min read',
    excerpt: 'How we can leverage AI technology to create positive social impact and empower communities.',
    tags: ['AI', 'Social Impact', 'Community'],
    link: '/blog/ai-for-social-good',
    category: 'Opinion',
    color: 'from-pink-500/20 to-red-500/20',
    icon: Heart,
    views: '3.2k',
    likes: 245
  },
  {
    title: 'The Future of AI Education',
    date: 'July 20, 2023',
    readTime: '8 min read',
    excerpt: 'Exploring innovative approaches to teaching AI and machine learning concepts to the next generation.',
    tags: ['Education', 'AI', 'Teaching'],
    link: '/blog/future-of-ai-education',
    category: 'Opinion',
    color: 'from-yellow-500/20 to-orange-500/20',
    icon: Lightbulb,
    views: '1.5k',
    likes: 87
  }
]

const categories = ['All', 'Technical', 'Tutorial', 'Opinion']

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about AI, machine learning, and technology for social good.
          </p>
        </div>

        {featuredPost && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Featured Post</h3>
            <Card className={`bg-gradient-to-r ${featuredPost.color} overflow-hidden transform transition-all duration-300 hover:scale-[1.02]`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <featuredPost.icon className="h-5 w-5 text-primary" />
                    <Badge variant="outline" className="bg-background/50">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredPost.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${hoveredPost === featuredPost.title ? 'fill-current text-red-500' : ''}`} />
                      {featuredPost.likes}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{featuredPost.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {featuredPost.date}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">{featuredPost.excerpt}</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <Badge variant="secondary" className="bg-background/50">
                          {tag}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild
                    className="bg-background/50 hover:bg-background/80"
                  >
                    <a 
                      href={featuredPost.link}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read Full Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="All" className="w-full sm:w-auto">
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPosts
              .filter(post => !post.featured)
              .map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onHoverStart={() => setHoveredPost(post.title)}
                onHoverEnd={() => setHoveredPost(null)}
              >
                <Card className={`h-full flex flex-col bg-gradient-to-r ${post.color} transform transition-all duration-300 hover:scale-[1.02]`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <post.icon className="h-5 w-5 text-primary" />
                        <Badge variant="outline" className="bg-background/50">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className={`h-4 w-4 ${hoveredPost === post.title ? 'fill-current text-red-500' : ''}`} />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <div key={tag} className="flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            <Badge variant="secondary" className="bg-background/50">
                              {tag}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full bg-background/50 hover:bg-background/80"
                      >
                        <a 
                          href={post.link}
                          className="flex items-center justify-center gap-2 group"
                        >
                          <BookOpen className="h-4 w-4" />
                          Read More
                          <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                            hoveredPost === post.title ? 'translate-x-1' : ''
                          }`} />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <a href="/blog" className="flex items-center gap-2 group">
              View All Posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Blog

