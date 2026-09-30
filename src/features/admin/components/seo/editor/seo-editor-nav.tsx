import { Eye, Link2, Send, Share2, Target, Type } from 'lucide-react'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const SEO_EDITOR_SECTIONS = [
  { id: 'target', label: 'Target Page / Entity', icon: Target },
  { id: 'metadata', label: 'Search Metadata', icon: Type },
  { id: 'canonical', label: 'Canonical & Robots', icon: Link2 },
  { id: 'social', label: 'Social Sharing (OG)', icon: Share2 },
  { id: 'preview', label: 'Live Preview', icon: Eye },
  { id: 'publishing', label: 'Review & Save', icon: Send },
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
      title="SEO Editor Sections"
    />
  )
}
