import {
  type StudentProfile,
  type WorkExperience,
  type ProfileFieldKey,
  demoStudent,
  getProfileCompletion,
  initialsOf,
} from '@/features/student/data/student'

export type AdminStudentAccountStatus = 'demo_account'

export type AdminStudent = {
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
  education?: {
    institution?: string
    graduationYear?: number
  }
  workExperience: WorkExperience[]
  accountStatus: AdminStudentAccountStatus
  accountStatusLabel: string
  accountType: string
  profileCompletion: {
    filled: number
    total: number
    percent: number
    missing: ProfileFieldKey[]
  }
  dataSource: string
  scraperExcluded: boolean
}

export function mapProfileToAdminStudent(profile: StudentProfile): AdminStudent {
  const completion = getProfileCompletion(profile)
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
    studyLevel: profile.studyLevel,
    stream: profile.stream,
    studyGoal: profile.studyGoal,
    careerGoal: profile.careerGoal,
    preferredStreams: profile.preferredStreams,
    preferredCourses: profile.preferredCourses,
    preferredExams: profile.preferredExams,
    preferredLocations: profile.preferredLocations,
    education: profile.education,
    workExperience: profile.workExperience,
    accountStatus: 'demo_account',
    accountStatusLabel: 'Demo Account',
    accountType: 'Student',
    profileCompletion: completion,
    dataSource: 'Pathway Account',
    scraperExcluded: true,
  }
}

export function getAdminStudents(): AdminStudent[] {
  return [mapProfileToAdminStudent(demoStudent)]
}

export function getAdminStudentById(id: string): AdminStudent | undefined {
  if (id === demoStudent.id) {
    return mapProfileToAdminStudent(demoStudent)
  }
  return undefined
}

export { initialsOf }
