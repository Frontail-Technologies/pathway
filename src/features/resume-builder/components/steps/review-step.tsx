'use client'

import { ChevronRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SpotArt } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import { TemplatePicker } from '../template-picker'
import { printResume } from '../resume-print'
import { filledSections, getStepCompletion, resumeSections } from '../../data/completion'
import type { ResumeData, ResumeStepId, ResumeTemplateId } from '../../data/types'

const statusLabel = { true: 'Complete', false: 'Missing', optional: 'Optional' } as const
const statusTone = { true: 'bg-secondary text-primary', false: 'bg-cta/10 text-cta', optional: 'bg-muted text-muted-foreground' } as const

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
  const missing = resumeSections.filter((step) => getStepCompletion(step.id, data) === false).length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
        <SpotArt name={missing ? 'exam' : 'verified'} className="size-14" />
        <div className="min-w-0">
          <p className="font-heading text-lg font-bold text-foreground">{missing ? `${missing} ${missing === 1 ? 'section needs' : 'sections need'} details` : 'Your resume is ready'}</p>
          <p className="text-sm text-muted-foreground">
            {filledSections(data)} of {resumeSections.length} sections filled
          </p>
        </div>
      </div>

      <ul className="overflow-hidden rounded-xl border bg-card">
        {resumeSections.map((step, index) => {
          const status = getStepCompletion(step.id, data)
          const key = String(status) as keyof typeof statusLabel
          return (
            <li key={step.id} className={cn(index !== 0 && 'border-t')}>
              <button type="button" onClick={() => onEditStep(step.id)} className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted">
                <span className="font-medium text-foreground">{step.label}</span>
                <span className="flex items-center gap-2">
                  <span className={cn('rounded-md px-2 py-0.5 text-xs font-semibold', statusTone[key])}>{statusLabel[key]}</span>
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="cta" className="gap-1.5" onClick={printResume}>
          <Download className="size-4" aria-hidden="true" />
          Download PDF
        </Button>
        <TemplatePicker data={data} templateId={templateId} onSelect={onTemplateChange} trigger={<Button type="button" variant="outline">Change template</Button>} />
      </div>
    </div>
  )
}
