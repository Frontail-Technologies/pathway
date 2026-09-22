'use client'

import { Check } from 'lucide-react'
import { RESUME_STEPS, type ResumeStepId } from '../../data/types'

/** Vertical workflow rail replacing the old horizontal 8-step desktop stepper — fixed width, no unnecessary internal scroll at normal desktop heights. */
export function BuilderSidebar({ activeStep, onStepClick }: { activeStep: ResumeStepId; onStepClick: (step: ResumeStepId) => void }) {
  const sections = RESUME_STEPS.filter((step) => step.id !== 'review')
  const activeIndex = RESUME_STEPS.findIndex((step) => step.id === activeStep)
  const completedCount = Math.min(activeIndex, sections.length)

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-card">
      <div className="border-b p-4">
        <p className="text-sm font-bold text-foreground">Resume Builder</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {completedCount} of {sections.length} sections complete
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(completedCount / sections.length) * 100}%` }} />
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 p-2">
        {RESUME_STEPS.map((step, index) => {
          const isActive = step.id === activeStep
          const isComplete = index < activeIndex
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isComplete || isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {isComplete ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
              </span>
              {step.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
