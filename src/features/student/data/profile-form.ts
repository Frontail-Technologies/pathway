// Form-side helpers for STU-02 (My Profile): option lists, draft <-> profile mapping and validation.
// Frontend demo only — there is no backend; the shared profile lives in the Student Account provider.

import type { StudentProfile, WorkExperience, WorkExperienceType } from './student'

/** localStorage key for the NON-SENSITIVE demo profile. Never store passwords, tokens or security data here. */
export const STUDENT_PROFILE_STORAGE_KEY = 'pathway.studentProfile.demo.v1'

export const studyLevelOptions = ['Class 10', 'Class 11', 'Class 12', 'Undergraduate', 'Postgraduate']
export const streamOptions = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts / Humanities', 'Engineering', 'Medical', 'Management', 'Design']
export const careerGoalOptions = ['Software Engineering', 'Medicine', 'Business & Management', 'Design', 'Still exploring']
export const OTHER_GOAL = 'Other'
export const experienceTypeOptions: WorkExperienceType[] = ['Internship', 'Part-time', 'Volunteer', 'Project / Practical Experience']
/** A sensible fixed window (no clock dependency, so server and client agree). */
export const graduationYearOptions = Array.from({ length: 21 }, (_, index) => String(2015 + index))

export type ProfileDraft = {
  firstName: string
  lastName: string
  email: string
  city: string
  phone: string
  studyLevel: string
  institution: string
  stream: string
  graduationYear: string
  goalChoice: string
  goalOther: string
  experience: WorkExperience[]
}

export function toDraft(profile: StudentProfile): ProfileDraft {
  const [firstName, ...rest] = profile.name.trim().split(/\s+/)
  const goal = profile.careerGoal?.trim() ?? ''
  const isPreset = careerGoalOptions.includes(goal)
  return {
    firstName: firstName ?? '',
    lastName: rest.join(' '),
    email: profile.email,
    city: profile.city ?? '',
    phone: profile.phone ?? '',
    studyLevel: profile.studyLevel ?? '',
    institution: profile.education?.institution ?? '',
    stream: profile.stream ?? '',
    graduationYear: profile.education?.graduationYear ? String(profile.education.graduationYear) : '',
    goalChoice: !goal ? '' : isPreset ? goal : OTHER_GOAL,
    goalOther: !goal || isPreset ? '' : goal,
    experience: profile.workExperience.map((item) => ({ ...item })),
  }
}

/** Applies a validated draft onto the shared profile; preference fields are left untouched (STU-03 owns them). */
export function applyDraft(profile: StudentProfile, draft: ProfileDraft): StudentProfile {
  const goal = draft.goalChoice === OTHER_GOAL ? draft.goalOther.trim() : draft.goalChoice
  return {
    ...profile,
    name: `${draft.firstName.trim()} ${draft.lastName.trim()}`.trim(),
    email: draft.email.trim(),
    city: draft.city.trim() || undefined,
    phone: draft.phone.trim() || undefined,
    studyLevel: draft.studyLevel || undefined,
    stream: draft.stream || undefined,
    careerGoal: goal || undefined,
    education: {
      institution: draft.institution.trim() || undefined,
      graduationYear: draft.graduationYear ? Number(draft.graduationYear) : undefined,
    },
    workExperience: draft.experience.map((item) => ({
      ...item,
      organisation: item.organisation.trim(),
      role: item.role.trim(),
      start: item.start?.trim() || undefined,
      end: item.end?.trim() || undefined,
      description: item.description?.trim() || undefined,
    })),
  }
}

export type DraftErrors = Partial<Record<'firstName' | 'lastName' | 'email' | 'city' | 'phone' | 'goalOther', string>> & { experience?: Record<string, { organisation?: string; role?: string }> }

export function validateDraft(draft: ProfileDraft): DraftErrors {
  const errors: DraftErrors = {}
  if (!draft.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!draft.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) errors.email = 'Enter a valid email address.'
  if (!draft.city.trim()) errors.city = 'Enter your city.'
  if (draft.phone.trim() && !/^[+\d][\d\s-]{6,17}$/.test(draft.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (draft.goalChoice === OTHER_GOAL && !draft.goalOther.trim()) errors.goalOther = 'Describe your career goal.'
  const experience: NonNullable<DraftErrors['experience']> = {}
  draft.experience.forEach((item) => {
    const entry: { organisation?: string; role?: string } = {}
    if (!item.organisation.trim()) entry.organisation = 'Enter the organisation.'
    if (!item.role.trim()) entry.role = 'Enter your role.'
    if (entry.organisation || entry.role) experience[item.id] = entry
  })
  if (Object.keys(experience).length) errors.experience = experience
  return errors
}

export const hasErrors = (errors: DraftErrors) => Object.keys(errors).length > 0

/** Cheap shape check for data read back from localStorage. */
export function isStoredProfile(value: unknown): value is StudentProfile {
  const v = value as Partial<StudentProfile> | null
  return !!v && typeof v.name === 'string' && typeof v.email === 'string' && Array.isArray(v.preferredCourses) && Array.isArray(v.preferredExams) && Array.isArray(v.preferredLocations) && Array.isArray(v.workExperience)
}
