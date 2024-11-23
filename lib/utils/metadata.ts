import type { Metadata } from 'next'

interface GenerateMetadataProps {
  title: string
  description?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
  author?: string
  type?: 'website' | 'article' | 'profile'
}

export function generateMetadata({
  title,
  description,
  image = '/og-image.jpg',
  noIndex = false,
  keywords = [],
  author = 'Shaquille Williams',
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://swilliams9772.github.io'
  
  return {
    title,
    description,
    keywords: [
      'Software Engineer',
      'AI Engineer',
      'Machine Learning',
      'Full Stack Developer',
      ...keywords
    ],
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      type,
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Shaquille Williams Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
      creator: '@swilliams9772',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
} 