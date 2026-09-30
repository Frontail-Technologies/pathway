'use client'

import { AlertCircle, CheckCircle2, Building2, FileText, BookOpen, MapPin, GraduationCap, Image, Shield } from 'lucide-react'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { useCoachingEditor } from './use-coaching-editor'
import { CoachingEditorHeader } from './coaching-editor-header'
import { CoachingEditorMobileActions } from './coaching-editor-mobile-actions'
import { CoachingIdentitySection } from './sections/coaching-identity-section'
import { CoachingOverviewSection } from './sections/coaching-overview-section'
import { CoachingProgramsSection } from './sections/coaching-programs-section'
import { CoachingLocationModesSection } from './sections/coaching-location-modes-section'
import { CoachingFacultySection } from './sections/coaching-faculty-section'
import { CoachingMediaSection } from './sections/coaching-media-section'
import { CoachingSourceSection } from './sections/coaching-source-section'

const COACHING_EDITOR_SECTIONS = [
  { id: 'identity', label: 'Identity', icon: Building2 },
  { id: 'overview', label: 'Overview & Highlights', icon: FileText },
  { id: 'programs', label: 'Programs & Tracks', icon: BookOpen },
  { id: 'location', label: 'Location & Modes', icon: MapPin },
  { id: 'faculty', label: 'Faculty & Approach', icon: GraduationCap },
  { id: 'media', label: 'Media & Gallery', icon: Image },
  { id: 'source', label: 'Source & Pipeline', icon: Shield },
]

const SECTION_IDS = COACHING_EDITOR_SECTIONS.map((s) => s.id)

export function AdminCoachingEditor({ initialProvider }: { initialProvider?: AdminCoachingProvider }) {
  const {
    formData,
    isEditing,
    errors,
    saveStatus,
    saveMessage,
    updateField,
    toggleArrayItem,
    addHighlight,
    removeHighlight,
    addProgram,
    removeProgram,
    addFacultyNote,
    removeFacultyNote,
    addGalleryImage,
    removeGalleryImage,
    handleSave,
  } = useCoachingEditor(initialProvider)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: SECTION_IDS,
    offset: 120,
  })

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <CoachingEditorHeader
        isEditing={isEditing}
        providerName={formData.name}
        providerId={formData.id}
        saveStatus={saveStatus}
        onSave={handleSave}
      />

      {saveMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
            saveStatus === 'error'
              ? 'bg-destructive/10 text-destructive border-destructive/20'
              : 'bg-primary/10 text-primary border-primary/20'
          }`}
        >
          {saveStatus === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          )}
          <span>{saveMessage}</span>
        </div>
      )}

      <AdminEditorLayout
        navigation={
          <AdminEditorSectionNav
            sections={COACHING_EDITOR_SECTIONS}
            activeSectionId={activeSectionId}
            onSectionChange={scrollToSection}
          />
        }
        mobileActions={
          <CoachingEditorMobileActions
            saveStatus={saveStatus}
            onSave={handleSave}
            isEditing={isEditing}
          />
        }
      >
          <CoachingIdentitySection
            formData={formData}
            errors={errors}
            updateField={updateField}
          />

          <CoachingOverviewSection
            formData={formData}
            errors={errors}
            updateField={updateField}
            addHighlight={addHighlight}
            removeHighlight={removeHighlight}
          />

          <CoachingProgramsSection
            formData={formData}
            toggleArrayItem={toggleArrayItem}
            addProgram={addProgram}
            removeProgram={removeProgram}
          />

          <CoachingLocationModesSection
            formData={formData}
            errors={errors}
            toggleArrayItem={toggleArrayItem}
          />

          <CoachingFacultySection
            formData={formData}
            addFacultyNote={addFacultyNote}
            removeFacultyNote={removeFacultyNote}
          />

          <CoachingMediaSection
            formData={formData}
            addGalleryImage={addGalleryImage}
            removeGalleryImage={removeGalleryImage}
          />

          <CoachingSourceSection />
      </AdminEditorLayout>
    </div>
  )
}
