import { filterGroups, getTutorBySlug, type Tutor } from '@/features/tutors/data/tutors'

/**
 * Tutor Space: the signed-in area where a tutor manages their Pathway
 * presence. Frontend demo only: everything is stored on this device and the
 * demo account is the existing public tutor "Arjun Sharma", so links to the
 * public profile resolve.
 */
export const TUTOR_AUTH_STORAGE_KEY = 'pathway.tutorAuth.demo.v1'
export const TUTOR_SPACE_STORAGE_KEY = 'pathway.tutorSpace.demo.v1'

export const DEMO_TUTOR_SLUG = 'arjun-sharma'
export const demoTutor: Tutor = getTutorBySlug(DEMO_TUTOR_SLUG)!

const optionsFor = (key: (typeof filterGroups)[number]['key']) => filterGroups.find((group) => group.key === key)!.options
export const subjectOptions = optionsFor('subjects')
export const examOptions = optionsFor('exams')
export const modeOptions = optionsFor('modes')
export const levelOptions = optionsFor('levels')
export const languageOptions = optionsFor('languages')

export type TutorProfileDraft = {
  name: string
  headline: string
  intro: string
  city: string
  subjects: string[]
  exams: string[]
  levels: string[]
  languages: string[]
  modes: string[]
}

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
export const SLOTS = [
  { id: 'morning', label: 'Morning', time: '8–12' },
  { id: 'afternoon', label: 'Afternoon', time: '12–5' },
  { id: 'evening', label: 'Evening', time: '5–9' },
] as const
export type Day = (typeof DAYS)[number]
export type SlotId = (typeof SLOTS)[number]['id']
export type Availability = Record<Day, SlotId[]>

export type RequestStatus = 'new' | 'accepted' | 'declined'
export type SessionRequest = {
  id: string
  student: string
  subject: string
  level: string
  mode: string
  preferredTime: string
  message: string
  receivedOn: string
  status: RequestStatus
}

export type TutorNotificationSettings = { newRequests: boolean; weeklySummary: boolean; productUpdates: boolean }

export type TutorSpaceState = {
  profile: TutorProfileDraft
  availability: Availability
  acceptingStudents: boolean
  requests: SessionRequest[]
  notifications: TutorNotificationSettings
}

export const initialTutorSpace: TutorSpaceState = {
  profile: {
    name: demoTutor.name,
    headline: demoTutor.headline,
    intro: demoTutor.intro,
    city: 'New Delhi',
    subjects: [...demoTutor.subjects],
    exams: [...demoTutor.exams],
    levels: [...demoTutor.studyLevels],
    languages: [...demoTutor.languages],
    modes: [...demoTutor.modes],
  },
  availability: { Mon: ['evening'], Tue: ['evening'], Wed: [], Thu: ['evening'], Fri: [], Sat: ['morning', 'afternoon'], Sun: ['morning'] },
  acceptingStudents: true,
  // Sample data so the screens can be reviewed; public session requests are not live yet.
  requests: [
    { id: 'r1', student: 'Riya S.', subject: 'Physics', level: 'Class 11–12', mode: 'Online', preferredTime: 'Weekday evenings', message: 'Struggling with rotational motion. Looking for 2 sessions a week before JEE Main.', receivedOn: '30 Oct 2026', status: 'new' },
    { id: 'r2', student: 'Kabir M.', subject: 'Mathematics', level: 'Class 11–12', mode: 'In-person', preferredTime: 'Saturday mornings', message: 'Need help with calculus basics and regular practice tests.', receivedOn: '28 Oct 2026', status: 'new' },
    { id: 'r3', student: 'Ananya P.', subject: 'Physics', level: 'Class 11–12', mode: 'Online', preferredTime: 'Sunday mornings', message: 'NEET aspirant, want weekly doubt-solving for mechanics.', receivedOn: '24 Oct 2026', status: 'accepted' },
    { id: 'r4', student: 'Dev R.', subject: 'Mathematics', level: 'Class 9–10', mode: 'In-person', preferredTime: 'Weekday afternoons', message: 'Board exam preparation for Class 10.', receivedOn: '20 Oct 2026', status: 'declined' },
  ],
  notifications: { newRequests: true, weeklySummary: true, productUpdates: false },
}

/** Profile items that count toward completion, with where to fix each. */
export function profileChecklist(state: TutorSpaceState) {
  const { profile } = state
  const weeklySlots = Object.values(state.availability).reduce((sum, slots) => sum + slots.length, 0)
  return [
    { id: 'headline', label: 'Headline', done: profile.headline.trim().length >= 10, href: '/tutor-dashboard/profile' },
    { id: 'intro', label: 'About you (40+ characters)', done: profile.intro.trim().length >= 40, href: '/tutor-dashboard/profile' },
    { id: 'subjects', label: 'Subjects', done: profile.subjects.length > 0, href: '/tutor-dashboard/profile' },
    { id: 'levels', label: 'Class levels', done: profile.levels.length > 0, href: '/tutor-dashboard/profile' },
    { id: 'modes', label: 'Teaching mode', done: profile.modes.length > 0, href: '/tutor-dashboard/profile' },
    { id: 'languages', label: 'Languages', done: profile.languages.length > 0, href: '/tutor-dashboard/profile' },
    { id: 'availability', label: 'Weekly availability', done: weeklySlots > 0, href: '/tutor-dashboard/availability' },
  ]
}

/** The draft rendered the way students see it in listings (for the live preview). */
export function previewTutor(profile: TutorProfileDraft): Tutor {
  return {
    ...demoTutor,
    name: profile.name || demoTutor.name,
    headline: profile.headline || 'Your headline',
    intro: profile.intro,
    subjects: profile.subjects as Tutor['subjects'],
    exams: profile.exams as Tutor['exams'],
    studyLevels: profile.levels as Tutor['studyLevels'],
    languages: profile.languages as Tutor['languages'],
    modes: profile.modes as Tutor['modes'],
  }
}

export function isStoredTutorSpace(value: unknown): value is TutorSpaceState {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<TutorSpaceState>
  return !!v.profile && !!v.availability && Array.isArray(v.requests) && !!v.notifications && typeof v.acceptingStudents === 'boolean'
}
