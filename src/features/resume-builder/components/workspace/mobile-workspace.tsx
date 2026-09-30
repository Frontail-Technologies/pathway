'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { RESUME_STEPS, type ResumeData, type ResumeStepId, type ResumeTemplateId } from '../../data/types'
import { StepContent } from '../step-content'
import { ResumeDocumentViewport } from '../resume-document-viewport'
import { useResumeDocument } from '../resume-template-renderer'
import { TemplatePicker } from '../template-picker'

type MobileWorkspaceProps = {
  savedAt: number | null
  step: ResumeStepId
  data: ResumeData
  onChange: (updater: (current: ResumeData) => ResumeData) => void
  templateId: ResumeTemplateId
  onTemplateChange: (templateId: ResumeTemplateId) => void
  onStepChange: (step: ResumeStepId) => void
}

 
export function MobileWorkspace({ savedAt, step, data, onChange, templateId, onTemplateChange, onStepChange }: MobileWorkspaceProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const stepIndex = RESUME_STEPS.findIndex((entry) => entry.id === step)
  const meta = RESUME_STEPS[stepIndex]
  const resumeDocument = useResumeDocument(templateId, data)

  const goNext = () => {
    const next = RESUME_STEPS[stepIndex + 1]
    if (next) onStepChange(next.id)
  }
  const goBack = () => {
    const previous = RESUME_STEPS[stepIndex - 1]
    if (previous) onStepChange(previous.id)
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
      <header className="flex h-13 shrink-0 items-center gap-2 border-b bg-card px-2">
        <Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/" aria-label="Back to Student Tools" />}>
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Button>
        <span className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-foreground">Resume Builder</span>
        <span className="flex size-8 shrink-0 items-center justify-center text-muted-foreground" aria-label={savedAt ? 'Draft saved locally' : undefined}>
          {savedAt && <Save className="size-4" aria-hidden="true" />}
        </span>
      </header>

      <div className="shrink-0 border-b bg-card px-4 py-2.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            Step {stepIndex + 1} of {RESUME_STEPS.length}
          </span>
          <span className="text-muted-foreground">{meta.label}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((stepIndex + 1) / RESUME_STEPS.length) * 100}%` }} />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-4 py-4">
          <StepContent step={step} data={data} onChange={onChange} templateId={templateId} onTemplateChange={onTemplateChange} onEditStep={onStepChange} />
        </div>
      </ScrollArea>

      <div className="flex shrink-0 items-center justify-between gap-2 border-t bg-card px-3 py-2.5">
        <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0}>
          Back
        </Button>
        <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => setPreviewOpen(true)}>
          <Eye className="size-4" aria-hidden="true" />
          Preview
        </Button>
        {step !== 'review' ? (
          <Button type="button" variant="cta" onClick={goNext}>
            Save & Next
          </Button>
        ) : (
          <Button type="button" variant="cta" onClick={() => setPreviewOpen(true)}>
            View Resume
          </Button>
        )}
      </div>

      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent side="bottom" showCloseButton={false} className="flex h-dvh max-w-none flex-col gap-0 border-0 p-0 sm:max-w-none">
          <SheetHeader className="flex-row items-center justify-between gap-2 border-b p-3">
            <SheetTitle>Resume Preview</SheetTitle>
            <div className="flex items-center gap-2">
              <TemplatePicker data={data} templateId={templateId} onSelect={onTemplateChange} trigger={<Button type="button" variant="outline" size="sm">Change Template</Button>} />
              <Button type="button" variant="ghost" size="sm" onClick={() => setPreviewOpen(false)}>
                Close
              </Button>
            </div>
          </SheetHeader>
          {



 }
          <div className="min-h-0 flex-1">{previewOpen && <ResumeDocumentViewport document={resumeDocument} resetKey={templateId} />}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
