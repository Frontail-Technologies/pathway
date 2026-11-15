'use client'

import { Download, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { RESUME_STEPS, type ResumeData, type ResumeStepId, type ResumeTemplateId } from '../../data/types'
import { TemplatePicker } from '../template-picker'
import { ResumeDocumentViewport } from '../resume-document-viewport'
import { useResumeDocument } from '../resume-template-renderer'
import { ResumePrint, printResume } from '../resume-print'
import { StepContent } from '../step-content'
import { BuilderSidebar } from './builder-sidebar'
import { WorkspaceBar, onBlueOutline } from './workspace-bar'

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
  const meta = RESUME_STEPS[stepIndex]

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
      <WorkspaceBar>
        {savedAt ? (
          <span className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
            <Save className="size-3.5" aria-hidden="true" />
            Saved in this browser
          </span>
        ) : null}
        <TemplatePicker data={data} templateId={templateId} onSelect={onTemplateChange} trigger={<Button type="button" variant="outline" size="sm" className={onBlueOutline}>Change template</Button>} />
        <Button type="button" variant="cta" size="sm" className="gap-1.5" onClick={printResume}>
          <Download className="size-4" aria-hidden="true" />
          Download PDF
        </Button>
      </WorkspaceBar>

      <div className="flex min-h-0 flex-1">
        <BuilderSidebar activeStep={step} data={data} onStepClick={onStepChange} />

        <ResizablePanelGroup direction="horizontal" className="min-w-0 flex-1">
          <ResizablePanel defaultSize={43} minSize={36} className="flex min-h-0 flex-col">
            <ScrollArea className="min-h-0 flex-1">
              <div className="mx-auto max-w-3xl px-6 py-6">
                <p className="text-xs font-semibold text-muted-foreground">
                  Step {stepIndex + 1} of {RESUME_STEPS.length}
                </p>
                <h1 className="mt-1 mb-5 font-heading text-2xl font-bold text-foreground">{meta?.label}</h1>
                <StepContent step={step} data={data} onChange={onChange} templateId={templateId} onTemplateChange={onTemplateChange} onEditStep={onStepChange} />
              </div>
            </ScrollArea>
            <div className="flex shrink-0 items-center justify-between border-t bg-card px-6 py-3">
              <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0}>
                Back
              </Button>
              {step !== 'review' ? (
                <Button type="button" variant="cta" onClick={goNext}>
                  Save and next
                </Button>
              ) : (
                <Button type="button" variant="cta" className="gap-1.5" onClick={printResume}>
                  <Download className="size-4" aria-hidden="true" />
                  Download PDF
                </Button>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={57} minSize={38} className="min-h-0">
            <ResumeDocumentViewport document={resumeDocument} resetKey={templateId} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <ResumePrint pages={resumeDocument.pages} />
    </div>
  )
}
