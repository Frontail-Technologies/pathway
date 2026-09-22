import type { ResumeData, ResumeTemplateId } from '../data/types'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../data/page-size'
import { useFitScale } from '../hooks/use-fit-scale'
import { useResumeDocument } from './resume-template-renderer'

/**
 * A real scaled instance of page 1 of `useResumeDocument` — never a
 * schematic placeholder diagram — so the template picker always matches the
 * actual live preview exactly. A "N pages" badge is shown when the current
 * data produces more than one page for that template.
 */
export function ResumeTemplateThumbnail({ templateId, data }: { templateId: ResumeTemplateId; data: ResumeData }) {
  const document = useResumeDocument(templateId, data)
  const { ref, scale } = useFitScale(RESUME_PAGE_WIDTH)

  return (
    <div ref={ref} className="relative aspect-210/297 w-full overflow-hidden bg-white">
      {scale > 0 && (
        <div className="absolute top-0 left-0 origin-top-left" style={{ width: RESUME_PAGE_WIDTH, height: RESUME_PAGE_HEIGHT, transform: `scale(${scale})` }}>
          {document.pages[0]}
        </div>
      )}
      {document.pageCount > 1 && (
        <span className="absolute top-2 left-2 rounded-full bg-foreground/80 px-2 py-0.5 text-[10px] font-medium text-background">{document.pageCount} pages</span>
      )}
      {document.measureNode}
    </div>
  )
}
