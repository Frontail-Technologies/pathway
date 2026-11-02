'use client'

import * as React from 'react'
import type { Banner, BannerPlacement, BannerStatus } from '@/features/banners/types/banner'

export type BannerFormData = {
  name: string
  eyebrow: string
  title: string
  description: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  placement: BannerPlacement
  startsAt: string
  endsAt: string
  status: BannerStatus
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

export function useBannerEditor(initialBanner?: Banner | null) {
  const isEditing = !!initialBanner

  const [formData, setFormData] = React.useState<BannerFormData>({
    name: initialBanner?.name || '',
    eyebrow: initialBanner?.eyebrow || '',
    title: initialBanner?.title || '',
    description: initialBanner?.description || '',
    imageAlt: initialBanner?.imageAlt || '',
    ctaLabel: initialBanner?.ctaLabel || '',
    ctaHref: initialBanner?.ctaHref || '',
    secondaryCtaLabel: initialBanner?.secondaryCtaLabel || '',
    secondaryCtaHref: initialBanner?.secondaryCtaHref || '',
    placement: initialBanner?.placement || 'homepage_admissions',
    startsAt: initialBanner?.startsAt ? initialBanner.startsAt.slice(0, 16) : '',
    endsAt: initialBanner?.endsAt ? initialBanner.endsAt.slice(0, 16) : '',
    status: initialBanner?.status || 'draft',
  })

  const [initialSnapshot] = React.useState(() => JSON.stringify({ formData, image: initialBanner?.image || '', mobileImage: initialBanner?.mobileImage || '' }))

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [apiNotice, setApiNotice] = React.useState<string | null>(null)

  
  const [desktopMode, setDesktopMode] = React.useState<'upload' | 'url'>(
    initialBanner?.image ? 'url' : 'upload'
  )
  const [selectedDesktopFile, setSelectedDesktopFile] = React.useState<File | null>(null)
  const [desktopPreviewUrl, setDesktopPreviewUrl] = React.useState<string | null>(null)
  const [desktopUrlValue, setDesktopUrlValue] = React.useState<string>(initialBanner?.image || '')
  const [desktopFileError, setDesktopFileError] = React.useState<string | null>(null)

  
  const [mobileMode, setMobileMode] = React.useState<'upload' | 'url'>(
    initialBanner?.mobileImage ? 'url' : 'upload'
  )
  const [selectedMobileFile, setSelectedMobileFile] = React.useState<File | null>(null)
  const [mobilePreviewUrl, setMobilePreviewUrl] = React.useState<string | null>(null)
  const [mobileUrlValue, setMobileUrlValue] = React.useState<string>(initialBanner?.mobileImage || '')
  const [mobileFileError, setMobileFileError] = React.useState<string | null>(null)

  
  const desktopPreviewUrlRef = React.useRef<string | null>(null)
  desktopPreviewUrlRef.current = desktopPreviewUrl
  const mobilePreviewUrlRef = React.useRef<string | null>(null)
  mobilePreviewUrlRef.current = mobilePreviewUrl

  React.useEffect(() => {
    return () => {
      if (desktopPreviewUrlRef.current) {
        URL.revokeObjectURL(desktopPreviewUrlRef.current)
      }
      if (mobilePreviewUrlRef.current) {
        URL.revokeObjectURL(mobilePreviewUrlRef.current)
      }
    }
  }, [])

  const handleSelectDesktopFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setDesktopFileError('Please select a valid image file (PNG, JPG, WebP, etc.).')
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setDesktopFileError('Image size must not exceed 5 MB.')
      return
    }

    if (desktopPreviewUrl) {
      URL.revokeObjectURL(desktopPreviewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setSelectedDesktopFile(file)
    setDesktopPreviewUrl(objectUrl)
    setDesktopFileError(null)
  }

  const handleRemoveDesktopFile = () => {
    if (desktopPreviewUrl) {
      URL.revokeObjectURL(desktopPreviewUrl)
    }
    setSelectedDesktopFile(null)
    setDesktopPreviewUrl(null)
    setDesktopFileError(null)
  }

  const handleSelectMobileFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setMobileFileError('Please select a valid image file (PNG, JPG, WebP, etc.).')
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setMobileFileError('Image size must not exceed 5 MB.')
      return
    }

    if (mobilePreviewUrl) {
      URL.revokeObjectURL(mobilePreviewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setSelectedMobileFile(file)
    setMobilePreviewUrl(objectUrl)
    setMobileFileError(null)
  }

  const handleRemoveMobileFile = () => {
    if (mobilePreviewUrl) {
      URL.revokeObjectURL(mobilePreviewUrl)
    }
    setSelectedMobileFile(null)
    setMobilePreviewUrl(null)
    setMobileFileError(null)
  }

  const handleFieldChange = (key: keyof BannerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })
    }
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!formData.name.trim()) {
      errs.name = 'Name is required.'
    }

    if (!formData.title.trim()) {
      errs.title = 'Headline is required.'
    }

    if (formData.ctaHref && !formData.ctaHref.startsWith('/') && !formData.ctaHref.startsWith('http://') && !formData.ctaHref.startsWith('https://')) {
      errs.ctaHref = 'Use a Pathway path starting with / or a full https:// link.'
    }

    if (formData.secondaryCtaHref && !formData.secondaryCtaHref.startsWith('/') && !formData.secondaryCtaHref.startsWith('http://') && !formData.secondaryCtaHref.startsWith('https://')) {
      errs.secondaryCtaHref = 'Use a Pathway path starting with / or a full https:// link.'
    }

    if (formData.startsAt && formData.endsAt) {
      const start = new Date(formData.startsAt).getTime()
      const end = new Date(formData.endsAt).getTime()
      if (end <= start) {
        errs.endsAt = 'End must be after the start.'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiNotice(null)

    const isValid = validate()
    if (!isValid) return

    const hasLocalFile = !!selectedDesktopFile || !!selectedMobileFile
    if (hasLocalFile) {
      setApiNotice(
        'Saving needs the Admin API, and image upload needs the storage API. Neither is connected yet, so nothing was saved.'
      )
    } else {
      setApiNotice('Saving needs the Admin API, which is not connected yet, so nothing was saved.')
    }
  }

  
  const effectiveDesktopImage =
    desktopMode === 'upload'
      ? (desktopPreviewUrl ?? undefined)
      : (desktopUrlValue || undefined)
  const effectiveMobileImage =
    mobileMode === 'upload'
      ? (mobilePreviewUrl ?? undefined)
      : (mobileUrlValue || undefined)

  const isDirty =
    !!selectedDesktopFile ||
    !!selectedMobileFile ||
    JSON.stringify({ formData, image: desktopUrlValue, mobileImage: mobileUrlValue }) !== initialSnapshot

  return {
    isEditing,
    isDirty,
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
  }
}
