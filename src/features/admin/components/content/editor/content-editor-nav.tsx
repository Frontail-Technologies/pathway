import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const CONTENT_EDITOR_SECTIONS = [
  { id: 'basics', label: 'Basics' },
  { id: 'body', label: 'Body' },
  { id: 'media', label: 'Hero image' },
  { id: 'taxonomy', label: 'Category and author' },
  { id: 'related', label: 'Linked records' },
  { id: 'publishing', label: 'Publishing' },
] as const

export function ContentEditorNav({ activeSectionId, onSectionChange }: { activeSectionId: string; onSectionChange: (id: string) => void }) {
  return <AdminEditorSectionNav sections={[...CONTENT_EDITOR_SECTIONS]} activeSectionId={activeSectionId} onSectionChange={onSectionChange} title="On this page" />
}
