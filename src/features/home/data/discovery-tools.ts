import type { LucideIcon } from 'lucide-react'
import { ArrowLeftRight, Award, FileText, GraduationCap, MessageCircleQuestion, Presentation, Target } from 'lucide-react'

export type DiscoveryTool = {
  title: string
  description?: string
  href: string
  icon: LucideIcon
}

export const discoveryTools: DiscoveryTool[] = [
  { title: 'Find Colleges', description: 'Browse by course, city and fees', href: '/colleges', icon: GraduationCap },
  { title: 'Compare Colleges', description: 'Compare fees, placements and ranking', href: '/compare', icon: ArrowLeftRight },
  { title: 'College Predictor', description: 'Know your admission chances by score', href: '/college-predictor', icon: Target },
  { title: 'Exams', description: 'JEE, NEET, CUET dates and syllabus', href: '/exams', icon: FileText },
  { title: 'Scholarships', description: 'Find scholarships you may qualify for', href: '/scholarships', icon: Award },
  { title: 'Find Tutors', description: 'Connect with verified subject tutors', href: '/tutors', icon: Presentation },
  { title: 'Ask / Counselling', description: 'Free guidance from our counsellors', href: '/counselling', icon: MessageCircleQuestion },
]
