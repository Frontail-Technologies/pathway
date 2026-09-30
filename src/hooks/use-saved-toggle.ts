'use client'

import { useState } from 'react'
import { toast } from 'sonner'







 
export function useSavedToggle(entityLabel: string, initial = false) {
  const [saved, setSaved] = useState(initial)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? `${entityLabel} saved to your list.` : `${entityLabel} removed from saved items.`)
  }

  return { saved, toggleSaved }
}
