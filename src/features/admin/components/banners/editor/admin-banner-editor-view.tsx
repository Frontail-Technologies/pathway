'use client'

import { useRouter } from 'next/navigation'
import type { Banner } from '@/features/banners/types/banner'
import { Button } from '@/components/ui/button'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader, Panel } from '../../kit'
import { FormNotice } from '../shared/banner-form'
import { BannerPreview } from '../shared/banner-preview'
import { useBannerEditor } from './use-banner-editor'
import { BannerEditorNav, BANNER_EDITOR_SECTIONS } from './banner-editor-nav'
import { BannerBasicsSection } from './banner-basics-section'
import { BannerMediaSection } from './banner-media-section'
import { BannerCtaSection } from './banner-cta-section'
import { BannerPlacementSection } from './banner-placement-section'
import { BannerScheduleSection } from './banner-schedule-section'
import { BannerPublishingSection } from './banner-publishing-section'

export function AdminBannerEditorView({ initialBanner }: { initialBanner?: Banner | null }) {
  const router = useRouter()
  const editor = useBannerEditor(initialBanner)
  const { isEditing, isDirty, formData, errors, apiNotice, handleFieldChange, handleSubmit } = editor

  useUnsavedChanges(isDirty)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: BANNER_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  const backHref = isEditing && initialBanner ? `/admin/banners/${initialBanner.id}` : '/admin/banners'
  const handleCancel = () => {
    if (isDirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }

  const actions = (
    <>
      <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" size="sm">
        {isEditing ? 'Save changes' : 'Create banner'}
      </Button>
    </>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 pb-12">
      <AdminPageHeader
        back={isEditing && initialBanner ? { href: backHref, label: initialBanner.name } : { href: '/admin/banners', label: 'Banners' }}
        title={isEditing ? 'Edit banner' : 'New banner'}
        actions={actions}
      />

      {apiNotice ? <FormNotice>{apiNotice}</FormNotice> : null}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <BannerBasicsSection formData={formData} errors={errors} onChange={handleFieldChange} />
          <BannerMediaSection
            placement={formData.placement}
            desktopMode={editor.desktopMode}
            setDesktopMode={editor.setDesktopMode}
            selectedDesktopFile={editor.selectedDesktopFile}
            desktopPreviewUrl={editor.desktopPreviewUrl}
            desktopUrlValue={editor.desktopUrlValue}
            setDesktopUrlValue={editor.setDesktopUrlValue}
            desktopFileError={editor.desktopFileError}
            handleSelectDesktopFile={editor.handleSelectDesktopFile}
            handleRemoveDesktopFile={editor.handleRemoveDesktopFile}
            mobileMode={editor.mobileMode}
            setMobileMode={editor.setMobileMode}
            selectedMobileFile={editor.selectedMobileFile}
            mobilePreviewUrl={editor.mobilePreviewUrl}
            mobileUrlValue={editor.mobileUrlValue}
            setMobileUrlValue={editor.setMobileUrlValue}
            mobileFileError={editor.mobileFileError}
            handleSelectMobileFile={editor.handleSelectMobileFile}
            handleRemoveMobileFile={editor.handleRemoveMobileFile}
            formData={formData}
            onChange={handleFieldChange}
          />
          <BannerCtaSection formData={formData} errors={errors} onChange={handleFieldChange} />
          <BannerPlacementSection formData={formData} onChange={handleFieldChange} />
          <BannerScheduleSection formData={formData} errors={errors} onChange={handleFieldChange} />
          <BannerPublishingSection formData={formData} onChange={handleFieldChange} />

          <div className="flex items-center justify-end gap-2 border-t border-border pt-4">{actions}</div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[4.5rem] lg:col-span-4 lg:self-start">
          <Panel title="Preview">
            <BannerPreview
              placeholders
              data={{ ...formData, image: editor.effectiveDesktopImage, mobileImage: editor.effectiveMobileImage }}
            />
          </Panel>
          <div className="hidden lg:block">
            <BannerEditorNav activeSectionId={activeSectionId} onSectionChange={scrollToSection} />
          </div>
        </aside>
      </div>
    </form>
  )
}
