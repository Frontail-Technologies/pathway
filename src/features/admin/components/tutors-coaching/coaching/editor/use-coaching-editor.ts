'use client'

import { useState } from 'react'
import type {
  CoachingProviderType,
  LearningMode,
  CoachingProgram,
  CoachingFacultyNote,
  CoachingFaq,
} from '@/features/coaching/data/coaching'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export type CoachingFormData = {
  id: string
  slug: string
  name: string
  providerType: CoachingProviderType
  location: string
  state: string
  exams: string[]
  subjects: string[]
  modes: LearningMode[]
  courseTypes: string[]
  programLabel: string
  highlights: string[]
  hasDetailPage: boolean
  featured: boolean
  aboutCopy: string
  gallery: string[]
  programs: CoachingProgram[]
  facultyNotes: CoachingFacultyNote[]
  faqs: CoachingFaq[]
}

export function useCoachingEditor(initialProvider?: AdminCoachingProvider) {
  const isEditing = !!initialProvider

  const [formData, setFormData] = useState<CoachingFormData>({
    id: initialProvider?.id || `coa_${Date.now()}`,
    slug: initialProvider?.slug || '',
    name: initialProvider?.name || '',
    providerType: initialProvider?.providerType || 'Coaching Institute',
    location: initialProvider?.location || '',
    state: initialProvider?.state || '',
    exams: initialProvider?.exams || ['JEE Main'],
    subjects: initialProvider?.subjects || ['Physics', 'Chemistry', 'Mathematics'],
    modes: initialProvider?.modes || ['Offline'],
    courseTypes: initialProvider?.courseTypes || ['Classroom Program'],
    programLabel: initialProvider?.programLabel || '',
    highlights: initialProvider?.highlights || [],
    hasDetailPage: initialProvider?.hasDetailPage ?? true,
    featured: initialProvider?.featured ?? false,
    aboutCopy: initialProvider?.aboutCopy || '',
    gallery: initialProvider?.gallery || [],
    programs: initialProvider?.programs || [],
    facultyNotes: initialProvider?.facultyNotes || [],
    faqs: initialProvider?.faqs || [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const updateField = <K extends keyof CoachingFormData>(field: K, value: CoachingFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const toggleArrayItem = <T,>(field: 'exams' | 'subjects' | 'modes' | 'courseTypes', item: T) => {
    setFormData((prev) => {
      const arr = prev[field] as T[]
      const exists = arr.includes(item)
      const updated = exists ? arr.filter((x) => x !== item) : [...arr, item]
      return { ...prev, [field]: updated }
    })
  }

  const addHighlight = (highlight: string) => {
    if (!highlight.trim()) return
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, highlight.trim()],
    }))
  }

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }))
  }

  const addProgram = (program: CoachingProgram) => {
    setFormData((prev) => ({
      ...prev,
      programs: [...prev.programs, program],
    }))
  }

  const removeProgram = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }))
  }

  const addFacultyNote = (note: CoachingFacultyNote) => {
    setFormData((prev) => ({
      ...prev,
      facultyNotes: [...prev.facultyNotes, note],
    }))
  }

  const removeFacultyNote = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      facultyNotes: prev.facultyNotes.filter((_, i) => i !== index),
    }))
  }

  const addGalleryImage = (path: string) => {
    if (!path.trim()) return
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, path.trim()],
    }))
  }

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Enter the provider’s name'
    if (!formData.location.trim()) errs.location = 'Enter a city, or “Online”'
    if (!formData.programLabel.trim()) errs.programLabel = 'Enter a tagline'
    if (formData.exams.length === 0) errs.exams = 'Choose at least one exam'
    if (formData.subjects.length === 0) errs.subjects = 'Choose at least one subject'
    if (formData.modes.length === 0) errs.modes = 'Choose at least one mode'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = (onSaved?: () => void) => {
    if (!validate()) {
      setSaveStatus('error')
      setSaveMessage('Some required fields are missing. Fix the highlighted fields and save again.')
      return
    }

    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('saved')
      onSaved?.()
      setSaveMessage('Everything checks out. Saving isn’t connected yet, so these changes won’t be stored.')
    }, 600)
  }

  return {
    formData,
    isEditing,
    errors,
    saveStatus,
    saveMessage,
    updateField,
    toggleArrayItem,
    addHighlight,
    removeHighlight,
    addProgram,
    removeProgram,
    addFacultyNote,
    removeFacultyNote,
    addGalleryImage,
    removeGalleryImage,
    handleSave,
  }
}
