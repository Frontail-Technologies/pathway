'use client'

import * as React from 'react'
import type { ContentEntry } from '@/features/content/types/content'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { useContentEditor } from './use-content-editor'
import { ContentEditorNav, CONTENT_EDITOR_SECTIONS } from './content-editor-nav'
import { ContentBasicsSection } from './content-basics-section'
import { ContentBodySection } from './content-body-section'
import { ContentMediaSection } from './content-media-section'
import { ContentTaxonomySection } from './content-taxonomy-section'
import { ContentRelatedEntitiesSection } from './content-related-entities-section'
import { ContentPublishingSection } from './content-publishing-section'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export function AdminContentEditorView({
  initialEntry,
}: {
  initialEntry?: ContentEntry | null
}) {
  const {
    formData,
    errors,
    isEditing,
    apiNotice,
    heroMediaMode,
    setHeroMediaMode,
    selectedHeroFile,
    heroPreviewUrl,
    heroFileError,
    handleSelectHeroFile,
    handleRemoveHeroFile,
    handleTitleChange,
    handleSlugChange,
    handleChange,
    handleAddRelatedEntity,
    handleRemoveRelatedEntity,
    handleSubmit,
  } = useContentEditor(initialEntry)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: CONTENT_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      { }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles & Content</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
            {isEditing ? `Edit: ${initialEntry?.title}` : 'Create New Article / Content'}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/content"
            className="inline-flex items-center justify-center h-9 px-3.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="button"
            onClick={() => handleSubmit()}
            className="h-9 px-4 text-xs font-semibold shadow-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>{isEditing ? 'Save Changes' : 'Create Entry'}</span>
          </Button>
        </div>
      </div>

      { }
      <div className="sticky top-16 z-20 bg-background/95 pt-2 backdrop-blur">
        <ContentEditorNav
          activeSectionId={activeSectionId}
          onSectionChange={scrollToSection}
        />
      </div>

      { }
      <div className="space-y-6">
        <ContentBasicsSection
          formData={formData}
          errors={errors}
          onTitleChange={handleTitleChange}
          onSlugChange={handleSlugChange}
          onChange={handleChange}
        />

        <ContentBodySection
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        <ContentMediaSection
          mode={heroMediaMode}
          onModeChange={setHeroMediaMode}
          selectedFile={selectedHeroFile}
          previewUrl={heroPreviewUrl}
          fileError={heroFileError}
          onSelectFile={handleSelectHeroFile}
          onRemoveFile={handleRemoveHeroFile}
          urlValue={formData.heroImage}
          onUrlChange={(val) => handleChange('heroImage', val)}
        />

        <ContentTaxonomySection
          formData={formData}
          onChange={handleChange}
        />

        <ContentRelatedEntitiesSection
          formData={formData}
          onAddRelatedEntity={handleAddRelatedEntity}
          onRemoveRelatedEntity={handleRemoveRelatedEntity}
        />

        <ContentPublishingSection
          formData={formData}
          isEditing={isEditing}
          apiNotice={apiNotice}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
