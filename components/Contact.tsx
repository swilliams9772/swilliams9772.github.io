"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Github, Linkedin, Mail, Phone, Send, MapPin } from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'
import type { ContactInfo, SocialLink } from '@/types'

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'shaq.williams.ai@gmail.com',
    href: 'mailto:shaq.williams.ai@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(917) 831-2482',
    href: 'tel:+19178312482'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Brooklyn, NY',
    href: null
  }
]

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/swilliams9772",
    icon: Github,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/shaquille-williams-957970129/",
    icon: Linkedin,
    label: "LinkedIn"
  }
]

export const Contact = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add your form submission logic here
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionLayout id="contact" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Get in Touch" 
          subtitle="Let's discuss how we can work together"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Connect with me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <link.icon className="h-5 w-5 text-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={1}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <Input placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Input placeholder="Subject" required />
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px]" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

