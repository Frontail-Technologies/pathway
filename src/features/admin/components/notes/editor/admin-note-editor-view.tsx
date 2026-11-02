'use client'

import * as React from 'react'
import type { Note } from '@/features/notes/types/note'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { useNoteEditor } from './use-note-editor'
import { NoteEditorNav, NOTE_EDITOR_SECTIONS } from './note-editor-nav'
import { NoteBasicsSection } from './note-basics-section'
import { NoteClassificationSection } from './note-classification-section'
import { NoteCoverSection } from './note-cover-section'
import { NotePdfAssetSection } from './note-pdf-asset-section'
import { NotePreviewAssetSection } from './note-preview-asset-section'
import { NotePricingSection } from './note-pricing-section'
import { NoteRelatedSection } from './note-related-section'
import { NotePublishingSection } from './note-publishing-section'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader } from '../../kit'

export function AdminNoteEditorView({
  initialNote,
}: {
  initialNote?: Note | null
}) {
  const {
    isEditing,
    dirty,
    formData,
    errors,
    apiNotice,
    coverMode,
    setCoverMode,
    selectedCoverFile,
    coverPreviewUrl,
    coverUrlValue,
    setCoverUrlValue,
    coverFileError,
    handleSelectCoverFile,
    handleRemoveCoverFile,
    selectedPdfFile,
    pdfFileError,
    handleSelectPdfFile,
    handleRemovePdfFile,
    previewMode,
    setPreviewMode,
    selectedPreviewFile,
    previewAssetUrl,
    previewUrlValue,
    setPreviewUrlValue,
    previewFileError,
    handleSelectPreviewFile,
    handleRemovePreviewFile,
    handleTitleChange,
    handleSlugChange,
    handleFieldChange,
    toggleCourseId,
    toggleExamId,
    handleSubmit,
  } = useNoteEditor(initialNote)
  const router = useRouter()
  useUnsavedChanges(dirty)

  const backHref = isEditing && initialNote ? `/admin/notes/${initialNote.id}` : '/admin/notes'
  const handleCancel = () => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }
  const onSubmit = (event: React.FormEvent) => {
    handleSubmit(event)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const saveLabel = isEditing ? 'Save changes' : 'Create note'

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: NOTE_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <AdminPageHeader
        back={{ href: backHref, label: isEditing ? 'Note' : 'Notes' }}
        title={isEditing ? `Edit ${initialNote?.title ?? 'note'}` : 'New note'}
        actions={
          <>
            <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {saveLabel}
            </Button>
          </>
        }
      />

      {apiNotice ? (
        <div role="status" className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground">
          <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          {apiNotice}
        </div>
      ) : null}

      <AdminEditorLayout
        navigation={
          <NoteEditorNav
            activeSectionId={activeSectionId}
            onSectionChange={scrollToSection}
          />
        }
      >
          <NoteBasicsSection
            formData={formData}
            errors={errors}
            onTitleChange={handleTitleChange}
            onSlugChange={handleSlugChange}
            onFieldChange={handleFieldChange}
          />

          <NoteClassificationSection
            formData={formData}
            onFieldChange={handleFieldChange}
          />

          <NoteCoverSection
            coverMode={coverMode}
            setCoverMode={setCoverMode}
            selectedCoverFile={selectedCoverFile}
            coverPreviewUrl={coverPreviewUrl}
            coverUrlValue={coverUrlValue}
            setCoverUrlValue={setCoverUrlValue}
            coverFileError={coverFileError}
            handleSelectCoverFile={handleSelectCoverFile}
            handleRemoveCoverFile={handleRemoveCoverFile}
          />

          <NotePdfAssetSection
            selectedPdfFile={selectedPdfFile}
            pdfFileError={pdfFileError}
            handleSelectPdfFile={handleSelectPdfFile}
            handleRemovePdfFile={handleRemovePdfFile}
          />

          <NotePreviewAssetSection
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            selectedPreviewFile={selectedPreviewFile}
            previewAssetUrl={previewAssetUrl}
            previewUrlValue={previewUrlValue}
            setPreviewUrlValue={setPreviewUrlValue}
            previewFileError={previewFileError}
            handleSelectPreviewFile={handleSelectPreviewFile}
            handleRemovePreviewFile={handleRemovePreviewFile}
          />

          <NotePricingSection
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />

          <NoteRelatedSection
            formData={formData}
            toggleCourseId={toggleCourseId}
            toggleExamId={toggleExamId}
          />

          <NotePublishingSection formData={formData} onChange={handleFieldChange} />

          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {saveLabel}
            </Button>
          </div>
      </AdminEditorLayout>
    </form>
  )
}
