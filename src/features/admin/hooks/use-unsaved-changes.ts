'use client'

import { useEffect } from 'react'

/**
 * Warns before the tab is closed or reloaded while a form has unsaved edits.
 * (In-app link navigation is guarded by the editor's Cancel button asking for confirmation.)
 */
export function useUnsavedChanges(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])
}
