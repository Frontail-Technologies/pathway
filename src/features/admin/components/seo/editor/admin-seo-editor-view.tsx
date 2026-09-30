'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { useSeoEditor } from './use-seo-editor'
import { SeoEditorNav, SEO_EDITOR_SECTIONS } from './seo-editor-nav'
import { SeoTargetSection } from './seo-target-section'
import { SeoSearchMetadataSection } from './seo-search-metadata-section'
import { SeoCanonicalRobotsSection } from './seo-canonical-robots-section'
import { SeoSocialSection } from './seo-social-section'
import { SeoPreviewCard } from './seo-preview-card'
import { SeoPublishingSection } from './seo-publishing-section'

export function AdminSeoEditorView({
  initialRecord,
}: {
  initialRecord?: AdminSeoRecord
}) {
  const {
    state,
    errors,
    isSubmitting,
    isEditing,
    activeSection,
    targetOptions,
    baselineMetadata,
    resolvedMetadata,
    setActiveSection,
    handleTargetTypeChange,
    handleTargetIdChange,
    handleFieldChange,
    handleAddSecondaryKeyword,
    handleRemoveSecondaryKeyword,
    handleImageFileSelect,
    handleRemoveImage,
    handleSubmit,
  } = useSeoEditor(initialRecord)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: SEO_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/admin/seo"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>SEO Metadata</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            {isEditing ? 'Edit SEO Override' : 'Create SEO Override'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                {isEditing ? 'Edit SEO Override' : 'Create SEO Override'}
              </h1>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
              >
                {isEditing ? 'Edit Mode' : 'New Override'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AdminEditorLayout
          navigation={
            <SeoEditorNav
              activeSectionId={activeSectionId}
              onSectionChange={scrollToSection}
            />
          }
        >
            <SeoTargetSection
              targetType={state.targetType}
              targetId={state.targetId}
              targetOptions={targetOptions}
              onTargetTypeChange={handleTargetTypeChange}
              onTargetIdChange={handleTargetIdChange}
              isEditing={isEditing}
              typeError={errors.targetType}
              error={errors.targetId}
            />

            <SeoSearchMetadataSection
              title={state.title}
              description={state.description}
              primaryKeyword={state.primaryKeyword}
              secondaryKeywords={state.secondaryKeywords}
              secondaryKeywordInput={state.secondaryKeywordInput}
              onTitleChange={(val) => handleFieldChange('title', val)}
              onDescriptionChange={(val) => handleFieldChange('description', val)}
              onPrimaryKeywordChange={(val) => handleFieldChange('primaryKeyword', val)}
              onSecondaryKeywordInputChange={(val) => handleFieldChange('secondaryKeywordInput', val)}
              onAddSecondaryKeyword={handleAddSecondaryKeyword}
              onRemoveSecondaryKeyword={handleRemoveSecondaryKeyword}
              baselineTitle={baselineMetadata.title}
              baselineDescription={baselineMetadata.description}
              error={errors.title}
            />

            <SeoCanonicalRobotsSection
              canonicalPath={state.canonicalPath}
              overrideRobots={state.overrideRobots}
              robotsIndex={state.robotsIndex}
              robotsFollow={state.robotsFollow}
              onCanonicalPathChange={(val) => handleFieldChange('canonicalPath', val)}
              onOverrideRobotsChange={(val) => handleFieldChange('overrideRobots', val)}
              onRobotsIndexChange={(val) => handleFieldChange('robotsIndex', val)}
              onRobotsFollowChange={(val) => handleFieldChange('robotsFollow', val)}
              baselineCanonical={baselineMetadata.canonicalPath}
              error={errors.canonicalPath}
            />

            <SeoSocialSection
              ogTitle={state.ogTitle}
              ogDescription={state.ogDescription}
              ogImage={state.ogImage}
              ogImageMode={state.ogImageMode}
              ogImagePreviewUrl={state.ogImagePreviewUrl}
              onOgTitleChange={(val) => handleFieldChange('ogTitle', val)}
              onOgDescriptionChange={(val) => handleFieldChange('ogDescription', val)}
              onOgImageChange={(val) => handleFieldChange('ogImage', val)}
              onOgImageModeChange={(mode) => handleFieldChange('ogImageMode', mode)}
              onImageFileSelect={handleImageFileSelect}
              onRemoveImage={handleRemoveImage}
              baselineTitle={baselineMetadata.ogTitle || baselineMetadata.title}
              baselineDescription={baselineMetadata.ogDescription || baselineMetadata.description}
            />

            <SeoPreviewCard metadata={resolvedMetadata} />

            <SeoPublishingSection
              isEditing={isEditing}
              isSubmitting={isSubmitting}
            />
        </AdminEditorLayout>
      </form>
    </div>
  )
}
