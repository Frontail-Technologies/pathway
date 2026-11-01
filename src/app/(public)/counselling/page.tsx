import type { Metadata } from 'next'
import { CounsellingPage } from '@/features/counselling/components/counselling-page'

export const metadata: Metadata = {
  title: 'Free Counselling',
  description: 'Talk to an education counsellor about colleges, courses, exams and admissions. Free call back, no obligation.',
}

export default function CounsellingRoute() {
  return <CounsellingPage />
}
