'use client'

import { createEmptyResume, createSampleResume } from '../data/fixtures'
import { useResumeDraft } from '../hooks/use-resume-draft'
import { useMediaQuery } from '../hooks/use-media-query'
import { StartScreen } from './start-screen'
import { DesktopWorkspace } from './workspace/desktop-workspace'
import { MobileWorkspace } from './workspace/mobile-workspace'

 
export function ResumeBuilderPage() {
  const draft = useResumeDraft()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

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
    <div className="flex h-full w-full">{isDesktop ? <DesktopWorkspace {...workspaceProps} /> : <MobileWorkspace {...workspaceProps} />}</div>
  )
}
