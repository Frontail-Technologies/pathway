'use client'

import { useState } from 'react'
import type {
  TutorSubject,
  TutorExam,
  TutorLevel,
  TutorLanguage,
  TutorMode,
  TutorAvatarSpec,
} from '@/features/tutors/data/tutors'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'

export type TutorFormData = {
  id: string
  slug: string
  name: string
  headline: string
  intro: string
  longBio: string
  whoHelps: string[]
  traits: string[]
  subjects: TutorSubject[]
  exams: TutorExam[]
  studyLevels: TutorLevel[]
  languages: TutorLanguage[]
  modes: TutorMode[]
  portrait: string
  avatar: TutorAvatarSpec
  hasDetailPage: boolean
  featured: boolean
}

const defaultAvatar: TutorAvatarSpec = {
  skin: '#e0b088',
  hair: '#2b2118',
  shirt: '#3b6fd6',
  style: 'short',
  glasses: false,
}

export function useTutorEditor(initialTutor?: AdminTutor) {
  const isEditing = !!initialTutor

  const [formData, setFormData] = useState<TutorFormData>({
    id: initialTutor?.id || `t_${Date.now()}`,
    slug: initialTutor?.slug || '',
    name: initialTutor?.name || '',
    headline: initialTutor?.headline || '',
    intro: initialTutor?.intro || '',
    longBio: initialTutor?.detail?.longBio || '',
    whoHelps: initialTutor?.detail?.whoHelps || [],
    traits: initialTutor?.detail?.traits || [],
    subjects: initialTutor?.subjects || ['Physics'],
    exams: initialTutor?.exams || ['JEE Main'],
    studyLevels: initialTutor?.studyLevels || ['Class 11–12'],
    languages: initialTutor?.languages || ['English', 'Hindi'],
    modes: initialTutor?.modes || ['Online'],
    portrait: initialTutor?.portrait || '',
    avatar: initialTutor?.avatar || defaultAvatar,
    hasDetailPage: initialTutor?.hasDetailPage ?? true,
    featured: initialTutor?.featured ?? false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const updateField = <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const updateAvatarField = <K extends keyof TutorAvatarSpec>(field: K, value: TutorAvatarSpec[K]) => {
    setFormData((prev) => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        [field]: value,
      },
    }))
  }

  const toggleArrayItem = <T,>(field: 'subjects' | 'exams' | 'studyLevels' | 'languages' | 'modes', item: T) => {
    setFormData((prev) => {
      const arr = prev[field] as T[]
      const exists = arr.includes(item)
      const updated = exists ? arr.filter((x) => x !== item) : [...arr, item]
      return { ...prev, [field]: updated }
    })
  }

  const addArrayString = (field: 'whoHelps' | 'traits', value: string) => {
    if (!value.trim()) return
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }))
  }

  const removeArrayString = (field: 'whoHelps' | 'traits', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Enter the tutor’s name'
    if (!formData.headline.trim()) errs.headline = 'Enter a headline'
    if (!formData.intro.trim()) errs.intro = 'Enter a short summary'
    if (formData.subjects.length === 0) errs.subjects = 'Choose at least one subject'
    if (formData.exams.length === 0) errs.exams = 'Choose at least one exam'
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
    updateAvatarField,
    toggleArrayItem,
    addArrayString,
    removeArrayString,
    handleSave,
  }
}
