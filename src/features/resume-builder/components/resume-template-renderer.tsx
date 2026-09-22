import type { ReactNode } from 'react'
import type { ResumeData, ResumeTemplateId } from '../data/types'
import { useClassicAtsDocument } from './templates/resume-template-classic'
import { useModernSidebarDocument } from './templates/resume-template-modern-sidebar'
import { useExecutiveTimelineDocument } from './templates/resume-template-executive-timeline'

export type ResumeDocument = { pages: ReactNode[]; pageCount: number; measureNode: ReactNode }

/**
 * Data stays separate from design — this is the only place that maps a
 * `ResumeTemplateId` to its rendering. All three template hooks are called
 * unconditionally (React's rules of hooks don't allow calling only one based
 * on a runtime value) and each does its own off-screen measurement/pagination
 * independently; only the active template's result is returned, but all
 * three keep working if the user switches templates mid-session.
 */
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
