import { AlignLeft, FileText, Image as ImageIcon, Link2, Send, Tags } from 'lucide-react'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const CONTENT_EDITOR_SECTIONS = [
  { id: 'basics', label: 'Basic Info', icon: FileText },
  { id: 'body', label: 'Article Body', icon: AlignLeft },
  { id: 'media', label: 'Hero Media', icon: ImageIcon },
  { id: 'taxonomy', label: 'Taxonomy & Author', icon: Tags },
  { id: 'related', label: 'Related Entities', icon: Link2 },
  { id: 'publishing', label: 'Publishing', icon: Send },
] as const

export function ContentEditorNav({
  activeSectionId,
  onSectionChange,
}: {
  activeSectionId: string
  onSectionChange: (id: string) => void
}) {
  return (
    <AdminEditorSectionNav
      sections={[...CONTENT_EDITOR_SECTIONS]}
      activeSectionId={activeSectionId}
      onSectionChange={onSectionChange}
      title="Content Editor Sections"
      variant="horizontal"
    />
  )
}
