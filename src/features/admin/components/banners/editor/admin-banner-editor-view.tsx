'use client'

import * as React from 'react'
import type { Banner } from '@/features/banners/types/banner'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { useBannerEditor } from './use-banner-editor'
import { BannerEditorNav, BANNER_EDITOR_SECTIONS } from './banner-editor-nav'
import { BannerBasicsSection } from './banner-basics-section'
import { BannerMediaSection } from './banner-media-section'
import { BannerCtaSection } from './banner-cta-section'
import { BannerPlacementSection } from './banner-placement-section'
import { BannerScheduleSection } from './banner-schedule-section'
import { BannerPublishingSection } from './banner-publishing-section'
import { BannerPreviewCard } from './banner-preview-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export function AdminBannerEditorView({
  initialBanner,
}: {
  initialBanner?: Banner | null
}) {
  const {
    isEditing,
    formData,
    errors,
    apiNotice,
    desktopMode,
    setDesktopMode,
    selectedDesktopFile,
    desktopPreviewUrl,
    desktopUrlValue,
    setDesktopUrlValue,
    desktopFileError,
    handleSelectDesktopFile,
    handleRemoveDesktopFile,
    mobileMode,
    setMobileMode,
    selectedMobileFile,
    mobilePreviewUrl,
    mobileUrlValue,
    setMobileUrlValue,
    mobileFileError,
    handleSelectMobileFile,
    handleRemoveMobileFile,
    effectiveDesktopImage,
    effectiveMobileImage,
    handleFieldChange,
    handleSubmit,
  } = useBannerEditor(initialBanner)

  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: BANNER_EDITOR_SECTIONS.map((section) => section.id),
    offset: 120,
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto">
      { }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Banners</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
            {isEditing ? `Edit Banner: ${initialBanner?.name}` : 'Create Banner'}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            render={<Link href="/admin/banners">Cancel</Link>}
            className="text-xs"
          />
          <Button type="submit" size="sm" className="text-xs font-semibold gap-1.5">
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Create Banner'}</span>
          </Button>
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <BannerBasicsSection
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
          <BannerMediaSection
            placement={formData.placement}
            desktopMode={desktopMode}
            setDesktopMode={setDesktopMode}
            selectedDesktopFile={selectedDesktopFile}
            desktopPreviewUrl={desktopPreviewUrl}
            desktopUrlValue={desktopUrlValue}
            setDesktopUrlValue={setDesktopUrlValue}
            desktopFileError={desktopFileError}
            handleSelectDesktopFile={handleSelectDesktopFile}
            handleRemoveDesktopFile={handleRemoveDesktopFile}
            mobileMode={mobileMode}
            setMobileMode={setMobileMode}
            selectedMobileFile={selectedMobileFile}
            mobilePreviewUrl={mobilePreviewUrl}
            mobileUrlValue={mobileUrlValue}
            setMobileUrlValue={setMobileUrlValue}
            mobileFileError={mobileFileError}
            handleSelectMobileFile={handleSelectMobileFile}
            handleRemoveMobileFile={handleRemoveMobileFile}
            formData={formData}
            onChange={handleFieldChange}
          />
          <BannerCtaSection
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
          <BannerPlacementSection
            formData={formData}
            onChange={handleFieldChange}
          />
          <BannerScheduleSection
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
          <BannerPublishingSection
            isEditing={isEditing}
            formData={formData}
            apiNotice={apiNotice}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:col-span-4 lg:self-start">
          <BannerPreviewCard
            formData={formData}
            effectiveDesktopImage={effectiveDesktopImage}
            effectiveMobileImage={effectiveMobileImage}
          />
          <BannerEditorNav
            activeSectionId={activeSectionId}
            onSectionChange={scrollToSection}
          />
        </aside>
      </div>
    </form>
  )
}
