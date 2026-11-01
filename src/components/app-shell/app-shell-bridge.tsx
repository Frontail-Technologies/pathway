'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasNativeBridge, isAppShell, postToNative } from '@/lib/app-shell'

/**
 * Keeps the native layer in sync with the web app when running in app-shell
 * mode. Renders nothing; a no-op in a normal browser.
 *
 * - `ready` once on mount, so native can hide its splash/loader.
 * - `route` on every client-side navigation, so native can update its title
 *   bar and back-button state (soft navigations never reach the WebView's
 *   own navigation callbacks), then `title` whenever <title> changes.
 * - `openExternal` for links that leave Pathway or use target="_blank", which
 *   most WebViews otherwise ignore or open inside the app.
 */
export function AppShellBridge() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    if (!isAppShell()) return
    postToNative({ type: 'ready' })

    // Next.js applies route metadata asynchronously, so forward title changes
    // separately rather than guessing when the route's title is final.
    let lastTitle = document.title
    const observer = new MutationObserver(() => {
      // Next briefly clears the title mid-navigation; ignore that transient state.
      if (!document.title || document.title === lastTitle) return
      lastTitle = document.title
      postToNative({ type: 'title', title: lastTitle })
    })
    observer.observe(document.head, { subtree: true, childList: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAppShell()) return
    // Wait a frame so the new route's <title> has been applied.
    const frame = requestAnimationFrame(() => {
      postToNative({ type: 'route', path: search ? `${pathname}?${search}` : pathname, title: document.title })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, search])

  useEffect(() => {
    if (!isAppShell() || !hasNativeBridge()) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const url = new URL(anchor.href, window.location.href)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return

      const isExternal = url.origin !== window.location.origin
      if (!isExternal && anchor.target !== '_blank') return

      if (postToNative({ type: 'openExternal', url: url.href })) event.preventDefault()
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
