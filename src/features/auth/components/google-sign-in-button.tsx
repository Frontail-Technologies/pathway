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

export const googleSignInConfigured = Boolean(clientId)

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

  if (!clientId) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => onError('Google sign-in is not set up on this site yet. Use your email for now.')}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#dadce0] bg-white text-[15px] font-medium text-[#3c4043] outline-none transition-colors hover:bg-[#f8faff] focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60"
      >
        <GoogleMark />
        {mode === 'register' ? 'Sign up with Google' : 'Continue with Google'}
      </button>
    )
  }

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : undefined} aria-busy={!ready || undefined}>
      <div ref={container} className="flex min-h-11 w-full justify-center [&_iframe]:mx-auto!" />
    </div>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
