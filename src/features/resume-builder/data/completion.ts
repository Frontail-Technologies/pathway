import { RESUME_STEPS, type ResumeData, type ResumeStepId } from './types'

export type StepCompletion = true | false | 'optional'

export function getStepCompletion(step: ResumeStepId, data: ResumeData): StepCompletion {
  switch (step) {
    case 'personal':
      return Boolean(data.personal.firstName && data.personal.lastName && data.personal.email && data.personal.phone && data.personal.location && data.personal.headline)
    case 'education':
      return data.education.length > 0
    case 'experience':
      return data.experience.length > 0 || 'optional'
    case 'projects':
      return data.projects.length > 0
    case 'skills':
      return data.skills.length > 0
    case 'achievements':
      return data.achievements.length > 0 || 'optional'
    case 'additional':
      return data.additional.languages.length > 0 || data.additional.interests.length > 0 || data.additional.extracurricular.length > 0 || data.additional.volunteer.length > 0 || 'optional'
    default:
      return true
  }
}

export const resumeSections = RESUME_STEPS.filter((step) => step.id !== 'review')

export const filledSections = (data: ResumeData) => resumeSections.filter((step) => getStepCompletion(step.id, data) === true).length
