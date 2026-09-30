'use client'

import { createEmptyResume, createSampleResume } from '../data/fixtures'
import { useResumeDraft } from '../hooks/use-resume-draft'
import { StartScreen } from './start-screen'
import { DesktopWorkspace } from './workspace/desktop-workspace'
import { MobileWorkspace } from './workspace/mobile-workspace'

 
export function ResumeBuilderPage() {
  const draft = useResumeDraft()

  if (!draft.restored) return null

  if (!draft.hasStarted) {
    return (
      <div className="h-full overflow-y-auto">
        <StartScreen
          onStart={(templateId) => {
            draft.setTemplateId(templateId)
            draft.start(createEmptyResume())
          }}
          onPreviewSample={() => {
            draft.setTemplateId('modern-sidebar')
            draft.start(createSampleResume())
          }}
        />
      </div>
    )
  }

  const workspaceProps = {
    savedAt: draft.savedAt,
    step: draft.step,
    data: draft.data,
    onChange: draft.setData,
    templateId: draft.templateId,
    onTemplateChange: draft.setTemplateId,
    onStepChange: draft.setStep,
  }

  return (
    <div className="h-full w-full">
      {


 }
      <div className="hidden h-full w-full lg:flex">
        <DesktopWorkspace {...workspaceProps} />
      </div>
      <div className="h-full w-full lg:hidden">
        <MobileWorkspace {...workspaceProps} />
      </div>
    </div>
  )
}
