'use client'

import * as React from 'react'
import { slugify } from '@/features/admin/utils/slug'
import type { Note, NoteType, NoteStatus, PricingType } from '@/features/notes/types/note'

export type NoteFormData = {
  title: string
  slug: string
  noteType: NoteType
  shortDescription: string
  description: string
  studyLevel: string
  stream: string
  subject: string
  authorName: string
  providerName: string
  pricingType: PricingType
  priceRupees: string
  courseIds: string[]
  examIds: string[]
  status: NoteStatus
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 
const MAX_PDF_SIZE_BYTES = 25 * 1024 * 1024 

export function useNoteEditor(initialNote?: Note | null) {
  const isEditing = !!initialNote

  const [formData, setFormData] = React.useState<NoteFormData>({
    title: initialNote?.title || '',
    slug: initialNote?.slug || '',
    noteType: initialNote?.noteType || 'chapter_notes',
    shortDescription: initialNote?.shortDescription || '',
    description: initialNote?.description || '',
    studyLevel: initialNote?.studyLevel || 'undergraduate',
    stream: initialNote?.stream || 'engineering_technology',
    subject: initialNote?.subject || '',
    authorName: initialNote?.authorName || '',
    providerName: initialNote?.providerName || '',
    pricingType: initialNote?.pricingType || 'free',
    priceRupees: initialNote?.pricePaise ? (initialNote.pricePaise / 100).toString() : '',
    courseIds: initialNote?.courseIds || [],
    examIds: initialNote?.examIds || [],
    status: initialNote?.status || 'draft',
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [apiNotice, setApiNotice] = React.useState<string | null>(null)

  
  const [coverMode, setCoverMode] = React.useState<'upload' | 'url'>(
    initialNote?.coverImage ? 'url' : 'upload'
  )
  const [selectedCoverFile, setSelectedCoverFile] = React.useState<File | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = React.useState<string | null>(null)
  const [coverUrlValue, setCoverUrlValue] = React.useState<string>(initialNote?.coverImage || '')
  const [coverFileError, setCoverFileError] = React.useState<string | null>(null)

  
  const [selectedPdfFile, setSelectedPdfFile] = React.useState<File | null>(null)
  const [pdfFileError, setPdfFileError] = React.useState<string | null>(null)

  
  const [previewMode, setPreviewMode] = React.useState<'upload' | 'url'>(
    initialNote?.previewAsset?.publicUrl ? 'url' : 'upload'
  )
  const [selectedPreviewFile, setSelectedPreviewFile] = React.useState<File | null>(null)
  const [previewAssetUrl, setPreviewAssetUrl] = React.useState<string | null>(null)
  const [previewUrlValue, setPreviewUrlValue] = React.useState<string>(
    initialNote?.previewAsset?.publicUrl || ''
  )
  const [previewFileError, setPreviewFileError] = React.useState<string | null>(null)

  
  const snapshot = JSON.stringify([formData, coverUrlValue, previewUrlValue, !!selectedCoverFile, !!selectedPdfFile, !!selectedPreviewFile])
  const [initialSnapshot] = React.useState(snapshot)
  const dirty = snapshot !== initialSnapshot

  const coverPreviewUrlRef = React.useRef<string | null>(null)
  coverPreviewUrlRef.current = coverPreviewUrl
  const previewAssetUrlRef = React.useRef<string | null>(null)
  previewAssetUrlRef.current = previewAssetUrl

  React.useEffect(() => {
    return () => {
      if (coverPreviewUrlRef.current) {
        URL.revokeObjectURL(coverPreviewUrlRef.current)
      }
      if (previewAssetUrlRef.current) {
        URL.revokeObjectURL(previewAssetUrlRef.current)
      }
    }
  }, [])

  const handleSelectCoverFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setCoverFileError('Please select a valid image file (PNG, JPG, WebP).')
      return
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setCoverFileError('Cover image size must not exceed 5 MB.')
      return
    }
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl)
    }
    const objectUrl = URL.createObjectURL(file)
    setSelectedCoverFile(file)
    setCoverPreviewUrl(objectUrl)
    setCoverFileError(null)
  }

  const handleRemoveCoverFile = () => {
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl)
    }
    setSelectedCoverFile(null)
    setCoverPreviewUrl(null)
    setCoverFileError(null)
  }

  const handleSelectPdfFile = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setPdfFileError('Please select a valid PDF document (application/pdf).')
      return
    }
    if (file.size > MAX_PDF_SIZE_BYTES) {
      setPdfFileError('PDF document size must not exceed 25 MB.')
      return
    }
    setSelectedPdfFile(file)
    setPdfFileError(null)
  }

  const handleRemovePdfFile = () => {
    setSelectedPdfFile(null)
    setPdfFileError(null)
  }

  const handleSelectPreviewFile = (file: File) => {
    if (file.size > MAX_PDF_SIZE_BYTES) {
      setPreviewFileError('Sample file size must not exceed 25 MB.')
      return
    }
    if (previewAssetUrl) {
      URL.revokeObjectURL(previewAssetUrl)
    }
    const objectUrl = URL.createObjectURL(file)
    setSelectedPreviewFile(file)
    setPreviewAssetUrl(objectUrl)
    setPreviewFileError(null)
  }

  const handleRemovePreviewFile = () => {
    if (previewAssetUrl) {
      URL.revokeObjectURL(previewAssetUrl)
    }
    setSelectedPreviewFile(null)
    setPreviewAssetUrl(null)
    setPreviewFileError(null)
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

  const handleFieldChange = (key: keyof NoteFormData, value: NoteFormData[keyof NoteFormData]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })
    }
  }

  const toggleCourseId = (courseId: string) => {
    setFormData((prev) => {
      const exists = prev.courseIds.includes(courseId)
      return {
        ...prev,
        courseIds: exists
          ? prev.courseIds.filter((id) => id !== courseId)
          : [...prev.courseIds, courseId],
      }
    })
  }

  const toggleExamId = (examId: string) => {
    setFormData((prev) => {
      const exists = prev.examIds.includes(examId)
      return {
        ...prev,
        examIds: exists
          ? prev.examIds.filter((id) => id !== examId)
          : [...prev.examIds, examId],
      }
    })
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!formData.title.trim()) {
      errs.title = 'Add a title.'
    }

    if (!formData.slug.trim()) {
      errs.slug = 'Add a title to create the address.'
    }

    if (formData.pricingType === 'paid') {
      const priceNum = parseFloat(formData.priceRupees)
      if (isNaN(priceNum) || priceNum <= 0) {
        errs.priceRupees = 'Enter a price above ₹0.'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setApiNotice(null)

    const isValid = validate()
    if (!isValid) return

    const hasLocalFiles = !!selectedCoverFile || !!selectedPdfFile || !!selectedPreviewFile
    if (hasLocalFiles) {
      setApiNotice('Saving and file upload aren’t connected yet, so these changes are not stored.')
    } else {
      setApiNotice('Saving isn’t connected yet, so these changes are not stored.')
    }
  }

  return {
    isEditing,
    dirty,
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
    handleFieldChange,
    toggleCourseId,
    toggleExamId,
    handleSubmit,
  }
}
