'use client'

import { useEffect, useRef, useState } from 'react'

type GoogleCredentialResponse = { credential?: string }
type GoogleIdApi = {
  initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void; ux_mode?: 'popup'; auto_select?: boolean; cancel_on_tap_outside?: boolean; context?: 'signin' | 'signup' | 'use' }) => void
  renderButton: (parent: HTMLElement, options: { type?: 'standard'; theme?: 'outline' | 'filled_blue'; size?: 'large'; text?: 'signin_with' | 'signup_with' | 'continue_with'; shape?: 'rectangular' | 'pill'; logo_alignment?: 'left' | 'center'; width?: number }) => void
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } }
  }
}

const SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''

let scriptPromise: Promise<void> | null = null

function loadGoogleScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'))
  if (window.google?.accounts?.id) return Promise.resolve()
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Google sign-in could not load'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

export const googleSignInEnabled = Boolean(clientId)

export function GoogleSignInButton({ mode, disabled, onCredential, onError }: { mode: 'login' | 'register'; disabled?: boolean; onCredential: (idToken: string) => void; onError: (message: string) => void }) {
  const container = useRef<HTMLDivElement>(null)
  const callback = useRef(onCredential)
  const fail = useRef(onError)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    callback.current = onCredential
    fail.current = onError
  }, [onCredential, onError])

  useEffect(() => {
    if (!clientId) return
    let cancelled = false
    loadGoogleScript()
      .then(() => {
        const node = container.current
        const api = window.google?.accounts?.id
        if (cancelled || !node || !api) return
        api.initialize({
          client_id: clientId,
          ux_mode: 'popup',
          cancel_on_tap_outside: true,
          context: mode === 'register' ? 'signup' : 'signin',
          callback: (response) => {
            if (response.credential) callback.current(response.credential)
            else fail.current('Google sign-in was cancelled.')
          },
        })
        node.replaceChildren()
        api.renderButton(node, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          text: mode === 'register' ? 'signup_with' : 'continue_with',
          logo_alignment: 'center',
          width: Math.min(400, Math.max(200, Math.round(node.getBoundingClientRect().width))),
        })
        setReady(true)
      })
      .catch(() => {
        if (!cancelled) fail.current('Google sign-in could not load. Check your connection or use email instead.')
      })
    return () => {
      cancelled = true
    }
  }, [mode])

  if (!clientId) return null

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : undefined} aria-busy={!ready || undefined}>
      <div ref={container} className="flex min-h-11 w-full justify-center [&_iframe]:mx-auto!" />
    </div>
  )
}
