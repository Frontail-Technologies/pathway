'use client'

import { useEffect } from 'react'

const MESSAGE = 'You have unsaved changes. Leave this page and discard them?'

/**
 * Guards a dirty form against every way out:
 * - closing or reloading the tab (beforeunload);
 * - clicking any in-app link — the page header's back link, the sidebar, breadcrumbs — which asks first.
 * The listener runs in the capture phase on document, before Next's <Link> handler, so declining keeps the
 * user on the page. Programmatic navigation (Save → router.push) is not intercepted.
 */
export function useUnsavedChanges(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return // same-page anchors (section nav)
      if (!window.confirm(MESSAGE)) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('click', onClick, true)
    }
  }, [dirty])
}
