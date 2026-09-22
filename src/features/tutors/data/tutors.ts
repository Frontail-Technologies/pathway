// UI-phase fixtures for INDIVIDUAL tutors only (TUT-01 listing + TUT-02 detail share this one source).
// Coaching institutes/academies live in `features/coaching` and must never appear here.
// All people below are fictional demo records. Deliberately no ratings, review counts, prices, years of
// experience, students taught, credentials or success claims — none of that is backed by data yet.

export type TutorSubject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'English' | 'Computer Science'
export type TutorExam = 'JEE Main' | 'JEE Advanced' | 'NEET UG' | 'CUET UG' | 'Board Exams'
export type TutorMode = 'Online' | 'In-person'
export type TutorLevel = 'Class 6–8' | 'Class 9–10' | 'Class 11–12' | 'Undergraduate'
export type TutorLanguage = 'English' | 'Hindi' | 'Bengali' | 'Tamil'

/** Colours for the fallback illustrated bust, used only when `portrait` is not set. */
export type TutorAvatarSpec = { skin: string; hair: string; shirt: string; style: 'short' | 'long' | 'bun'; glasses?: boolean }

export type TutorDetail = {
  longBio: string
  /** Three short teaching traits drawn from the bio — no metrics or guarantees. */
  traits: string[]
  /** Student profiles this tutor supports — fixture-backed. */
  whoHelps: string[]
}

export type Tutor = {
  id: string
  slug: string
  name: string
  /** Local portrait under `public/tutors/` (e.g. `/tutors/arjun-sharma.jpg`, 4:5, neutral background). Optional until assets are added; the illustrated `avatar` is the fallback. */
  portrait?: string
  avatar: TutorAvatarSpec
  /** e.g. "Physics tutor for JEE & NEET" */
  headline: string
  subjects: TutorSubject[]
  exams: TutorExam[]
  studyLevels: TutorLevel[]
  languages: TutorLanguage[]
  modes: TutorMode[]
  /** One line, never a result/rank/guarantee claim. */
  intro: string
  featured: boolean
  hasDetailPage: boolean
  detail?: TutorDetail
}

export const teachingSteps = [
  { title: 'Understand your current level', text: 'Sessions start by finding where you are strong and where concepts need work.' },
  { title: 'Build the concepts', text: 'Topics are explained step by step before moving on to harder problems.' },
  { title: 'Practise and review', text: 'Guided practice with feedback on mistakes so they are not repeated.' },
  { title: 'Track progress together', text: 'Regular check-ins on what has improved and what to focus on next.' },
] as const

export const tutors: Tutor[] = [
  {
    id: 't1', slug: 'arjun-sharma', name: 'Arjun Sharma', avatar: { skin: '#e0b088', hair: '#2b2118', shirt: '#3b6fd6', style: 'short', glasses: true },
    headline: 'Physics tutor for JEE & NEET', subjects: ['Physics', 'Mathematics'], exams: ['JEE Main', 'JEE Advanced', 'NEET UG'], studyLevels: ['Class 11–12'], languages: ['English', 'Hindi'], modes: ['Online', 'In-person'],
    intro: 'Concept-first Physics teaching with regular problem-solving practice.', featured: true, hasDetailPage: true,
    detail: {
      traits: ['Concept-first teaching', 'Structured practice', 'Regular revision support'],
      longBio: 'Arjun teaches Physics with a focus on building clear concepts before moving to problem solving. Sessions are structured around the student’s current level and the exam they are preparing for, with regular revision built in.',
      whoHelps: ['Class 11–12 students strengthening Physics concepts', 'Entrance exam preparation for JEE and NEET', 'Students who want regular doubt-solving and revision support'],
    },
  },
  {
    id: 't2', slug: 'priya-mehta', name: 'Priya Mehta', avatar: { skin: '#c98f68', hair: '#1c1512', shirt: '#e2703a', style: 'long' },
    headline: 'Mathematics tutor for JEE & CUET', subjects: ['Mathematics'], exams: ['JEE Main', 'CUET UG', 'Board Exams'], studyLevels: ['Class 9–10', 'Class 11–12'], languages: ['English', 'Hindi'], modes: ['Online'],
    intro: 'Clear, step-by-step Mathematics for school and entrance preparation.', featured: true, hasDetailPage: true,
    detail: {
      traits: ['Step-by-step problem solving', 'Pace adjusted to the student', 'School and entrance support'],
      longBio: 'Priya helps students build confidence in Mathematics by breaking problems into clear steps. She works with school students and entrance-exam aspirants, adjusting the pace to each learner.',
      whoHelps: ['Class 9–12 students who want stronger fundamentals', 'JEE Main and CUET UG aspirants', 'Board exam revision support'],
    },
  },
  {
    id: 't3', slug: 'rohan-verma', name: 'Rohan Verma', avatar: { skin: '#d9a47c', hair: '#3a2a1e', shirt: '#2f9e6e', style: 'short' },
    headline: 'Chemistry tutor for JEE & NEET', subjects: ['Chemistry'], exams: ['JEE Main', 'NEET UG'], studyLevels: ['Class 11–12'], languages: ['English', 'Hindi'], modes: ['Online', 'In-person'],
    intro: 'Organised Chemistry preparation with a focus on understanding over memorising.', featured: true, hasDetailPage: true,
    detail: {
      traits: ['Understanding over memorising', 'Guided practice', 'Revision support'],
      longBio: 'Rohan teaches Chemistry with an emphasis on understanding reactions and concepts rather than memorising. Sessions combine explanation, practice and revision for students preparing for JEE and NEET.',
      whoHelps: ['Class 11–12 students preparing for JEE or NEET', 'Students who find Chemistry hard to remember', 'Concept strengthening and revision support'],
    },
  },
  {
    id: 't4', slug: 'sneha-iyer', name: 'Sneha Iyer', avatar: { skin: '#b9825c', hair: '#171210', shirt: '#7b5bd6', style: 'bun' },
    headline: 'Biology tutor for NEET & Boards', subjects: ['Biology'], exams: ['NEET UG', 'Board Exams'], studyLevels: ['Class 9–10', 'Class 11–12'], languages: ['English', 'Hindi', 'Tamil'], modes: ['Online'],
    intro: 'Diagram-friendly Biology teaching for NEET and board preparation.', featured: false, hasDetailPage: true,
    detail: {
      traits: ['Diagram-based explanations', 'Simple, memorable teaching', 'Board and NEET focus'],
      longBio: 'Sneha teaches Biology using diagrams and simple explanations so that topics stay memorable. She supports both board exam preparation and NEET aspirants.',
      whoHelps: ['Class 9–12 Biology students', 'NEET UG aspirants', 'Students revising for board exams'],
    },
  },
  { id: 't5', slug: 'kabir-nair', name: 'Kabir Nair', avatar: { skin: '#dcae86', hair: '#4a3626', shirt: '#c9484f', style: 'short' }, headline: 'English tutor for school & CUET', subjects: ['English'], exams: ['CUET UG', 'Board Exams'], studyLevels: ['Class 6–8', 'Class 9–10', 'Class 11–12'], languages: ['English'], modes: ['Online'], intro: 'Reading, writing and comprehension support for school and CUET preparation.', featured: false, hasDetailPage: false },
  { id: 't6', slug: 'ananya-das', name: 'Ananya Das', avatar: { skin: '#d3996f', hair: '#1f1a17', shirt: '#0f8fa8', style: 'long', glasses: true }, headline: 'Computer Science & Mathematics tutor', subjects: ['Computer Science', 'Mathematics'], exams: ['Board Exams'], studyLevels: ['Class 9–10', 'Class 11–12', 'Undergraduate'], languages: ['English', 'Bengali'], modes: ['Online'], intro: 'Programming basics and problem solving for school and first-year students.', featured: false, hasDetailPage: false },
  { id: 't7', slug: 'imran-khan', name: 'Imran Khan', avatar: { skin: '#c48a62', hair: '#241b15', shirt: '#4b5a72', style: 'short' }, headline: 'Maths & Physics tutor for school students', subjects: ['Mathematics', 'Physics'], exams: ['Board Exams'], studyLevels: ['Class 6–8', 'Class 9–10'], languages: ['Hindi', 'English'], modes: ['In-person'], intro: 'Patient foundation building in Maths and Physics for younger students.', featured: false, hasDetailPage: false },
  { id: 't8', slug: 'meera-joshi', name: 'Meera Joshi', avatar: { skin: '#e3b791', hair: '#3b2b21', shirt: '#d1832f', style: 'bun' }, headline: 'Chemistry & Biology tutor for NEET', subjects: ['Chemistry', 'Biology'], exams: ['NEET UG'], studyLevels: ['Class 11–12'], languages: ['English', 'Hindi'], modes: ['Online', 'In-person'], intro: 'Combined Chemistry and Biology support for NEET preparation.', featured: false, hasDetailPage: false },
  { id: 't9', slug: 'vikram-rao', name: 'Vikram Rao', avatar: { skin: '#cf9a72', hair: '#1a1412', shirt: '#2d4f9e', style: 'short', glasses: true }, headline: 'Physics tutor for JEE aspirants', subjects: ['Physics'], exams: ['JEE Advanced', 'JEE Main'], studyLevels: ['Class 11–12'], languages: ['English'], modes: ['Online'], intro: 'Problem-solving focused Physics sessions for JEE preparation.', featured: false, hasDetailPage: false },
  { id: 't10', slug: 'tanvi-bose', name: 'Tanvi Bose', avatar: { skin: '#dba985', hair: '#2a1f19', shirt: '#b5467a', style: 'long' }, headline: 'English tutor for boards & CUET', subjects: ['English'], exams: ['Board Exams', 'CUET UG'], studyLevels: ['Class 9–10', 'Class 11–12'], languages: ['Bengali', 'English'], modes: ['Online'], intro: 'Grammar, writing and literature support for board and CUET preparation.', featured: false, hasDetailPage: false },
]

export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutors.find((tutor) => tutor.slug === slug && tutor.hasDetailPage && tutor.detail)
}

/** Related by shared subjects (heaviest), then study levels, then languages; excludes the current tutor. */
export function getRelatedTutors(tutor: Tutor, limit = 3): Tutor[] {
  const overlap = (a: readonly string[], b: readonly string[]) => a.filter((item) => b.includes(item)).length
  const score = (other: Tutor) => overlap(other.subjects, tutor.subjects) * 4 + overlap(other.studyLevels, tutor.studyLevels) * 2 + overlap(other.languages, tutor.languages)
  return tutors
    .filter((other) => other.id !== tutor.id && score(other) > 0)
    .sort((a, b) => score(b) - score(a) || Number(b.hasDetailPage) - Number(a.hasDetailPage))
    .slice(0, limit)
}

// --- Filters / sort / search ------------------------------------------------------
export type FilterKey = 'subjects' | 'exams' | 'modes' | 'levels' | 'languages'
export type FilterState = Record<FilterKey, string[]>
export const emptyFilters: FilterState = { subjects: [], exams: [], modes: [], levels: [], languages: [] }

export const filterGroups: { key: FilterKey; param: string; title: string; options: readonly string[] }[] = [
  { key: 'subjects', param: 'subject', title: 'Subject', options: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science'] },
  { key: 'exams', param: 'exam', title: 'Exam / Preparation', options: ['JEE Main', 'JEE Advanced', 'NEET UG', 'CUET UG', 'Board Exams'] },
  { key: 'modes', param: 'mode', title: 'Learning Mode', options: ['Online', 'In-person'] },
  { key: 'levels', param: 'level', title: 'Class / Study Level', options: ['Class 6–8', 'Class 9–10', 'Class 11–12', 'Undergraduate'] },
  { key: 'languages', param: 'lang', title: 'Language', options: ['English', 'Hindi', 'Bengali', 'Tamil'] },
]

const recordField: Record<FilterKey, (tutor: Tutor) => readonly string[]> = {
  subjects: (t) => t.subjects,
  exams: (t) => t.exams,
  modes: (t) => t.modes,
  levels: (t) => t.studyLevels,
  languages: (t) => t.languages,
}

export type SortValue = 'featured' | 'name'
export const sortOptions: { value: SortValue; label: string }[] = [
  { value: 'featured', label: 'Featured First' },
  { value: 'name', label: 'Name A–Z' },
]

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** URL convention (same family as the other listings): `q`, comma-separated slug params, default sort omitted, invalid values dropped. */
export function serializeTutorFilters(filters: FilterState, sort: SortValue, query: string): string {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  filterGroups.forEach((group) => {
    if (filters[group.key].length) params.set(group.param, filters[group.key].map(slugify).join(','))
  })
  if (sort !== 'featured') params.set('sort', sort)
  return params.toString()
}

export function parseTutorFilters(searchParams: URLSearchParams): FilterState {
  const result: FilterState = { subjects: [], exams: [], modes: [], levels: [], languages: [] }
  filterGroups.forEach((group) => {
    const raw = searchParams.get(group.param)
    if (!raw) return
    result[group.key] = raw.split(',').map((slug) => group.options.find((option) => slugify(option) === slug)).filter((value): value is string => !!value)
  })
  return result
}

export const parseTutorSort = (searchParams: URLSearchParams): SortValue => sortOptions.find((option) => option.value === searchParams.get('sort'))?.value ?? 'featured'
export const parseTutorSearch = (searchParams: URLSearchParams) => searchParams.get('q') ?? ''
export const countActiveFilters = (filters: FilterState) => Object.values(filters).reduce((total, values) => total + values.length, 0)

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Searches tutor name, headline, subjects and exams (e.g. "physics", "neet", "arjun"). */
export function matchesSearch(tutor: Tutor, query: string) {
  const terms = normalize(query).split(' ').filter(Boolean)
  if (terms.length === 0) return true
  const haystack = normalize([tutor.name, tutor.headline, ...tutor.subjects, ...tutor.exams].join(' '))
  return terms.every((term) => haystack.includes(term))
}

/** OR within a group, AND across groups. */
export function matchesFilters(tutor: Tutor, filters: FilterState) {
  return (Object.keys(filters) as FilterKey[]).every((key) => filters[key].length === 0 || filters[key].some((value) => recordField[key](tutor).includes(value)))
}

export function sortTutors(list: Tutor[], sort: SortValue): Tutor[] {
  const indexed = list.map((tutor, index) => ({ tutor, index }))
  indexed.sort((a, b) => (sort === 'name' ? a.tutor.name.localeCompare(b.tutor.name) : Number(b.tutor.featured) - Number(a.tutor.featured) || a.index - b.index))
  return indexed.map(({ tutor }) => tutor)
}
