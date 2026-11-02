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
  { id: 'basics', label: 'Basics', icon: LayoutGrid },
  { id: 'classification', label: 'Subject and level', icon: GraduationCap },
  { id: 'cover', label: 'Cover image', icon: ImageIcon },
  { id: 'pdf-asset', label: 'PDF file', icon: FileText },
  { id: 'preview-asset', label: 'Sample preview', icon: Eye },
  { id: 'pricing', label: 'Price', icon: CreditCard },
  { id: 'related', label: 'Courses and exams', icon: BookOpen },
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
      title="Sections"
    />
  )
}
