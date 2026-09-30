'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ResumeData, ResumeStepId, ResumeTemplateId } from '../data/types'
import { createEmptyResume } from '../data/fixtures'

const STORAGE_KEY = 'pathway.resumeBuilder.draft.v1'

type DraftShape = {
  hasStarted: boolean
  step: ResumeStepId
  templateId: ResumeTemplateId
  data: ResumeData
}

const DEFAULT_DRAFT: DraftShape = {
  hasStarted: false,
  step: 'personal',
  templateId: 'modern-sidebar',
  data: createEmptyResume(),
}

function readDraft(): DraftShape | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<DraftShape>
    if (!parsed.data) return null
    return { ...DEFAULT_DRAFT, ...parsed }
  } catch {
    return null
  }
}




 
export function useResumeDraft() {
  const [draft, setDraft] = useState<DraftShape>(DEFAULT_DRAFT)
  const [restored, setRestored] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    const existing = readDraft()
    if (existing) setDraft(existing)
    setRestored(true)
  }, [])

  useEffect(() => {
    
    
    
    
    if (!restored) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
      setSavedAt(Date.now())
    } catch {
      
    }
  }, [draft, restored])

  const setData = useCallback((updater: (current: ResumeData) => ResumeData) => {
    setDraft((current) => ({ ...current, data: updater(current.data) }))
  }, [])

  const setStep = useCallback((step: ResumeStepId) => {
    setDraft((current) => ({ ...current, step }))
  }, [])

  const setTemplateId = useCallback((templateId: ResumeTemplateId) => {
    setDraft((current) => ({ ...current, templateId }))
  }, [])

  const start = useCallback((data: ResumeData) => {
    setDraft((current) => ({ ...current, hasStarted: true, data, step: 'personal' }))
  }, [])

  return {
    restored,
    savedAt,
    hasStarted: draft.hasStarted,
    step: draft.step,
    templateId: draft.templateId,
    data: draft.data,
    start,
    setData,
    setStep,
    setTemplateId,
  }
}
