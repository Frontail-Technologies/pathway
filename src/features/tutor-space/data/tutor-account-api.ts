import { toLabels, toSlugs, type AccountVocabulary } from '@/features/taxonomy/data/account-terms'
import { DAYS, type Availability, type Day, type SlotId, type TutorNotificationSettings, type TutorProfileDraft } from './tutor-space'

type TermRef = { slug: string; label: string }
type ApiDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type VerificationStatus = 'draft' | 'pending_review' | 'changes_requested' | 'approved'

export type ApiTutorAccount = {
  email: string
  profile: { displayName: string; headline: string; intro: string; city: string | null; subjects: TermRef[]; exams: TermRef[]; levels: TermRef[]; languages: TermRef[]; modes: TermRef[] }
  availability: { day: ApiDay; slot: SlotId }[]
  settings: { acceptingStudents: boolean; notifications: TutorNotificationSettings }
  verification: { status: VerificationStatus; submittedAt: string | null; reviewedAt: string | null; reviewNote: string | null; canSubmit: boolean }
  checklist: { id: string; label: string; done: boolean }[]
  listing: { slug: string; status: 'draft' | 'published' | 'archived' } | null
}

const termFields = [
  ['subjects', 'tutorSubject'],
  ['exams', 'tutorExam'],
  ['levels', 'tutorLevel'],
  ['languages', 'tutorLanguage'],
  ['modes', 'tutorMode'],
] as const satisfies readonly (readonly [keyof TutorProfileDraft, AccountVocabulary])[]

const toApiDay = (day: Day) => day.toLowerCase() as ApiDay
const fromApiDay = (day: ApiDay) => DAYS.find((candidate) => candidate.toLowerCase() === day)!

export function profileFromApi(api: ApiTutorAccount): TutorProfileDraft {
  const { profile } = api
  return {
    name: profile.displayName,
    headline: profile.headline,
    intro: profile.intro,
    city: profile.city ?? '',
    subjects: toLabels('tutorSubject', profile.subjects),
    exams: toLabels('tutorExam', profile.exams),
    levels: toLabels('tutorLevel', profile.levels),
    languages: toLabels('tutorLanguage', profile.languages),
    modes: toLabels('tutorMode', profile.modes),
  }
}

export function availabilityFromApi(api: ApiTutorAccount): Availability {
  const grid = Object.fromEntries(DAYS.map((day) => [day, [] as SlotId[]])) as Availability
  for (const { day, slot } of api.availability) grid[fromApiDay(day)].push(slot)
  return grid
}

export class UnmappedTutorValueError extends Error {
  constructor(readonly values: string[]) {
    super(`These values can't be saved: ${values.join(', ')}`)
    this.name = 'UnmappedTutorValueError'
  }
}

export function profileToApi(draft: TutorProfileDraft) {
  const terms: Record<string, string[]> = {}
  const unmapped: string[] = []
  for (const [field, vocabulary] of termFields) {
    const result = toSlugs(vocabulary, draft[field] as string[])
    terms[field] = result.slugs
    unmapped.push(...result.unmapped)
  }
  if (unmapped.length) throw new UnmappedTutorValueError(unmapped)
  return { displayName: draft.name.trim(), headline: draft.headline.trim(), intro: draft.intro.trim(), city: draft.city.trim() || null, ...terms }
}

export const availabilityToApi = (availability: Availability) => ({
  slots: DAYS.flatMap((day) => availability[day].map((slot) => ({ day: toApiDay(day), slot }))),
})

export const checklistHref = (id: string) => (id === 'availability' ? '/tutor-dashboard/availability' : '/tutor-dashboard/profile')

export const verificationCopy: Record<VerificationStatus, { label: string; description: string }> = {
  draft: { label: 'Draft', description: 'Not visible to students yet. Complete your profile and submit it for review.' },
  pending_review: { label: 'In review', description: 'Pathway is reviewing your profile. Editing it now withdraws it from review.' },
  changes_requested: { label: 'Changes requested', description: 'Update your profile using the reviewer’s feedback, then submit it again.' },
  approved: { label: 'Approved', description: 'Your profile is approved. Editing it starts a new review; students keep seeing the approved version meanwhile.' },
}
