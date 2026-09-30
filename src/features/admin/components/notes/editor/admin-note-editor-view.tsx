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
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export function AdminNoteEditorView({
  initialNote,
}: {
  initialNote?: Note | null
}) {
  const {
    isEditing,
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

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: NOTE_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto">
      { }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/notes"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notes & Study Material</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
            {isEditing ? `Edit: ${initialNote?.title}` : 'Create Study Note'}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/notes"
            className="inline-flex items-center justify-center h-9 px-3.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="h-9 px-4 text-xs font-semibold shadow-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>{isEditing ? 'Save Changes' : 'Create Study Note'}</span>
          </Button>
        </div>
      </div>

      { }
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

          <NotePublishingSection
            formData={formData}
            isEditing={isEditing}
            apiNotice={apiNotice}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
      </AdminEditorLayout>
    </form>
  )
}
