'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, softInputClass } from '@/components/shared/student-tool/tool-fields'
import { useDemoAuth } from '@/features/student/state/demo-auth-provider'

/**
 * AUTH-01 — FRONTEND DEMO sign-in. No request is made and no credential is checked or stored: a valid-looking
 * email and any password just set the local demo sign-in flag. The password lives only in this component's state.
 */
export function LoginForm() {
  const router = useRouter()
  const { signedIn, hydrated, signIn } = useDemoAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  useEffect(() => {
    if (hydrated && signedIn) router.replace('/student')
  }, [hydrated, signedIn, router])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: typeof errors = {}
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    setErrors(next)
    if (next.email || next.password) return
    signIn()
    toast.success('Signed in to the demo student account.')
    router.push('/student')
  }

  return (
    <div className="rounded-[14px] border bg-card p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
      <h1 className="font-heading text-2xl font-extrabold text-foreground">Sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back. Sign in to your student account.</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Field label="Email" htmlFor="login-email" error={errors.email}>
          <Input id="login-email" type="email" autoComplete="email" className={softInputClass} value={email} aria-invalid={!!errors.email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="Password" htmlFor="login-password" error={errors.password}>
          <Input id="login-password" type="password" autoComplete="current-password" className={softInputClass} value={password} aria-invalid={!!errors.password} onChange={(event) => setPassword(event.target.value)} />
        </Field>
        <div className="flex justify-end">
          <span aria-disabled="true" title="Coming soon" className="cursor-not-allowed text-xs text-muted-foreground">
            Forgot password? (coming soon)
          </span>
        </div>
        <Button type="submit" variant="cta" className="h-11 w-full text-sm font-semibold">
          Sign In
        </Button>
      </form>

      <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">Demo sign-in: sign-in is not connected to a server yet, so any valid email and password works on this device.</p>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        New to Pathway?{' '}
        <Link href="/register" className="font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
          Create Account
        </Link>
      </p>
    </div>
  )
}
