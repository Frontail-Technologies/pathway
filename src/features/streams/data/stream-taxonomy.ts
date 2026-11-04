import { Briefcase, Calculator, Cpu, FlaskConical, Scale, Stethoscope, type LucideIcon } from 'lucide-react'

export type StreamSlug = 'engineering' | 'management' | 'medical' | 'law' | 'science' | 'commerce'

export type StreamDefinition = {
  slug: StreamSlug
  name: string
  icon: LucideIcon
  tagline: string
  description: string
  courseStream?: string
  studyArea?: 'Engineering' | 'Medical' | 'Management' | 'Law'
  collegeDegrees: string[]
  scholarshipStream?: string
  examKeywords: string[]
}

export const streams: StreamDefinition[] = [
  {
    slug: 'engineering',
    name: 'Engineering',
    icon: Cpu,
    tagline: 'B.Tech, B.E. and M.Tech',
    description: 'Engineering colleges, courses, entrance exams like JEE and GATE, scholarships and coaching in one place.',
    courseStream: 'Engineering',
    studyArea: 'Engineering',
    collegeDegrees: ['B.Tech', 'B.E.', 'M.Tech'],
    scholarshipStream: 'Engineering',
    examKeywords: ['JEE Main', 'JEE Advanced', 'GATE', 'BITSAT'],
  },
  {
    slug: 'management',
    name: 'Management',
    icon: Briefcase,
    tagline: 'MBA, PGDM and BBA',
    description: 'Management courses, MBA entrance exams like CAT and XAT, colleges and coaching.',
    courseStream: 'Management',
    studyArea: 'Management',
    collegeDegrees: ['MBA', 'BBA', 'PGDM'],
    scholarshipStream: 'Management',
    examKeywords: ['CAT', 'XAT', 'MAT', 'CMAT'],
  },
  {
    slug: 'medical',
    name: 'Medical',
    icon: Stethoscope,
    tagline: 'MBBS, BDS and B.Pharm',
    description: 'Medical and allied health courses, NEET, scholarships and coaching.',
    courseStream: 'Medical',
    studyArea: 'Medical',
    collegeDegrees: ['MBBS', 'BDS', 'B.Pharm'],
    scholarshipStream: 'Medical',
    examKeywords: ['NEET UG', 'NEET PG'],
  },
  {
    slug: 'law',
    name: 'Law',
    icon: Scale,
    tagline: 'BA LLB and LLM',
    description: 'Law courses, CLAT and other law entrance exams, and coaching.',
    courseStream: 'Law',
    studyArea: 'Law',
    collegeDegrees: ['BA LLB', 'LLB', 'LLM'],
    scholarshipStream: 'Law',
    examKeywords: ['CLAT', 'AILET'],
  },
  {
    slug: 'science',
    name: 'Science',
    icon: FlaskConical,
    tagline: 'B.Sc, M.Sc and research',
    description: 'Science degrees, research-track scholarships and related courses.',
    courseStream: 'Science',
    collegeDegrees: ['B.Sc', 'M.Sc', 'BCA'],
    scholarshipStream: 'Science',
    examKeywords: ['IIT JAM'],
  },
  {
    slug: 'commerce',
    name: 'Commerce',
    icon: Calculator,
    tagline: 'B.Com, CA and finance',
    description: 'Commerce colleges, CA preparation and related courses.',
    courseStream: 'Commerce',
    collegeDegrees: ['B.Com', 'M.Com'],
    examKeywords: ['CA Foundation'],
  },
]

export const getStream = (slug: string) => streams.find((stream) => stream.slug === slug)
