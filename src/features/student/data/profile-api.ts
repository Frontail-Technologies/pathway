import { courseNameFor, courseSlugFor, examShortNameFor, examSlugFor, toLabel, toLabels, toSlug, toSlugs } from '@/features/taxonomy/data/account-terms'
import type { StudentProfile, WorkExperienceType } from './student'

type TermRef = { slug: string; label: string }

export type ApiStudentProfile = {
  email: string
  firstName: string
  lastName: string
  phone: string | null
  city: { name: string; slug: string | null } | null
  studyLevel: TermRef | null
  stream: TermRef | null
  careerGoal: string | null
  education: { institution: string | null; graduationYear: number | null }
  workExperience: { organisation: string; role: string; type: string | null; start: string | null; end: string | null; description: string | null }[]
  preferences: { studyGoal: string | null; streams: TermRef[]; courses: { slug: string; name: string }[]; exams: TermRef[]; locations: { slug: string; name: string }[] }
  avatarAssetId: string | null
  avatarUrl: string | null
  completion: { completionPercent: number; missingFields: string[] }
  updatedAt: string
}

export class UnmappedValueError extends Error {
  constructor(readonly field: string, readonly values: string[]) {
    super(`These ${field} values can't be saved: ${values.join(', ')}`)
    this.name = 'UnmappedValueError'
  }
}

const orUndefined = <T,>(value: T | null | undefined) => value ?? undefined

export function fromApiProfile(api: ApiStudentProfile): StudentProfile {
  return {
    id: api.email,
    name: `${api.firstName} ${api.lastName}`.trim(),
    email: api.email,
    phone: orUndefined(api.phone),
    city: orUndefined(api.city?.name),
    studyLevel: orUndefined(toLabel('studyLevel', api.studyLevel?.slug, api.studyLevel?.label)),
    stream: orUndefined(toLabel('profileStream', api.stream?.slug, api.stream?.label)),
    careerGoal: orUndefined(api.careerGoal),
    studyGoal: orUndefined(toLabel('studyGoal', api.preferences.studyGoal)),
    preferredStreams: toLabels('preferenceStream', api.preferences.streams),
    preferredCourses: api.preferences.courses.map((course) => courseNameFor(course.slug, course.name)),
    preferredExams: api.preferences.exams.map((exam) => examShortNameFor(exam.slug, exam.label)),
    preferredLocations: api.preferences.locations.map((state) => toLabel('location', state.slug, state.name) ?? state.name),
    education: { institution: orUndefined(api.education.institution), graduationYear: orUndefined(api.education.graduationYear) },
    workExperience: api.workExperience.map((item, index) => ({
      id: `work-${index}`,
      organisation: item.organisation,
      role: item.role,
      type: (toLabel('workType', item.type) ?? undefined) as WorkExperienceType | undefined,
      start: orUndefined(item.start),
      end: orUndefined(item.end),
      description: orUndefined(item.description),
    })),
  }
}

function required(field: string, vocabulary: Parameters<typeof toSlug>[0], label: string | undefined) {
  if (!label) return null
  const slug = toSlug(vocabulary, label)
  if (!slug) throw new UnmappedValueError(field, [label])
  return slug
}

export function toProfilePatch(profile: StudentProfile) {
  const [firstName = '', ...rest] = profile.name.trim().split(/\s+/)
  return {
    firstName,
    lastName: rest.join(' ') || firstName,
    phone: profile.phone?.trim() || null,
    city: profile.city?.trim() || null,
    studyLevel: required('study level', 'studyLevel', profile.studyLevel),
    stream: required('stream', 'profileStream', profile.stream),
    careerGoal: profile.careerGoal?.trim() || null,
    education: { institution: profile.education?.institution?.trim() || null, graduationYear: profile.education?.graduationYear ?? null },
    workExperience: profile.workExperience.map((item) => ({
      organisation: item.organisation.trim(),
      role: item.role.trim(),
      type: item.type ? required('work experience type', 'workType', item.type) : null,
      start: item.start?.trim() || null,
      end: item.end?.trim() || null,
      description: item.description?.trim() || null,
    })),
  }
}

export function toPreferencesBody(profile: StudentProfile) {
  const streams = toSlugs('preferenceStream', profile.preferredStreams ?? [])
  const locations = toSlugs('location', profile.preferredLocations)
  const courses = profile.preferredCourses.map((name) => [name, courseSlugFor(name)] as const)
  const exams = profile.preferredExams.map((name) => [name, examSlugFor(name)] as const)
  const unmapped = [...streams.unmapped, ...locations.unmapped, ...courses.filter(([, slug]) => !slug).map(([name]) => name), ...exams.filter(([, slug]) => !slug).map(([name]) => name)]
  if (unmapped.length) throw new UnmappedValueError('preference', unmapped)
  return {
    studyGoal: required('study goal', 'studyGoal', profile.studyGoal),
    streams: streams.slugs,
    courses: courses.map(([, slug]) => slug!),
    exams: exams.map(([, slug]) => slug!),
    locations: locations.slugs,
  }
}
