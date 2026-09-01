export type Degree = 'B.Tech' | 'M.Tech' | 'B.Sc' | 'M.Sc' | 'B.E.' | 'M.E.' | 'B.Pharm'

/** Degrees each mock college genuinely offers — no impossible generic combinations. */
export const collegeDegrees: Record<string, Degree[]> = {
  'iit-delhi': ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
  'iit-bombay': ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
  'iit-madras': ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
  'iit-kanpur': ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
  'bits-pilani': ['B.E.', 'M.E.', 'B.Pharm', 'M.Sc'],
  'vit-vellore': ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
}

/** Courses available once a Degree is selected — the Course select stays disabled until then. */
export const coursesByDegree: Record<Degree, string[]> = {
  'B.Tech': ['Computer Science & Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  'M.Tech': ['Computer Science & Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
  'B.Sc': ['Physics', 'Chemistry', 'Mathematics'],
  'M.Sc': ['Physics', 'Chemistry', 'Mathematics'],
  'B.E.': ['Computer Science', 'Electronics & Communication', 'Mechanical Engineering'],
  'M.E.': ['Computer Science', 'Electronics & Communication'],
  'B.Pharm': ['Pharmaceutics', 'Pharmacology'],
}

type DegreeDefaults = { level: string; duration: string; studyMode: string; eligibility: string; tier: 'ug' | 'pg' }

const degreeDefaults: Record<Degree, DegreeDefaults> = {
  'B.Tech': { level: 'Undergraduate', duration: '4 Years', studyMode: 'Full-time', eligibility: '10+2 with PCM', tier: 'ug' },
  'M.Tech': { level: 'Postgraduate', duration: '2 Years', studyMode: 'Full-time', eligibility: 'B.Tech/B.E. in relevant discipline', tier: 'pg' },
  'B.Sc': { level: 'Undergraduate', duration: '3 Years', studyMode: 'Full-time', eligibility: '10+2 with Science', tier: 'ug' },
  'M.Sc': { level: 'Postgraduate', duration: '2 Years', studyMode: 'Full-time', eligibility: 'B.Sc in relevant discipline', tier: 'pg' },
  'B.E.': { level: 'Undergraduate', duration: '4 Years', studyMode: 'Full-time', eligibility: '10+2 with PCM', tier: 'ug' },
  'M.E.': { level: 'Postgraduate', duration: '2 Years', studyMode: 'Full-time', eligibility: 'B.E./B.Tech in relevant discipline', tier: 'pg' },
  'B.Pharm': { level: 'Undergraduate', duration: '4 Years', studyMode: 'Full-time', eligibility: '10+2 with PCB/PCM', tier: 'ug' },
}

type ExamProfile = { ugExam: string; ugRoute: string; pgExam: string; pgRoute: string }

const collegeExamProfile: Record<string, ExamProfile> = {
  'iit-delhi': { ugExam: 'JEE Advanced', ugRoute: 'JoSAA Counselling', pgExam: 'GATE', pgRoute: 'CCMT Counselling' },
  'iit-bombay': { ugExam: 'JEE Advanced', ugRoute: 'JoSAA Counselling', pgExam: 'GATE', pgRoute: 'CCMT Counselling' },
  'iit-madras': { ugExam: 'JEE Advanced', ugRoute: 'JoSAA Counselling', pgExam: 'GATE', pgRoute: 'CCMT Counselling' },
  'iit-kanpur': { ugExam: 'JEE Advanced', ugRoute: 'JoSAA Counselling', pgExam: 'GATE', pgRoute: 'CCMT Counselling' },
  'bits-pilani': { ugExam: 'BITSAT', ugRoute: 'BITSAT Score-based', pgExam: 'GATE / BITS HD Test', pgRoute: 'BITS HD Counselling' },
  'vit-vellore': { ugExam: 'VITEEE', ugRoute: 'VITEEE Score-based', pgExam: 'VITMEE', pgRoute: 'VITMEE Counselling' },
}

/** Approximate per-year tuition (in Lakh) by degree tier — a mock, college-specific rate, not authoritative pricing. */
const collegeTuitionLakh: Record<string, { ug: number; pg: number }> = {
  'iit-delhi': { ug: 2.2, pg: 1.4 },
  'iit-bombay': { ug: 2.3, pg: 1.5 },
  'iit-madras': { ug: 2.1, pg: 1.3 },
  'iit-kanpur': { ug: 2.2, pg: 1.4 },
  'bits-pilani': { ug: 5.2, pg: 3.0 },
  'vit-vellore': { ug: 4.8, pg: 2.8 },
}

export type ProgramSnapshot = {
  degree: Degree
  course: string
  courseLevel: string
  duration: string
  studyMode: string
  entranceExam: string
  eligibility: string
  admissionRoute: string
  tuition: string
}

/** Composes the course-dependent comparison fields for a college + degree + course selection from small typed lookup tables — still local mock data, no backend. */
export function getProgramSnapshot(collegeSlug: string, degree: Degree, course: string): ProgramSnapshot {
  const defaults = degreeDefaults[degree]
  const examProfile = collegeExamProfile[collegeSlug]
  const tuitionRates = collegeTuitionLakh[collegeSlug]
  const tuitionLakh = defaults.tier === 'ug' ? tuitionRates.ug : tuitionRates.pg

  return {
    degree,
    course,
    courseLevel: defaults.level,
    duration: defaults.duration,
    studyMode: defaults.studyMode,
    eligibility: defaults.eligibility,
    entranceExam: defaults.tier === 'ug' ? examProfile.ugExam : examProfile.pgExam,
    admissionRoute: defaults.tier === 'ug' ? examProfile.ugRoute : examProfile.pgRoute,
    tuition: `₹${tuitionLakh}L / year`,
  }
}

const degreeSlugs: Record<Degree, string> = {
  'B.Tech': 'btech',
  'M.Tech': 'mtech',
  'B.Sc': 'bsc',
  'M.Sc': 'msc',
  'B.E.': 'be',
  'M.E.': 'me',
  'B.Pharm': 'bpharm',
}

const degreeSlugsReverse: Record<string, Degree> = Object.fromEntries(Object.entries(degreeSlugs).map(([degree, slug]) => [slug, degree as Degree])) as Record<
  string,
  Degree
>

const courseSlugs: Record<string, string> = {
  'Computer Science & Engineering': 'cse',
  'Electrical Engineering': 'ee',
  'Mechanical Engineering': 'mech-engg',
  'Civil Engineering': 'ce',
  Physics: 'physics',
  Chemistry: 'chemistry',
  Mathematics: 'maths',
  'Computer Science': 'cs',
  'Electronics & Communication': 'ece',
  Pharmaceutics: 'pharmaceutics',
  Pharmacology: 'pharmacology',
}

const courseSlugsReverse: Record<string, string> = Object.fromEntries(Object.entries(courseSlugs).map(([course, slug]) => [slug, course]))

/** Default degree/course per college — used for the default comparison view and whenever a URL program slug is missing/invalid for that slot. */
export const defaultPrograms: Record<string, { degree: Degree; course: string }> = {
  'iit-delhi': { degree: 'B.Tech', course: 'Computer Science & Engineering' },
  'iit-bombay': { degree: 'B.Tech', course: 'Computer Science & Engineering' },
  'iit-madras': { degree: 'B.Tech', course: 'Electrical Engineering' },
  'iit-kanpur': { degree: 'B.Tech', course: 'Mechanical Engineering' },
  'bits-pilani': { degree: 'B.E.', course: 'Computer Science' },
  'vit-vellore': { degree: 'B.Tech', course: 'Computer Science & Engineering' },
}

export function serializeProgramSlug(degree: Degree, course: string): string {
  const degreeSlug = degreeSlugs[degree]
  const courseSlug = courseSlugs[course]
  return `${degreeSlug}-${courseSlug}`
}

/** Parses one `programs=` slug for a given college — falls back to that college's default program on any invalid/missing/impossible combination. */
export function parseProgramSlug(collegeSlug: string, slug: string | undefined): { degree: Degree; course: string } {
  const fallback = defaultPrograms[collegeSlug]
  if (!slug) return fallback

  const degreeSlug = Object.keys(degreeSlugsReverse).find((candidate) => slug === candidate || slug.startsWith(`${candidate}-`))
  if (!degreeSlug) return fallback
  const degree = degreeSlugsReverse[degreeSlug]

  const courseSlug = slug.slice(degreeSlug.length + 1)
  const course = courseSlugsReverse[courseSlug]
  if (!course) return fallback

  // Guard against an impossible combination (e.g. a course slug valid elsewhere but not offered under this degree, or a degree this college doesn't actually offer).
  if (!collegeDegrees[collegeSlug]?.includes(degree)) return fallback
  if (!coursesByDegree[degree].includes(course)) return fallback

  return { degree, course }
}
