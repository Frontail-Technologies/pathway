import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const BANNER_EDITOR_SECTIONS = [
  { id: 'basics', label: 'Copy' },
  { id: 'media', label: 'Images' },
  { id: 'cta', label: 'Buttons' },
  { id: 'placement', label: 'Placement' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'publishing', label: 'Publishing' },
] as const

export function BannerEditorNav({ activeSectionId, onSectionChange }: { activeSectionId: string; onSectionChange: (id: string) => void }) {
  return <AdminEditorSectionNav sections={[...BANNER_EDITOR_SECTIONS]} activeSectionId={activeSectionId} onSectionChange={onSectionChange} title="On this page" className="static" />
}
