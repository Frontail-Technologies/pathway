'use client'

import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { RESUME_STEPS, type ResumeData, type ResumeStepId, type ResumeTemplateId } from '../../data/types'
import { TemplatePicker } from '../template-picker'
import { ResumeDocumentViewport } from '../resume-document-viewport'
import { useResumeDocument } from '../resume-template-renderer'
import { StepContent } from '../step-content'
import { BuilderSidebar } from './builder-sidebar'

type DesktopWorkspaceProps = {
  savedAt: number | null
  step: ResumeStepId
  data: ResumeData
  onChange: (updater: (current: ResumeData) => ResumeData) => void
  templateId: ResumeTemplateId
  onTemplateChange: (templateId: ResumeTemplateId) => void
  onStepChange: (step: ResumeStepId) => void
}







 
export function DesktopWorkspace({ savedAt, step, data, onChange, templateId, onTemplateChange, onStepChange }: DesktopWorkspaceProps) {
  const stepIndex = RESUME_STEPS.findIndex((entry) => entry.id === step)
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
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-card px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/" aria-label="Back to Student Tools" />}>
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <span className="font-heading text-sm font-bold text-foreground">Pathway</span>
          <span className="text-muted-foreground" aria-hidden="true">
            /
          </span>
          <span className="truncate text-sm font-medium text-foreground">Resume Builder</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {savedAt && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Save className="size-3.5" aria-hidden="true" />
              Draft saved locally
            </span>
          )}
          <TemplatePicker data={data} templateId={templateId} onSelect={onTemplateChange} trigger={<Button type="button" variant="outline" size="sm">Change Template</Button>} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <BuilderSidebar activeStep={step} onStepClick={onStepChange} />

        <ResizablePanelGroup direction="horizontal" className="min-w-0 flex-1">
          <ResizablePanel defaultSize={43} minSize={36} className="flex min-h-0 flex-col">
            <ScrollArea className="min-h-0 flex-1">
              <div className="mx-auto max-w-3xl px-6 py-6">
                <StepContent step={step} data={data} onChange={onChange} templateId={templateId} onTemplateChange={onTemplateChange} onEditStep={onStepChange} />
              </div>
            </ScrollArea>
            <div className="flex shrink-0 items-center justify-between border-t bg-card px-6 py-3">
              <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0}>
                Back
              </Button>
              {step !== 'review' ? (
                <Button type="button" variant="cta" onClick={goNext}>
                  Save & Next
                </Button>
              ) : (
                <span className="text-sm font-medium text-success">All steps complete</span>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={57} minSize={38} className="min-h-0">
            <ResumeDocumentViewport document={resumeDocument} resetKey={templateId} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
