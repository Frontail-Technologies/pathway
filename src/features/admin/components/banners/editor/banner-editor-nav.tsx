import { Calendar, Image as ImageIcon, LayoutGrid, MapPin, MousePointerClick, Send } from 'lucide-react'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const BANNER_EDITOR_SECTIONS = [
  { id: 'basics', label: 'Basic Info', icon: LayoutGrid },
  { id: 'media', label: 'Creative & Media', icon: ImageIcon },
  { id: 'cta', label: 'Call to Action', icon: MousePointerClick },
  { id: 'placement', label: 'Placement Surface', icon: MapPin },
  { id: 'schedule', label: 'Schedule Window', icon: Calendar },
  { id: 'publishing', label: 'Publishing', icon: Send },
] as const

export function BannerEditorNav({
  activeSectionId,
  onSectionChange,
}: {
  activeSectionId: string
  onSectionChange: (id: string) => void
}) {
  return (
    <AdminEditorSectionNav
      sections={[...BANNER_EDITOR_SECTIONS]}
      activeSectionId={activeSectionId}
      onSectionChange={onSectionChange}
      title="Banner Editor Sections"
    />
  )
}
