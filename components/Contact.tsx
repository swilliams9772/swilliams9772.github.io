"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { personalInfo } from '@/data/personal-info'
import { cn } from '@/lib/utils'

const contactMethods = [
  {
    icon: Icons.Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'text-blue-500'
  },
  {
    icon: Icons.Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: 'text-green-500'
  },
  {
    icon: Icons.Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: `https://${personalInfo.linkedin}`,
    color: 'text-blue-600'
  },
  {
    icon: Icons.Github,
    label: 'GitHub',
    value: 'View Projects',
    href: `https://${personalInfo.github}`,
    color: 'text-purple-500'
  },
  {
    icon: Icons.MapPin,
    label: 'Location',
    value: personalInfo.location,
    color: 'text-red-500'
  }
]

export function Contact() {
  return (
    <SectionLayout id="contact" pattern="dots">
      <SectionHeader
        title="Get in Touch"
        subtitle="Let's discuss your next project or collaboration opportunity"
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <ClientIcon icon={Icons.User} className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className={cn("p-2 rounded-lg bg-background", method.color)}>
                            <ClientIcon icon={method.icon} className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 p-3 rounded-lg">
                          <div className={cn("p-2 rounded-lg bg-background", method.color)}>
                            <ClientIcon icon={method.icon} className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <ClientIcon icon={Icons.MessageSquare} className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Quick Connect</h3>
                </div>

                <p className="text-muted-foreground">
                  I'm always interested in hearing about new opportunities, collaborations, 
                  and innovative projects. Whether you have a question or just want to say hi, 
                  I'll try my best to get back to you!
                </p>

                <div className="space-y-4">
                  <Button className="w-full" size="lg" asChild>
                    <a href={`mailto:${personalInfo.email}`}>
                      Send Email
                      <ClientIcon icon={Icons.Send} className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button className="w-full" variant="outline" size="lg" asChild>
                    <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                      Connect on LinkedIn
                      <ClientIcon icon={Icons.ExternalLink} className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Response time: Usually within 24-48 hours</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

