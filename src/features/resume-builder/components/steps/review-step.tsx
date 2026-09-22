'use client'

import { CheckCircle2, Circle, CircleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplatePicker } from '../template-picker'
import { RESUME_STEPS, type ResumeData, type ResumeStepId, type ResumeTemplateId } from '../../data/types'

type StepCompletion = true | false | 'optional'

function getStepCompletion(step: ResumeStepId, data: ResumeData): StepCompletion {
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

/**
 * "Review" is deliberately not another preview — the canonical live preview
 * always lives in the dedicated preview panel/Sheet. This step is a
 * completion checklist + template switch + a way to jump back into any
 * section, so a desktop user is never shown two resume previews at once.
 */
export function ReviewStep({
  data,
  templateId,
  onTemplateChange,
  onEditStep,
}: {
  data: ResumeData
  templateId: ResumeTemplateId
  onTemplateChange: (templateId: ResumeTemplateId) => void
  onEditStep: (step: ResumeStepId) => void
}) {
  const checklistSteps = RESUME_STEPS.filter((step) => step.id !== 'review')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2.5 rounded-[10px] border border-success/30 bg-success-surface p-3.5 text-sm text-success">
        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
        <p>Your resume is ready to review. Check each section below, switch templates, or open the live preview.</p>
      </div>

      <div className="overflow-hidden rounded-[10px] border bg-card">
        {checklistSteps.map((step, index) => {
          const complete = getStepCompletion(step.id, data)
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onEditStep(step.id)}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${index !== 0 ? 'border-t' : ''}`}
            >
              <span className="flex items-center gap-2.5 text-foreground">
                {complete === true ? (
                  <CheckCircle2 className="size-4.5 shrink-0 text-success" aria-hidden="true" />
                ) : complete === 'optional' ? (
                  <Circle className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <CircleAlert className="size-4.5 shrink-0 text-warning" aria-hidden="true" />
                )}
                {step.label}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{complete === true ? 'Complete' : complete === 'optional' ? 'Optional' : 'Incomplete'}</span>
            </button>
          )
        })}
      </div>

      <TemplatePicker data={data} templateId={templateId} onSelect={onTemplateChange} trigger={<Button type="button" variant="outline" className="w-fit">Change Template</Button>} />
    </div>
  )
}
