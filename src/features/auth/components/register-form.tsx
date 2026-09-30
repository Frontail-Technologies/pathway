'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, OptionSelect, softInputClass } from '@/components/shared/student-tool/tool-fields'
import { studyLevelOptions } from '@/features/student/data/profile-form'
import { createStudentProfile } from '@/features/student/data/student'
import { useDemoAuth } from '@/features/student/state/demo-auth-provider'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'password' | 'confirm', string>>
const MIN_PASSWORD = 8




 
export function RegisterForm() {
  const router = useRouter()
  const { signedIn, hydrated, signIn } = useDemoAuth()
  const { updateProfile } = useStudentProfile()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '', studyLevel: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (hydrated && signedIn && !submitted) router.replace('/student')
  }, [hydrated, signedIn, submitted, router])

  const set = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: Errors = {}
    if (!form.firstName.trim()) next.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Enter your last name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (form.password.length < MIN_PASSWORD) next.password = `Use at least ${MIN_PASSWORD} characters.`
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitted(true)
    updateProfile(createStudentProfile({ firstName: form.firstName, lastName: form.lastName, email: form.email, studyLevel: form.studyLevel }))
    signIn()
    toast.success('Demo student account created on this device.')
    router.push('/student')
  }

  return (
    <div className="rounded-[14px] border bg-card p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
      <h1 className="font-heading text-2xl font-extrabold text-foreground">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Set up a student account to keep your profile and saved items together.</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" required htmlFor="reg-first" error={errors.firstName}>
            <Input id="reg-first" autoComplete="given-name" className={softInputClass} value={form.firstName} aria-invalid={!!errors.firstName} onChange={(event) => set('firstName', event.target.value)} />
          </Field>
          <Field label="Last name" required htmlFor="reg-last" error={errors.lastName}>
            <Input id="reg-last" autoComplete="family-name" className={softInputClass} value={form.lastName} aria-invalid={!!errors.lastName} onChange={(event) => set('lastName', event.target.value)} />
          </Field>
        </div>
        <Field label="Email" required htmlFor="reg-email" error={errors.email}>
          <Input id="reg-email" type="email" autoComplete="email" className={softInputClass} value={form.email} aria-invalid={!!errors.email} onChange={(event) => set('email', event.target.value)} />
        </Field>
        <Field label="Password" required htmlFor="reg-password" hint={`At least ${MIN_PASSWORD} characters.`} error={errors.password}>
          <Input id="reg-password" type="password" autoComplete="new-password" className={softInputClass} value={form.password} aria-invalid={!!errors.password} onChange={(event) => set('password', event.target.value)} />
        </Field>
        <Field label="Confirm password" required htmlFor="reg-confirm" error={errors.confirm}>
          <Input id="reg-confirm" type="password" autoComplete="new-password" className={softInputClass} value={form.confirm} aria-invalid={!!errors.confirm} onChange={(event) => set('confirm', event.target.value)} />
        </Field>
        <Field label="Current study level" hint="Optional.">
          <OptionSelect value={form.studyLevel} onChange={(value) => set('studyLevel', value)} options={studyLevelOptions} placeholder="Select level" />
        </Field>
        <Button type="submit" variant="cta" className="h-11 w-full text-sm font-semibold">
          Create Account
        </Button>
      </form>

      <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">Demo account: nothing is sent to a server. Your details stay on this device and your password is not stored.</p>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
          Sign In
        </Link>
      </p>
    </div>
  )
}
