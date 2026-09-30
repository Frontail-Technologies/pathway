



 
export type StudentEducation = {
  institution?: string
  graduationYear?: number
}

export type WorkExperienceType = 'Internship' | 'Part-time' | 'Volunteer' | 'Project / Practical Experience'

export type WorkExperience = {
  id: string
  organisation: string
  role: string
  type?: WorkExperienceType
   
  start?: string
  end?: string
  description?: string
}

export type StudentProfile = {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  studyLevel?: string
  stream?: string
  studyGoal?: string
  careerGoal?: string
   
  preferredStreams?: string[]
  preferredCourses: string[]
  preferredExams: string[]
  preferredLocations: string[]
  education?: StudentEducation
  workExperience: WorkExperience[]
}

export const demoStudent: StudentProfile = {
  id: 'demo-student',
  name: 'Aarav Sharma',
  email: 'aarav.demo@example.com',
  city: 'Pune',
  studyLevel: 'Class 12',
  stream: 'Science (PCM)',
  studyGoal: 'Undergraduate study',
  preferredStreams: ['Engineering'],
  preferredCourses: ['B.Tech Computer Science'],
  preferredExams: ['JEE Main'],
  preferredLocations: [],
  education: { graduationYear: 2026 },
  workExperience: [],
}


export type ProfileFieldKey = 'name' | 'email' | 'phone' | 'city' | 'studyLevel' | 'stream' | 'graduationYear' | 'preferredCourse' | 'preferredExam' | 'preferredLocation' | 'careerGoal'

 
export const profileFields: { key: ProfileFieldKey; label: string; isFilled: (profile: StudentProfile) => boolean }[] = [
  { key: 'name', label: 'Name', isFilled: (p) => !!p.name.trim() },
  { key: 'email', label: 'Email', isFilled: (p) => !!p.email.trim() },
  { key: 'phone', label: 'Phone number', isFilled: (p) => !!p.phone?.trim() },
  { key: 'city', label: 'City', isFilled: (p) => !!p.city?.trim() },
  { key: 'studyLevel', label: 'Study level', isFilled: (p) => !!p.studyLevel?.trim() },
  { key: 'stream', label: 'Stream', isFilled: (p) => !!p.stream?.trim() },
  { key: 'graduationYear', label: 'Graduation / passing year', isFilled: (p) => !!p.education?.graduationYear },
  { key: 'preferredCourse', label: 'Preferred course', isFilled: (p) => p.preferredCourses.length > 0 || (p.preferredStreams?.length ?? 0) > 0 },
  { key: 'preferredExam', label: 'Preferred exam', isFilled: (p) => p.preferredExams.length > 0 },
  { key: 'preferredLocation', label: 'Preferred study location', isFilled: (p) => p.preferredLocations.length > 0 },
  { key: 'careerGoal', label: 'Career goal', isFilled: (p) => !!p.careerGoal?.trim() },
]

export function getProfileCompletion(profile: StudentProfile) {
  const missing = profileFields.filter((field) => !field.isFilled(profile))
  const total = profileFields.length
  const filled = total - missing.length
  return { filled, total, percent: Math.round((filled / total) * 100), missing: missing.map((field) => field.key) }
}

 
export function createStudentProfile(input: { firstName: string; lastName: string; email: string; studyLevel?: string }): StudentProfile {
  return {
    id: 'demo-student',
    name: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    email: input.email.trim(),
    studyLevel: input.studyLevel || undefined,
    preferredStreams: [],
    preferredCourses: [],
    preferredExams: [],
    preferredLocations: [],
    workExperience: [],
  }
}

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
