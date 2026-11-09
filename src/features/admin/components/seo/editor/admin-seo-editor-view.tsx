'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader } from '../../kit'
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
import { AdminFormFooter } from '../../admin-form-footer'

export function AdminSeoEditorView({
  initialRecord,
}: {
  initialRecord?: AdminSeoRecord
}) {
  const {
    dirty,
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

  const router = useRouter()
  useUnsavedChanges(dirty)
  const backHref = isEditing && initialRecord ? `/admin/seo/${initialRecord.id}` : '/admin/seo'
  const handleCancel = () => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }
  const saveLabel = isEditing ? 'Save changes' : 'Create override'
  return (
    <form id="seo-editor-form" onSubmit={handleSubmit} className="space-y-6">
      <AdminPageHeader
        back={{ href: backHref, label: isEditing ? 'SEO override' : 'SEO' }}
        title={isEditing ? `Edit SEO for ${initialRecord?.targetLabel ?? 'page'}` : 'New SEO override'}
      />

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
        </AdminEditorLayout>
      <AdminFormFooter formId="seo-editor-form" submitLabel={isSubmitting ? 'Saving…' : saveLabel} onCancel={handleCancel} submitting={isSubmitting} />
    </form>
  )
}
