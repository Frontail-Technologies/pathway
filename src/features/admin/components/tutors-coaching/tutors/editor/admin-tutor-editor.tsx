'use client'

import { AlertCircle, CheckCircle2, User, FileText, BookOpen, Sparkles, Globe, Camera, Shield } from 'lucide-react'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { useTutorEditor } from './use-tutor-editor'
import { TutorEditorHeader } from './tutor-editor-header'
import { TutorEditorMobileActions } from './tutor-editor-mobile-actions'
import { TutorIdentitySection } from './sections/tutor-identity-section'
import { TutorBioSection } from './sections/tutor-bio-section'
import { TutorSubjectsExamsSection } from './sections/tutor-subjects-exams-section'
import { TutorTeachingProfileSection } from './sections/tutor-teaching-profile-section'
import { TutorLanguagesModesSection } from './sections/tutor-languages-modes-section'
import { TutorPortraitSection } from './sections/tutor-portrait-section'
import { TutorSourceSection } from './sections/tutor-source-section'

const TUTOR_EDITOR_SECTIONS = [
  { id: 'identity', label: 'Identity', icon: User },
  { id: 'bio', label: 'Bio & Overview', icon: FileText },
  { id: 'subjects', label: 'Subjects & Exams', icon: BookOpen },
  { id: 'teaching', label: 'Teaching Profile', icon: Sparkles },
  { id: 'languages', label: 'Languages & Modes', icon: Globe },
  { id: 'portrait', label: 'Portrait & Visuals', icon: Camera },
  { id: 'source', label: 'Source & Review', icon: Shield },
]

const SECTION_IDS = TUTOR_EDITOR_SECTIONS.map((s) => s.id)

export function AdminTutorEditor({ initialTutor }: { initialTutor?: AdminTutor }) {
  const {
    formData,
    isEditing,
    errors,
    saveStatus,
    saveMessage,
    updateField,
    updateAvatarField,
    toggleArrayItem,
    addArrayString,
    removeArrayString,
    handleSave,
  } = useTutorEditor(initialTutor)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: SECTION_IDS,
    offset: 120,
  })

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <TutorEditorHeader
        isEditing={isEditing}
        tutorName={formData.name}
        tutorId={formData.id}
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
            sections={TUTOR_EDITOR_SECTIONS}
            activeSectionId={activeSectionId}
            onSectionChange={scrollToSection}
          />
        }
        mobileActions={
          <TutorEditorMobileActions
            saveStatus={saveStatus}
            onSave={handleSave}
            isEditing={isEditing}
          />
        }
      >
          <TutorIdentitySection
            formData={formData}
            errors={errors}
            updateField={updateField}
          />

          <TutorBioSection
            formData={formData}
            errors={errors}
            updateField={updateField}
            addArrayString={addArrayString}
            removeArrayString={removeArrayString}
          />

          <TutorSubjectsExamsSection
            formData={formData}
            errors={errors}
            toggleArrayItem={toggleArrayItem}
          />

          <TutorTeachingProfileSection
            formData={formData}
            addArrayString={addArrayString}
            removeArrayString={removeArrayString}
          />

          <TutorLanguagesModesSection
            formData={formData}
            errors={errors}
            toggleArrayItem={toggleArrayItem}
          />

          <TutorPortraitSection
            formData={formData}
            updateField={updateField}
            updateAvatarField={updateAvatarField}
          />

          <TutorSourceSection />
      </AdminEditorLayout>
    </div>
  )
}
