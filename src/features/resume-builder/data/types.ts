



export type ResumeStepId =
  | 'personal'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'additional'
  | 'review'

export type ResumePersonal = {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  headline: string
  photo?: string
  linkedin?: string
  portfolio?: string
  github?: string
  summary?: string
}

export type EducationEntry = {
  id: string
  institute: string
  degree: string
  specialization?: string
  startYear: string
  endYear: string
  grade?: string
  location?: string
}

export type ExperienceType = 'Internship' | 'Part-time' | 'Full-time' | 'Freelance' | 'Volunteer'

export type ExperienceEntry = {
  id: string
  organization: string
  role: string
  type: ExperienceType
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type ProjectEntry = {
  id: string
  name: string
  role: string
  technologies: string[]
  description: string
  link?: string
  githubLink?: string
}

export type SkillGroupId = 'Technical Skills' | 'Tools' | 'Soft Skills'

export type SkillEntry = {
  id: string
  label: string
  group: SkillGroupId
}

export type AchievementType = 'Achievement' | 'Certification' | 'Award'

export type AchievementEntry = {
  id: string
  type: AchievementType
  title: string
  issuer?: string
  date?: string
  description?: string
  link?: string
}

export type ResumeAdditional = {
  languages: string[]
  extracurricular: string[]
  volunteer: string[]
  interests: string[]
}

export type ResumeData = {
  personal: ResumePersonal
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillEntry[]
  achievements: AchievementEntry[]
  additional: ResumeAdditional
}

export type ResumeTemplateId = 'classic-ats' | 'modern-sidebar' | 'executive-timeline'

export type ResumeTemplateMeta = {
  id: ResumeTemplateId
  name: string
  tagline: string
}

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  { id: 'classic-ats', name: 'Classic ATS', tagline: 'Simple · Single column' },
  { id: 'modern-sidebar', name: 'Modern Sidebar', tagline: 'Visual · Two column' },
  { id: 'executive-timeline', name: 'Executive Timeline', tagline: 'Premium · Structured' },
]

export const RESUME_STEPS: { id: ResumeStepId; label: string }[] = [
  { id: 'personal', label: 'Personal Details' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'additional', label: 'Additional Details' },
  { id: 'review', label: 'Review' },
]
