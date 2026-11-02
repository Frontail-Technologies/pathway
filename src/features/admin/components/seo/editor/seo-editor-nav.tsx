import { Eye, Link2, Share2, Target, Type } from 'lucide-react'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const SEO_EDITOR_SECTIONS = [
  { id: 'target', label: 'Page', icon: Target },
  { id: 'metadata', label: 'Search text', icon: Type },
  { id: 'canonical', label: 'Canonical and indexing', icon: Link2 },
  { id: 'social', label: 'Social card', icon: Share2 },
  { id: 'preview', label: 'Preview', icon: Eye },
] as const

export function SeoEditorNav({
  activeSectionId,
  onSectionChange,
}: {
  activeSectionId: string
  onSectionChange: (id: string) => void
}) {
  return (
    <AdminEditorSectionNav
      sections={[...SEO_EDITOR_SECTIONS]}
      activeSectionId={activeSectionId}
      onSectionChange={onSectionChange}
      title="Sections"
    />
  )
}
