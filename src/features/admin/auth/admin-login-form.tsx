'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ApiRequestError, signInWithPassword, signOut } from '@/features/auth/lib/session-client'
import { AdminLoginPreview } from './admin-login-preview'
import { safeAdminNext, useAdminSession } from './admin-session'

const EMAIL = /^\S+@\S+\.\S+$/
const MIN_PASSWORD = 8
export function AdminLoginForm({ next }: { next?: string }) {
  const router = useRouter()
  const ids = useId()
  const { session, hydrated } = useAdminSession()
  const destination = safeAdminNext(next)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string>()
  const [showPassword, setShowPassword] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [busy, setBusy] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (hydrated && session) router.replace(destination)
  }, [hydrated, session, destination, router])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const found: typeof errors = {}
    if (!EMAIL.test(email.trim())) found.email = 'Enter your work email.'
    if (password.length < MIN_PASSWORD) found.password = `Passwords are at least ${MIN_PASSWORD} characters.`
    setErrors(found)
    setFormError(undefined)
    if (found.email || found.password) return
    setBusy(true)
    signInWithPassword({ email, password })
      .then(async (user) => {
        if (user.role !== 'staff' && user.role !== 'admin') {
          await signOut()
          setFormError('This account doesn’t have access to the admin console.')
          return
        }
        router.replace(destination)
      })
      .catch((error: unknown) => setFormError(error instanceof ApiRequestError ? error.message : 'Could not sign in. Please try again.'))
      .finally(() => setBusy(false))
  }

  const errorCount = Number(Boolean(errors.email)) + Number(Boolean(errors.password))

  return (
    <div data-theme="admin" className="grid min-h-dvh bg-card text-foreground lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Pathway site
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 pt-6 pb-16 sm:items-center sm:pt-0">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex items-center gap-2">
            <span className="font-heading text-xl font-extrabold tracking-tight">Pathway</span>
            <span className="text-sm font-medium text-muted-foreground">Admin</span>
          </div>

          <h1 className="font-heading text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">For the Pathway team. Use your work email.</p>

          {errorCount > 0 || formError ? (
            <div role="alert" className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{formError ?? (errorCount === 2 ? 'Check your email and password.' : (errors.email ?? errors.password))}</span>
            </div>
          ) : null}

          <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${ids}-email`}>Work email</Label>
              <Input
                id={`${ids}-email`}
                type="email"
                autoComplete="username"
                autoFocus
                placeholder="name@pathway.in"
                value={email}
                aria-invalid={!!errors.email || undefined}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (errors.email) setErrors((current) => ({ ...current, email: undefined }))
                }}
                className="h-10 bg-background text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${ids}-password`}>Password</Label>
                <button type="button" onClick={() => setShowHelp((value) => !value)} aria-expanded={showHelp} aria-controls={`${ids}-help`} className="rounded text-[13px] font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/40">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id={`${ids}-password`}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  aria-invalid={!!errors.password || undefined}
                  aria-describedby={capsLock ? `${ids}-caps` : undefined}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    if (errors.password) setErrors((current) => ({ ...current, password: undefined }))
                  }}
                  onKeyUp={(event) => setCapsLock(event.getModifierState('CapsLock'))}
                  onBlur={() => setCapsLock(false)}
                  className="h-10 bg-background pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                </button>
              </div>
              {capsLock ? (
                <p id={`${ids}-caps`} className="text-[13px] text-warning">
                  Caps Lock is on.
                </p>
              ) : null}
              <p id={`${ids}-help`} hidden={!showHelp} className="text-[13px] leading-5 text-muted-foreground">
                Ask a workspace owner to reset it from Team &amp; access. Password reset emails aren&apos;t connected yet.
              </p>
            </div>

            <Button type="submit" className="h-10 w-full text-sm font-semibold" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-8 rounded-lg border border-border bg-muted/50 px-4 py-3.5">
            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="min-w-0 text-[13px] leading-5 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Team accounts only.</span> Staff and admin accounts are created by a workspace owner; there is no public sign-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-5 pb-6 text-[13px] text-muted-foreground">
        <span>© 2026 Pathway</span>
        <Link href="/privacy" className="hover:text-foreground">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-foreground">
          Terms
        </Link>
      </footer>
      </div>
      <AdminLoginPreview />
    </div>
  )
}
