'use client'

import * as React from 'react'
import { slugify } from '@/features/admin/utils/slug'
import type {
  ContentEntry,
  ContentType,
  ContentStatus,
  ContentCategory,
  RelatedEntityType,
  RelatedEntityRef,
} from '@/features/content/types/content'

export type ContentFormData = {
  title: string
  slug: string
  type: ContentType
  category: ContentCategory
  excerpt: string
  body: string
  authorName: string
  heroImage: string
  status: ContentStatus
  tagsString: string
  relatedEntityRefs: RelatedEntityRef[]
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

export function useContentEditor(initialEntry?: ContentEntry | null) {
  const isEditing = !!initialEntry

  const [formData, setFormData] = React.useState<ContentFormData>({
    title: initialEntry?.title || '',
    slug: initialEntry?.slug || '',
    type: initialEntry?.type || 'article',
    category: initialEntry?.category || 'general',
    excerpt: initialEntry?.excerpt || '',
    body: initialEntry?.body || '',
    authorName: initialEntry?.authorName || '',
    heroImage: initialEntry?.heroImage || '',
    status: initialEntry?.status || 'draft',
    tagsString: initialEntry?.tags?.join(', ') || '',
    relatedEntityRefs: initialEntry?.relatedEntityRefs || [],
  })

  const [initialSnapshot] = React.useState(() => JSON.stringify(formData))

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [apiNotice, setApiNotice] = React.useState<string | null>(null)

  
  const [heroMediaMode, setHeroMediaMode] = React.useState<'upload' | 'url'>(
    initialEntry?.heroImage ? 'url' : 'upload'
  )
  const [selectedHeroFile, setSelectedHeroFile] = React.useState<File | null>(null)
  const [heroPreviewUrl, setHeroPreviewUrl] = React.useState<string | null>(null)
  const [heroFileError, setHeroFileError] = React.useState<string | null>(null)

  
  const heroPreviewUrlRef = React.useRef<string | null>(null)
  heroPreviewUrlRef.current = heroPreviewUrl

  React.useEffect(() => {
    return () => {
      if (heroPreviewUrlRef.current) {
        URL.revokeObjectURL(heroPreviewUrlRef.current)
      }
    }
  }, [])

  const handleSelectHeroFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setHeroFileError('Please select a valid image file (PNG, JPG, WebP, etc.).')
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setHeroFileError('Image size must not exceed 5 MB.')
      return
    }

    if (heroPreviewUrl) {
      URL.revokeObjectURL(heroPreviewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setSelectedHeroFile(file)
    setHeroPreviewUrl(objectUrl)
    setHeroFileError(null)
  }

  const handleRemoveHeroFile = () => {
    if (heroPreviewUrl) {
      URL.revokeObjectURL(heroPreviewUrl)
    }
    setSelectedHeroFile(null)
    setHeroPreviewUrl(null)
    setHeroFileError(null)
  }

  
  const handleTitleChange = (title: string) => {
    setFormData((prev) => (isEditing ? { ...prev, title } : { ...prev, title, slug: slugify(title) }))
    if (errors.title || errors.slug) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.title
        delete copy.slug
        return copy
      })
    }
  }

  const handleChange = <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const handleAddRelatedEntity = (entityType: RelatedEntityType, entityId: string) => {
    if (!entityId) return
    const exists = formData.relatedEntityRefs.some(
      (ref) => ref.entityType === entityType && ref.entityId === entityId
    )
    if (exists) return

    setFormData((prev) => ({
      ...prev,
      relatedEntityRefs: [...prev.relatedEntityRefs, { entityType, entityId }],
    }))
  }

  const handleRemoveRelatedEntity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      relatedEntityRefs: prev.relatedEntityRefs.filter((_, i) => i !== index),
    }))
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Title is required.'
    }
    if (!formData.slug.trim()) {
      nextErrors.slug = 'Add a title to create the address.'
    }
    if (!formData.body.trim()) {
      nextErrors.body = 'Body is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validate()) return

    if (selectedHeroFile) {
      setApiNotice('Saving needs the Admin API, and image upload needs the storage API. Neither is connected yet, so nothing was saved.')
    } else {
      setApiNotice('Saving needs the Admin API, which is not connected yet, so nothing was saved.')
    }
  }

  const isDirty = !!selectedHeroFile || JSON.stringify(formData) !== initialSnapshot

  return {
    formData,
    isDirty,
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
    handleChange,
    handleAddRelatedEntity,
    handleRemoveRelatedEntity,
    handleSubmit,
  }
}
