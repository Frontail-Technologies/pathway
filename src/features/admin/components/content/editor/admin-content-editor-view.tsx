'use client'

import { useRouter } from 'next/navigation'
import type { ContentEntry } from '@/features/content/types/content'
import { Button } from '@/components/ui/button'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader } from '../../kit'
import { AdminEditorLayout } from '../../shared/admin-editor-layout'
import { FormNotice } from '../shared/content-form'
import { useContentEditor } from './use-content-editor'
import { ContentEditorNav, CONTENT_EDITOR_SECTIONS } from './content-editor-nav'
import { ContentBasicsSection } from './content-basics-section'
import { ContentBodySection } from './content-body-section'
import { ContentMediaSection } from './content-media-section'
import { ContentTaxonomySection } from './content-taxonomy-section'
import { ContentRelatedEntitiesSection } from './content-related-entities-section'
import { ContentPublishingSection } from './content-publishing-section'
import { AdminFormFooter } from '../../admin-form-footer'

export function AdminContentEditorView({ initialEntry }: { initialEntry?: ContentEntry | null }) {
  const router = useRouter()
  const editor = useContentEditor(initialEntry)
  const { formData, errors, isEditing, isDirty, apiNotice, handleChange, handleSubmit } = editor

  useUnsavedChanges(isDirty)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: CONTENT_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  const backHref = isEditing && initialEntry ? `/admin/content/${initialEntry.id}` : '/admin/content'
  const handleCancel = () => {
    if (isDirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }

  return (
    <form id="content-editor-form" onSubmit={handleSubmit} noValidate className="space-y-6">
      <AdminPageHeader
        back={isEditing && initialEntry ? { href: backHref, label: initialEntry.title } : { href: '/admin/content', label: 'Articles' }}
        title={isEditing ? 'Edit article' : 'New article'}
      />

      {apiNotice ? <FormNotice>{apiNotice}</FormNotice> : null}

      <AdminEditorLayout navigation={<ContentEditorNav activeSectionId={activeSectionId} onSectionChange={scrollToSection} />}>
        <ContentBasicsSection formData={formData} errors={errors} onTitleChange={editor.handleTitleChange} locked={editor.isEditing} onChange={handleChange} />
        <ContentBodySection formData={formData} errors={errors} onChange={handleChange} />
        <ContentMediaSection
          mode={editor.heroMediaMode}
          onModeChange={editor.setHeroMediaMode}
          selectedFile={editor.selectedHeroFile}
          previewUrl={editor.heroPreviewUrl}
          fileError={editor.heroFileError}
          onSelectFile={editor.handleSelectHeroFile}
          onRemoveFile={editor.handleRemoveHeroFile}
          urlValue={formData.heroImage}
          onUrlChange={(value) => handleChange('heroImage', value)}
        />
        <ContentTaxonomySection formData={formData} onChange={handleChange} />
        <ContentRelatedEntitiesSection formData={formData} onAddRelatedEntity={editor.handleAddRelatedEntity} onRemoveRelatedEntity={editor.handleRemoveRelatedEntity} />
        <ContentPublishingSection formData={formData} onChange={handleChange} />
      </AdminEditorLayout>
      <AdminFormFooter formId="content-editor-form" submitLabel={isEditing ? 'Save changes' : 'Create article'} onCancel={handleCancel} />
    </form>
  )
}
