"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters")
})

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Add your form submission logic here
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I&apos;ll get back to you soon."
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <SectionLayout id="contact" pattern="dots">
      {/* Rest of the component implementation */}
    </SectionLayout>
  )
}

export default Contact

