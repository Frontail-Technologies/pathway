'use client'

import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorSectionNav } from '../../../admin-editor-section-nav'
import { AdminEditorLayout } from '../../../shared/admin-editor-layout'
import { AdminPageHeader } from '../../../kit'
import { EditorActions, MobileSaveBar, SaveNotice, useEditorGuard } from '../../shared/editor-kit'
import { useCoachingEditor } from './use-coaching-editor'
import { CoachingIdentitySection } from './sections/coaching-identity-section'
import { CoachingOverviewSection } from './sections/coaching-overview-section'
import { CoachingProgramsSection } from './sections/coaching-programs-section'
import { CoachingLocationModesSection } from './sections/coaching-location-modes-section'
import { CoachingFacultySection } from './sections/coaching-faculty-section'
import { CoachingMediaSection } from './sections/coaching-media-section'
import { CoachingSourceSection } from './sections/coaching-source-section'

const SECTIONS = [
  { id: 'identity', label: 'Basics' },
  { id: 'overview', label: 'Overview' },
  { id: 'programs', label: 'Programs' },
  { id: 'location', label: 'Coverage and mode' },
  { id: 'faculty', label: 'Teaching approach' },
  { id: 'media', label: 'Photos' },
  { id: 'source', label: 'Source' },
]
const SECTION_IDS = SECTIONS.map((section) => section.id)

export function AdminCoachingEditor({ initialProvider }: { initialProvider?: AdminCoachingProvider }) {
  const editor = useCoachingEditor(initialProvider)
  const { formData, isEditing, errors, saveStatus, saveMessage } = editor
  const backHref = isEditing ? `/admin/tutors-coaching/coaching/${formData.id}` : '/admin/tutors-coaching?tab=coaching'
  const { dirty, markSaved, cancel } = useEditorGuard(formData, backHref)
  const { activeSectionId, scrollToSection } = useAdminScrollSpy({ sectionIds: SECTION_IDS, offset: 120 })

  const actions = {
    onCancel: cancel,
    onSave: () => editor.handleSave(markSaved),
    saveStatus,
    saveLabel: isEditing ? 'Save changes' : 'Create provider',
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <AdminPageHeader
        back={isEditing ? { href: backHref, label: initialProvider?.name ?? 'Provider' } : { href: backHref, label: 'Tutors & coaching' }}
        title={isEditing ? `Edit ${initialProvider?.name ?? 'provider'}` : 'Add coaching provider'}
        meta={dirty ? <span className="text-[13px] text-muted-foreground">Unsaved changes</span> : undefined}
      />

      <SaveNotice status={saveStatus} message={saveMessage} />

      <AdminEditorLayout
        navigation={<AdminEditorSectionNav sections={SECTIONS} activeSectionId={activeSectionId} onSectionChange={scrollToSection} />}
        mobileActions={<MobileSaveBar dirty={dirty} {...actions} />}
      >
        <CoachingIdentitySection formData={formData} errors={errors} locked={isEditing} updateField={editor.updateField} />
        <CoachingOverviewSection formData={formData} errors={errors} updateField={editor.updateField} addHighlight={editor.addHighlight} removeHighlight={editor.removeHighlight} />
        <CoachingProgramsSection formData={formData} toggleArrayItem={editor.toggleArrayItem} addProgram={editor.addProgram} removeProgram={editor.removeProgram} />
        <CoachingLocationModesSection formData={formData} errors={errors} toggleArrayItem={editor.toggleArrayItem} />
        <CoachingFacultySection formData={formData} addFacultyNote={editor.addFacultyNote} removeFacultyNote={editor.removeFacultyNote} />
        <CoachingMediaSection formData={formData} addGalleryImage={editor.addGalleryImage} removeGalleryImage={editor.removeGalleryImage} />
        <CoachingSourceSection />
      </AdminEditorLayout>
    </div>
  )
}
