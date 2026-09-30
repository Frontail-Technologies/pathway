import {
  BookOpen,
  CreditCard,
  Eye,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutGrid,
  Send,
} from 'lucide-react'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'

export const NOTE_EDITOR_SECTIONS = [
  { id: 'basics', label: 'Basic Info', icon: LayoutGrid },
  { id: 'classification', label: 'Academic Scope', icon: GraduationCap },
  { id: 'cover', label: 'Cover Image', icon: ImageIcon },
  { id: 'pdf-asset', label: 'Downloadable PDF', icon: FileText },
  { id: 'preview-asset', label: 'Sample Preview', icon: Eye },
  { id: 'pricing', label: 'Pricing & Access', icon: CreditCard },
  { id: 'related', label: 'Courses & Exams', icon: BookOpen },
  { id: 'publishing', label: 'Publishing', icon: Send },
] as const

export function NoteEditorNav({
  activeSectionId,
  onSectionChange,
}: {
  activeSectionId: string
  onSectionChange: (id: string) => void
}) {
  return (
    <AdminEditorSectionNav
      sections={[...NOTE_EDITOR_SECTIONS]}
      activeSectionId={activeSectionId}
      onSectionChange={onSectionChange}
      title="Note Editor Sections"
    />
  )
}
