import type { ReactNode } from 'react'
import type { ResumeData, ResumeTemplateId } from '../data/types'
import { useClassicAtsDocument } from './templates/resume-template-classic'
import { useModernSidebarDocument } from './templates/resume-template-modern-sidebar'
import { useExecutiveTimelineDocument } from './templates/resume-template-executive-timeline'

export type ResumeDocument = { pages: ReactNode[]; pageCount: number; measureNode: ReactNode }








 
export function useResumeDocument(templateId: ResumeTemplateId, data: ResumeData): ResumeDocument {
  const classic = useClassicAtsDocument(data)
  const modernSidebar = useModernSidebarDocument(data)
  const executiveTimeline = useExecutiveTimelineDocument(data)

  const active = templateId === 'modern-sidebar' ? modernSidebar : templateId === 'executive-timeline' ? executiveTimeline : classic

  return {
    pages: active.pages,
    pageCount: active.pageCount,
    measureNode: (
      <>
        {classic.measureNode}
        {modernSidebar.measureNode}
        {executiveTimeline.measureNode}
      </>
    ),
  }
}
