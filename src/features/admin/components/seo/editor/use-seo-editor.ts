'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  SeoTargetType,
  SeoMetadataRecord,
  ResolvedSeoMetadata,
  SeoTargetOption,
} from '@/features/seo/types/seo-metadata'
import {
  validateCanonicalPath,
  resolveEffectiveSeoMetadata,
  getGeneratedMetadataForSeoTarget,
} from '@/features/seo/selectors/seo-selectors'
import { getTargetOptions, AdminSeoRecord } from '@/features/admin/data/admin-seo'

export interface SeoEditorState {
  targetType: SeoTargetType | ''
  targetId: string
  title: string
  description: string
  primaryKeyword: string
  secondaryKeywords: string[]
  secondaryKeywordInput: string
  canonicalPath: string
  overrideRobots: boolean
  robotsIndex: boolean
  robotsFollow: boolean
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageMode: 'upload' | 'url'
  ogImageFile: File | null
  ogImagePreviewUrl: string | null
}

export function useSeoEditor(initialRecord?: AdminSeoRecord | SeoMetadataRecord) {
  const router = useRouter()
  const isEditing = Boolean(initialRecord)

  const initialTargetType: SeoTargetType | '' = initialRecord?.targetType || ''
  const initialTargetId = initialRecord?.targetType === 'static_page'
    ? initialRecord?.routePath || ''
    : initialRecord?.targetId || ''

  const initialOverrideRobots = Boolean(
    initialRecord && (initialRecord.robotsIndex !== undefined || initialRecord.robotsFollow !== undefined)
  )

  const [state, setState] = React.useState<SeoEditorState>({
    targetType: initialTargetType,
    targetId: initialTargetId,
    title: initialRecord?.title || '',
    description: initialRecord?.description || '',
    primaryKeyword: initialRecord?.primaryKeyword || '',
    secondaryKeywords: initialRecord?.secondaryKeywords || [],
    secondaryKeywordInput: '',
    canonicalPath: initialRecord?.canonicalPath || '',
    overrideRobots: initialOverrideRobots,
    robotsIndex: initialRecord?.robotsIndex ?? true,
    robotsFollow: initialRecord?.robotsFollow ?? true,
    ogTitle: initialRecord?.ogTitle || '',
    ogDescription: initialRecord?.ogDescription || '',
    ogImage: initialRecord?.ogImage || '',
    ogImageMode: initialRecord?.ogImage?.startsWith('http') ? 'url' : 'upload',
    ogImageFile: null,
    ogImagePreviewUrl: initialRecord?.ogImage || null,
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('target')

  
  React.useEffect(() => {
    return () => {
      if (state.ogImagePreviewUrl && state.ogImagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(state.ogImagePreviewUrl)
      }
    }
  }, [state.ogImagePreviewUrl])

  const targetOptions: SeoTargetOption[] = React.useMemo(() => {
    if (!state.targetType) return []
    return getTargetOptions(state.targetType)
  }, [state.targetType])

  const baselineMetadata = React.useMemo(() => {
    if (!state.targetType || !state.targetId) {
      return {
        title: 'Pathway — Education discovery, made clearer',
        description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
        canonicalPath: '/',
        ogTitle: 'Pathway — Education discovery, made clearer',
        ogDescription: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
        targetLabel: state.targetType ? 'Select target entity' : 'Unselected target',
        targetRoutePath: '/',
      }
    }
    return getGeneratedMetadataForSeoTarget(state.targetType, state.targetId)
  }, [state.targetType, state.targetId])

  const resolvedMetadata: ResolvedSeoMetadata = React.useMemo(() => {
    const effectiveTargetType = state.targetType || 'static_page'
    const draftRecord: Partial<SeoMetadataRecord> = {
      targetType: effectiveTargetType,
      targetId: state.targetType === 'static_page' ? undefined : state.targetId || undefined,
      routePath: state.targetType === 'static_page' ? state.targetId || undefined : undefined,
      title: state.title.trim() || undefined,
      description: state.description.trim() || undefined,
      primaryKeyword: state.primaryKeyword.trim() || undefined,
      secondaryKeywords: state.secondaryKeywords,
      canonicalPath: state.canonicalPath.trim() || undefined,
      robotsIndex: state.overrideRobots ? state.robotsIndex : undefined,
      robotsFollow: state.overrideRobots ? state.robotsFollow : undefined,
      ogTitle: state.ogTitle.trim() || undefined,
      ogDescription: state.ogDescription.trim() || undefined,
      ogImage: (state.ogImagePreviewUrl || state.ogImage).trim() || undefined,
    }
    return resolveEffectiveSeoMetadata(draftRecord, effectiveTargetType, state.targetId || '/')
  }, [state])

  const handleTargetTypeChange = (type: SeoTargetType) => {
    setState((prev) => ({
      ...prev,
      targetType: type,
      targetId: '',
    }))
    if (errors.targetType || errors.targetId) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.targetType
        delete next.targetId
        return next
      })
    }
  }

  const handleTargetIdChange = (id: string) => {
    setState((prev) => ({ ...prev, targetId: id }))
    if (errors.targetId) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.targetId
        return next
      })
    }
  }

  const handleFieldChange = <K extends keyof SeoEditorState>(field: K, value: SeoEditorState[K]) => {
    setState((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleAddSecondaryKeyword = (rawKeyword?: string) => {
    const kw = (rawKeyword !== undefined ? rawKeyword : state.secondaryKeywordInput).trim()
    if (!kw) return

    
    const normalized = kw.replace(/\s+/g, ' ')

    
    const exists = state.secondaryKeywords.some(
      (k) => k.toLowerCase() === normalized.toLowerCase()
    )

    if (!exists) {
      setState((prev) => ({
        ...prev,
        secondaryKeywords: [...prev.secondaryKeywords, normalized],
        secondaryKeywordInput: '',
      }))
    } else {
      setState((prev) => ({
        ...prev,
        secondaryKeywordInput: '',
      }))
    }
  }

  const handleRemoveSecondaryKeyword = (index: number) => {
    setState((prev) => ({
      ...prev,
      secondaryKeywords: prev.secondaryKeywords.filter((_, i) => i !== index),
    }))
  }

  const handleImageFileSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size exceeds 5MB limit.')
      return
    }

    if (state.ogImagePreviewUrl && state.ogImagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(state.ogImagePreviewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setState((prev) => ({
      ...prev,
      ogImageFile: file,
      ogImagePreviewUrl: objectUrl,
      ogImage: file.name,
    }))
    toast.info('Image selected for local preview. Uploading requires the Admin Storage API.')
  }

  const handleRemoveImage = () => {
    if (state.ogImagePreviewUrl && state.ogImagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(state.ogImagePreviewUrl)
    }
    setState((prev) => ({
      ...prev,
      ogImageFile: null,
      ogImagePreviewUrl: null,
      ogImage: '',
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!state.targetType || state.targetType.trim() === '') {
      newErrors.targetType = 'Please select a target type.'
    }

    if (!state.targetId || state.targetId.trim() === '') {
      newErrors.targetId = 'Please select a valid target page or entity.'
    }

    if (state.canonicalPath && state.canonicalPath.trim() !== '') {
      const canonicalCheck = validateCanonicalPath(state.canonicalPath)
      if (!canonicalCheck.isValid) {
        newErrors.canonicalPath = canonicalCheck.error || 'Invalid canonical path.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please resolve validation errors before saving.')
      return
    }

    toast.info('Saving SEO metadata requires the Admin API.')
  }

  return {
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
  }
}

