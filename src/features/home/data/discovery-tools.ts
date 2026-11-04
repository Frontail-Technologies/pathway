import type { LucideIcon } from 'lucide-react'
import { ArrowLeftRight, Award, Brain, Compass, FileText, Globe2, GraduationCap, MessageCircleQuestion, Presentation, Target } from 'lucide-react'

export type DiscoveryTool = {
  title: string
  description?: string
  href: string
  icon: LucideIcon
}

export const discoveryTools: DiscoveryTool[] = [
  { title: 'Find Colleges', description: 'Browse by course, city and fees', href: '/colleges', icon: GraduationCap },
  { title: 'Compare Colleges', description: 'Compare fees, placements and facilities side by side', href: '/compare', icon: ArrowLeftRight },
  { title: 'College Predictor', description: 'See colleges you may qualify for by score or rank', href: '/college-predictor', icon: Target },
  { title: 'Psychometric Test', description: 'Reflect on your interests, strengths and career fit', href: '/psychometric-test', icon: Brain },
  { title: 'Explore Exams', description: 'JEE, NEET, CUET and other entrance exams', href: '/exams', icon: FileText },
  { title: 'Scholarships', description: 'Find scholarships you may be eligible for', href: '/scholarships', icon: Award },
  { title: 'Find Tutors', description: 'Connect with individual subject tutors', href: '/tutors', icon: Presentation },
  { title: 'Study Abroad', description: 'Explore destinations and study options overseas', href: '/study-abroad', icon: Globe2 },
  { title: 'Career Explorer', description: 'Discover career fields and how they connect to courses', href: '/careers', icon: Compass },
  { title: 'Ask / Counselling', description: 'Free guidance from our counsellors', href: '/counselling', icon: MessageCircleQuestion },
]
