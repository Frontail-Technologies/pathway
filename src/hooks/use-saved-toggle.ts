'use client'

import { useState } from 'react'
import { toast } from 'sonner'

/**
 * Canonical Save/Bookmark state + Sonner feedback, shared by every Detail
 * screen's Save action (College/Course/Scholarship/Coaching all used the
 * identical "local boolean + toast" pattern independently — this centralizes
 * it instead of re-implementing the same state/toast per feature). Local
 * state only; no persistence layer exists yet.
 */
export function useSavedToggle(entityLabel: string, initial = false) {
  const [saved, setSaved] = useState(initial)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? `${entityLabel} saved to your list.` : `${entityLabel} removed from saved items.`)
  }

  return { saved, toggleSaved }
}
