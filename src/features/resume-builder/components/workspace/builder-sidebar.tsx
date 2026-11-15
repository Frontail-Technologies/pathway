'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { filledSections, getStepCompletion, resumeSections } from '../../data/completion'
import { RESUME_STEPS, type ResumeData, type ResumeStepId } from '../../data/types'

export function BuilderSidebar({ activeStep, data, onStepClick }: { activeStep: ResumeStepId; data: ResumeData; onStepClick: (step: ResumeStepId) => void }) {
  const filled = filledSections(data)

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
      <div className="border-b p-4">
        <p className="text-sm font-bold text-foreground">Your resume</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {filled} of {resumeSections.length} sections filled
        </p>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(filled / resumeSections.length) * 100}%` }} />
        </div>
      </div>

      <nav aria-label="Resume sections" className="flex flex-col gap-0.5 p-2">
        {RESUME_STEPS.map((step, index) => {
          const active = step.id === activeStep
          const done = step.id !== 'review' && getStepCompletion(step.id, data) === true
          return (
            <button
              key={step.id}
              type="button"
              aria-current={active ? 'step' : undefined}
              onClick={() => onStepClick(step.id)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                active ? 'bg-secondary font-semibold text-primary' : 'text-foreground hover:bg-muted',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold',
                  done ? 'border-primary bg-primary text-primary-foreground' : active ? 'border-primary bg-card text-primary' : 'border-border bg-card text-muted-foreground',
                )}
              >
                {done ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
              </span>
              {step.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
