'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { acceptStaffInvitation, ApiRequestError, previewStaffInvitation } from '@/features/auth/lib/session-client'
import { roleLabels, type StaffRole } from '@/features/admin/data/admin-team-api'

const MIN_PASSWORD = 8

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="admin" className="flex min-h-dvh flex-col bg-card text-foreground">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Pathway site
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-5 pt-6 pb-16 sm:items-center sm:pt-0">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-2">
            <span className="font-heading text-xl font-extrabold tracking-tight">Pathway</span>
            <span className="text-sm font-medium text-muted-foreground">Admin</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

export function AdminInviteAcceptForm({ token }: { token: string }) {
  const router = useRouter()
  const ids = useId()
  const preview = useQuery({ queryKey: queryKeys.invitationPreview(token), queryFn: () => previewStaffInvitation(token), retry: false })
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string>()
  const [busy, setBusy] = useState(false)

  if (preview.isLoading) {
    return (
      <Frame>
        <p className="text-sm text-muted-foreground">Checking your invitation…</p>
      </Frame>
    )
  }

  if (preview.isError || !preview.data) {
    return (
      <Frame>
        <h1 className="font-heading text-2xl font-bold tracking-tight">This link is not valid</h1>
        <p className="mt-2 text-sm text-muted-foreground">{preview.error instanceof ApiRequestError ? preview.error.message : 'The invitation may have been used, revoked or expired. Ask an administrator for a new link.'}</p>
        <Button variant="outline" className="mt-6" render={<Link href="/admin/login" />}>
          Go to sign in
        </Button>
      </Frame>
    )
  }

  const invitation = preview.data
  const role = roleLabels[invitation.role as StaffRole] ?? invitation.role

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password.length < MIN_PASSWORD) return setError(`Use at least ${MIN_PASSWORD} characters.`)
    if (password !== confirm) return setError('The two passwords do not match.')
    setError(undefined)
    setBusy(true)
    acceptStaffInvitation({ token, password })
      .then(() => router.replace('/admin'))
      .catch((err: unknown) => setError(err instanceof ApiRequestError ? err.message : 'Could not finish setting up your account. Please try again.'))
      .finally(() => setBusy(false))
  }

  return (
    <Frame>
      <h1 className="font-heading text-2xl font-bold tracking-tight">Join the Pathway team</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        You have been invited as <span className="font-medium text-foreground">{role.toLowerCase()}</span>. Set a password for <span className="font-medium text-foreground">{invitation.email}</span> to finish.
      </p>

      {error ? (
        <div role="alert" className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : null}

      <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-5">
        <input type="email" autoComplete="username" value={invitation.email} readOnly hidden />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${ids}-password`}>Password</Label>
            <button type="button" onClick={() => setShow((value) => !value)} className="rounded text-[13px] font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/40">
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="relative">
            <Input id={`${ids}-password`} type={show ? 'text' : 'password'} autoComplete="new-password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} className="h-10 bg-background pr-10 text-sm" />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">{show ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}</span>
          </div>
          <p className="text-[13px] text-muted-foreground">At least {MIN_PASSWORD} characters. Avoid common passwords and your email.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${ids}-confirm`}>Confirm password</Label>
          <Input id={`${ids}-confirm`} type={show ? 'text' : 'password'} autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="h-10 bg-background text-sm" />
        </div>
        <Button type="submit" className="h-10 w-full" disabled={busy}>
          {busy ? 'Setting up…' : 'Create my account'}
        </Button>
      </form>

      <p className="mt-6 text-[13px] text-muted-foreground">
        Already have an account?{' '}
        <Link href="/admin/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Frame>
  )
}
