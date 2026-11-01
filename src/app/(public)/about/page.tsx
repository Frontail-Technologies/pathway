import type { Metadata } from 'next'
import { AboutPage } from '@/features/company/components/about-page'

export const metadata: Metadata = {
  title: 'About',
  description: 'Pathway helps students and parents find and compare colleges, courses, exams and scholarships, and plan the next step.',
}

export default function AboutRoute() {
  return <AboutPage />
}
