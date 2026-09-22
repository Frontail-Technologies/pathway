import type { ResumeData, ResumeStepId, ResumeTemplateId } from '../data/types'
import { PersonalDetailsStep } from './steps/personal-details-step'
import { EducationStep } from './steps/education-step'
import { ExperienceStep } from './steps/experience-step'
import { ProjectsStep } from './steps/projects-step'
import { SkillsStep } from './steps/skills-step'
import { AchievementsStep } from './steps/achievements-step'
import { AdditionalStep } from './steps/additional-step'
import { ReviewStep } from './steps/review-step'

/** Single switch shared by the desktop editor panel and the mobile workspace, so the two shells never drift into two different step implementations. */
export function StepContent({
  step,
  data,
  onChange,
  templateId,
  onTemplateChange,
  onEditStep,
}: {
  step: ResumeStepId
  data: ResumeData
  onChange: (updater: (current: ResumeData) => ResumeData) => void
  templateId: ResumeTemplateId
  onTemplateChange: (templateId: ResumeTemplateId) => void
  onEditStep: (step: ResumeStepId) => void
}) {
  switch (step) {
    case 'personal':
      return <PersonalDetailsStep personal={data.personal} onChange={(personal) => onChange((current) => ({ ...current, personal }))} />
    case 'education':
      return <EducationStep education={data.education} onChange={(education) => onChange((current) => ({ ...current, education }))} />
    case 'experience':
      return <ExperienceStep experience={data.experience} onChange={(experience) => onChange((current) => ({ ...current, experience }))} />
    case 'projects':
      return <ProjectsStep projects={data.projects} onChange={(projects) => onChange((current) => ({ ...current, projects }))} />
    case 'skills':
      return <SkillsStep skills={data.skills} onChange={(skills) => onChange((current) => ({ ...current, skills }))} />
    case 'achievements':
      return <AchievementsStep achievements={data.achievements} onChange={(achievements) => onChange((current) => ({ ...current, achievements }))} />
    case 'additional':
      return <AdditionalStep additional={data.additional} onChange={(additional) => onChange((current) => ({ ...current, additional }))} />
    case 'review':
      return <ReviewStep data={data} templateId={templateId} onTemplateChange={onTemplateChange} onEditStep={onEditStep} />
    default:
      return null
  }
}
