import { cache } from 'react'
import { Briefcase, Calculator, Compass, Cpu, FlaskConical, Scale, Stethoscope, type LucideIcon } from 'lucide-react'
import { streamOptions as courseStreams } from '@/features/courses/data/filters'
import { studyAreaOptions } from '@/features/exams/data/exams'
import { streamOptions as scholarshipStreams } from '@/features/scholarships/data/filters'
import { catalogGet } from '@/services/api/catalog'
import type { StreamDefinition, StreamSlug } from '../data/stream-taxonomy'

export type StreamDto = {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  degreeLabels: string[]
  exams: { slug: string; label: string }[]
  counts: { courses: number; exams: number; colleges: number; scholarships: number }
}

const icons: Record<string, LucideIcon> = { cpu: Cpu, briefcase: Briefcase, stethoscope: Stethoscope, scale: Scale, 'flask-conical': FlaskConical, flask: FlaskConical, calculator: Calculator }

export const streamIcon = (key: string): LucideIcon => icons[key] ?? Compass

const pick = <T extends string>(options: readonly T[], name: string) => options.find((option) => option.toLowerCase() === name.toLowerCase())

export function toStreamDefinition(dto: StreamDto): StreamDefinition {
  return {
    slug: dto.slug as StreamSlug,
    name: dto.name,
    icon: streamIcon(dto.icon),
    tagline: dto.tagline,
    description: dto.description,
    courseStream: pick(courseStreams, dto.name),
    studyArea: pick(studyAreaOptions, dto.name) as StreamDefinition['studyArea'],
    collegeDegrees: dto.degreeLabels,
    scholarshipStream: pick(scholarshipStreams, dto.name),
    examKeywords: dto.exams.map((exam) => exam.label),
  }
}

export const listStreamDtos = cache(async (): Promise<StreamDto[]> => catalogGet<StreamDto[]>('/streams').catch(() => []))

export const listStreams = cache(async (): Promise<StreamDefinition[]> => (await listStreamDtos()).map(toStreamDefinition))

export const getStreamDefinition = cache(async (slug: string): Promise<StreamDefinition | undefined> => (await listStreams()).find((stream) => stream.slug === slug))
