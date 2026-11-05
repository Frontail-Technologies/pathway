





export type PredictorExam = 'JEE Main' | 'JEE Advanced' | 'BITSAT' | 'WBJEE' | 'NEET UG' | 'CUET UG'
export type CourseId = 'engineering' | 'medical' | 'undergraduate'
export type ScoreType = 'Rank' | 'Percentile' | 'Score'
export type CollegeTypePreference = 'Government' | 'Private' | 'Either'
export type PriorityChoice = 'Better college' | 'Preferred branch' | 'Preferred location' | 'Balanced options'

export type ExamPerformance = { inputType: ScoreType; value: string }

export type CollegePredictorDraft = {
  course: CourseId | ''
  exams: PredictorExam[]
   
  performance: Partial<Record<PredictorExam, ExamPerformance>>
  category: string
  homeState: string
  gender: string
  counselling: string
  preferredStates: string[]
  preferredBranches: string[]
  collegeType: CollegeTypePreference
  priority: PriorityChoice | ''
}

export const emptyDraft: CollegePredictorDraft = {
  course: '',
  exams: [],
  performance: {},
  category: '',
  homeState: '',
  gender: '',
  counselling: '',
  preferredStates: [],
  preferredBranches: [],
  collegeType: 'Either',
  priority: '',
}

export type CourseOption = { id: CourseId; label: string; description: string; exams: PredictorExam[]; branches: string[] }

export const courseOptions: CourseOption[] = [
  { id: 'engineering', label: 'Engineering', description: 'B.Tech / B.E.', exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'WBJEE'], branches: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'] },
  { id: 'medical', label: 'Medical', description: 'MBBS', exams: ['NEET UG'], branches: ['MBBS'] },
  { id: 'undergraduate', label: 'Undergraduate Programs', description: 'Central university UG', exams: ['CUET UG'], branches: ['B.Com', 'B.Sc'] },
]

export function getCourse(id: CourseId | ''): CourseOption | undefined {
  return courseOptions.find((course) => course.id === id)
}

export function courseForExam(exam: PredictorExam): CourseOption {
  return courseOptions.find((course) => course.exams.includes(exam)) ?? courseOptions[0]
}

 
export const examFromSlug: Record<string, PredictorExam> = {
  'jee-main': 'JEE Main',
  'jee-advanced': 'JEE Advanced',
  bitsat: 'BITSAT',
  wbjee: 'WBJEE',
  neet: 'NEET UG',
  'neet-ug': 'NEET UG',
  cuet: 'CUET UG',
  'cuet-ug': 'CUET UG',
}

export const scoreTypes: ScoreType[] = ['Rank', 'Percentile', 'Score']
export const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS']
export const genders = ['Male', 'Female', 'Other']
export const counsellingOptions = ['JoSAA Counselling', 'MCC Counselling', 'State Counselling', 'University-level Admission']

export const homeStates = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

export const preferredStateOptions = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'West Bengal', 'Punjab']

export function getBranchOptions(course: CourseId | ''): string[] {
  return getCourse(course)?.branches ?? []
}

export const priorityOptions: PriorityChoice[] = ['Better college', 'Preferred branch', 'Preferred location', 'Balanced options']

export const defaultPerformance: ExamPerformance = { inputType: 'Rank', value: '' }

export type PredictorErrors = { course?: string; exams?: string; performance?: Partial<Record<PredictorExam, string>> }

export function validateCourseStep(draft: CollegePredictorDraft): PredictorErrors {
  const errors: PredictorErrors = {}
  if (!draft.course) errors.course = 'Choose what you plan to study.'
  else if (draft.exams.length === 0) errors.exams = 'Select at least one exam.'
  return errors
}


export function validatePerformanceValue(inputType: ScoreType, raw: string): string | undefined {
  const value = raw.trim()
  const label = inputType.toLowerCase()
  if (!value) return `Enter your ${label}.`
  const number = Number(value)
  if (!Number.isFinite(number)) return `Enter a valid number for your ${label}.`
  if (inputType === 'Rank' && (!Number.isInteger(number) || number < 1)) return 'Rank must be a whole number of 1 or more.'
  if (inputType === 'Percentile' && (number < 0 || number > 100)) return 'Percentile must be between 0 and 100.'
  if (inputType === 'Score' && number < 0) return 'Score cannot be negative.'
  return undefined
}

export function validatePerformanceStep(draft: CollegePredictorDraft): PredictorErrors {
  const performance: Partial<Record<PredictorExam, string>> = {}
  for (const exam of draft.exams) {
    const entry = draft.performance[exam] ?? defaultPerformance
    const error = validatePerformanceValue(entry.inputType, entry.value)
    if (error) performance[exam] = error
  }
  return Object.keys(performance).length > 0 ? { performance } : {}
}






export type PreviewBucket = { id: 'reach' | 'match' | 'safer'; title: string; description: string; slugs: string[] }

export const previewBuckets: PreviewBucket[] = [
  { id: 'reach', title: 'Higher Reach', description: 'Colleges that may be more competitive for your profile.', slugs: ['iit-delhi', 'iit-bombay'] },
  { id: 'match', title: 'Balanced Match', description: 'Colleges that may be a closer fit to your profile.', slugs: ['bits-pilani', 'vit-vellore'] },
  { id: 'safer', title: 'Safer Options', description: 'Colleges where your profile may be more comfortable.', slugs: ['manipal-university', 'chandigarh-university'] },
]

export const previewSlugs = previewBuckets.flatMap((bucket) => bucket.slugs)
