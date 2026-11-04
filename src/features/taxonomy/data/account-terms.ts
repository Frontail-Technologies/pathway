import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'

type Pairs = readonly (readonly [label: string, slug: string])[]

export const accountVocabularies = {
  studyLevel: [
    ['Class 10', 'class-10'],
    ['Class 11', 'class-11'],
    ['Class 12', 'class-12'],
    ['Undergraduate', 'undergraduate'],
    ['Postgraduate', 'postgraduate'],
  ],
  profileStream: [
    ['Science (PCM)', 'science-pcm'],
    ['Science (PCB)', 'science-pcb'],
    ['Commerce', 'commerce'],
    ['Arts / Humanities', 'arts-humanities'],
    ['Engineering', 'engineering'],
    ['Medical', 'medical'],
    ['Management', 'management'],
    ['Design', 'design'],
  ],
  preferenceStream: [
    ['Engineering', 'engineering'],
    ['Medical', 'medical'],
    ['Commerce', 'commerce'],
    ['Science', 'science'],
    ['Management', 'management'],
    ['Design', 'design'],
    ['Law', 'law'],
    ['Arts / Humanities', 'arts-humanities'],
  ],
  studyGoal: [
    ['Undergraduate study', 'undergraduate_study'],
    ['Postgraduate study', 'postgraduate_study'],
    ['Entrance exam preparation', 'entrance_exam_preparation'],
    ['Explore career options', 'explore_career_options'],
    ['Still deciding', 'still_deciding'],
  ],
  location: [
    ['Delhi', 'delhi'],
    ['Maharashtra', 'maharashtra'],
    ['Karnataka', 'karnataka'],
    ['Tamil Nadu', 'tamil-nadu'],
    ['Rajasthan', 'rajasthan'],
    ['Uttar Pradesh', 'uttar-pradesh'],
    ['West Bengal', 'west-bengal'],
    ['Telangana', 'telangana'],
    ['Gujarat', 'gujarat'],
  ],
  workType: [
    ['Internship', 'internship'],
    ['Part-time', 'part_time'],
    ['Volunteer', 'volunteer'],
    ['Project / Practical Experience', 'project_practical'],
  ],
  tutorSubject: [
    ['Physics', 'physics'],
    ['Chemistry', 'chemistry'],
    ['Mathematics', 'mathematics'],
    ['Biology', 'biology'],
    ['English', 'english'],
    ['Computer Science', 'computer-science'],
  ],
  tutorExam: [
    ['JEE Main', 'jee-main'],
    ['JEE Advanced', 'jee-advanced'],
    ['NEET UG', 'neet-ug'],
    ['CUET UG', 'cuet-ug'],
    ['Board Exams', 'board-exams'],
  ],
  tutorLevel: [
    ['Class 6–8', 'class-6-8'],
    ['Class 9–10', 'class-9-10'],
    ['Class 11–12', 'class-11-12'],
    ['Undergraduate', 'undergraduate'],
  ],
  tutorLanguage: [
    ['English', 'english'],
    ['Hindi', 'hindi'],
    ['Bengali', 'bengali'],
    ['Tamil', 'tamil'],
  ],
  tutorMode: [
    ['Online', 'online'],
    ['In-person', 'in-person'],
  ],
} as const satisfies Record<string, Pairs>

export type AccountVocabulary = keyof typeof accountVocabularies

export function toSlug(vocabulary: AccountVocabulary, label: string | null | undefined): string | null {
  if (!label) return null
  return (accountVocabularies[vocabulary] as Pairs).find(([candidate]) => candidate === label)?.[1] ?? null
}

export function toLabel(vocabulary: AccountVocabulary, slug: string | null | undefined, serverLabel?: string): string | null {
  if (!slug) return null
  return (accountVocabularies[vocabulary] as Pairs).find(([, candidate]) => candidate === slug)?.[0] ?? serverLabel ?? null
}

export function toSlugs(vocabulary: AccountVocabulary, labels: readonly string[]) {
  const slugs: string[] = []
  const unmapped: string[] = []
  for (const label of labels) {
    const slug = toSlug(vocabulary, label)
    if (slug) slugs.push(slug)
    else unmapped.push(label)
  }
  return { slugs, unmapped }
}

export const toLabels = (vocabulary: AccountVocabulary, terms: readonly { slug: string; label?: string }[]) =>
  terms.map((term) => toLabel(vocabulary, term.slug, term.label)).filter((label): label is string => Boolean(label))

export const courseSlugFor = (name: string) => courses.find((course) => course.name === name)?.slug ?? null
export const courseNameFor = (slug: string, serverName?: string) => courses.find((course) => course.slug === slug)?.name ?? serverName ?? slug

export const examSlugFor = (shortName: string) => exams.find((exam) => exam.shortName === shortName)?.slug ?? null
export const examShortNameFor = (slug: string, serverLabel?: string) => exams.find((exam) => exam.slug === slug)?.shortName ?? serverLabel ?? slug
