import type { Metadata } from 'next'
import { ResumeBuilderPage } from '@/features/resume-builder/components/resume-builder-page'

export const metadata: Metadata = {
  title: 'Resume Builder | Pathway',
  description: 'Build a clean, ATS-friendly resume for internships, placements, and university applications.',
}

export default function Page() {
  return <ResumeBuilderPage />
}
