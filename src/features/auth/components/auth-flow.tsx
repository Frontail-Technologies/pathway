'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, GraduationCap, Mail, Presentation, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { studyLevelOptions } from '@/features/student/data/profile-form'
import { createStudentProfile } from '@/features/student/data/student'
import { useDemoAuth } from '@/features/student/state/demo-auth-provider'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'
import { useTutorSpace } from '@/features/tutor-space/state/tutor-space-provider'
import { cn } from '@/lib/utils'
import { formatIndianMobile, isEmail, MIN_PASSWORD, normalizeIndianMobile, RESEND_SECONDS, safeNextPath } from '../lib/auth-helpers'
import { OtpInput } from './otp-input'

type Mode = 'login' | 'register'
type Role = 'student' | 'tutor'
type Step = 'start' | 'code' | 'details'
type Method = 'phone' | 'email'

const inputClass = 'h-11 border-border bg-background text-[15px]'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-[13px] text-destructive">
      {message}
    </p>
  )
}

/** Student / Tutor switch. Tutors land in Tutor Space; students in their dashboard (or where they came from). */
function RoleSwitch({ role, onChange }: { role: Role; onChange: (role: Role) => void }) {
  const options: { value: Role; label: string; icon: typeof GraduationCap }[] = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'tutor', label: 'Tutor', icon: Presentation },
  ]
  return (
    <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-1 rounded-[12px] bg-muted p-1">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={role === value}
          onClick={() => onChange(value)}
          className={cn(
            'flex h-10 items-center justify-center gap-2 rounded-[9px] text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
            role === value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  )
}

/**
 * Sign in and sign up in one flow, matching the mobile app: mobile number → 6-digit code, with email as an
 * alternative. New students add their name (and optionally study level) after verifying.
 * Demo: nothing is sent to a server; any 6 digits verify and any password works.
 */
export function AuthFlow({ mode, next }: { mode: Mode; next?: string }) {
  const router = useRouter()
  const ids = useId()
  const auth = useDemoAuth()
  const tutor = useTutorSpace()
  const { profile, updateProfile } = useStudentProfile()

  const [role, setRole] = useState<Role>('student')
  const [method, setMethod] = useState<Method>('phone')
  const [step, setStep] = useState<Step>('start')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [studyLevel, setStudyLevel] = useState('')
  const [errors, setErrors] = useState<Partial<Record<'phone' | 'code' | 'email' | 'password' | 'name', string>>>({})
  const [busy, setBusy] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [finishing, setFinishing] = useState(false)

  const clearError = (field: keyof typeof errors) => setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  const studentHome = safeNextPath(next, '/student')
  const isRegister = mode === 'register'
  const digits = normalizeIndianMobile(phone)

  // Already signed in: skip the form (but not while this flow is finishing its own sign-in).
  useEffect(() => {
    if (finishing) return
    if (auth.hydrated && auth.signedIn) router.replace(studentHome)
    else if (tutor.hydrated && tutor.signedIn) router.replace('/tutor-dashboard')
  }, [auth.hydrated, auth.signedIn, tutor.hydrated, tutor.signedIn, finishing, router, studentHome])

  useEffect(() => {
    if (resendIn <= 0) return
    const id = window.setTimeout(() => setResendIn((value) => value - 1), 1000)
    return () => window.clearTimeout(id)
  }, [resendIn])

  /** Short delay so the button's busy state is visible, as a real request would be. */
  const pretend = (action: () => void) => {
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      action()
    }, 450)
  }

  const finishTutor = () => {
    setFinishing(true)
    tutor.signIn()
    toast.success('Signed in to Tutor Space')
    router.push('/tutor-dashboard')
  }

  const finishStudent = (details?: { name: string; email?: string; phone?: string; studyLevel?: string }) => {
    setFinishing(true)
    if (details) {
      const [firstName = '', ...rest] = details.name.trim().split(/\s+/)
      updateProfile({ ...createStudentProfile({ firstName, lastName: rest.join(' '), email: details.email ?? '', studyLevel: details.studyLevel }), phone: details.phone })
    }
    auth.signIn()
    toast.success(isRegister ? 'Your account is ready' : 'Signed in')
    router.push(studentHome)
  }

  const sendCode = (event?: React.FormEvent) => {
    event?.preventDefault()
    if (!digits) return setErrors({ phone: 'Enter a valid 10-digit Indian mobile number.' })
    setErrors({})
    pretend(() => {
      setCode('')
      setStep('code')
      setResendIn(RESEND_SECONDS)
    })
  }

  const verify = (value = code) => {
    if (!/^\d{6}$/.test(value)) return setErrors({ code: 'Enter the 6-digit code.' })
    setErrors({})
    pretend(() => {
      if (role === 'tutor') return finishTutor()
      // New students (or anyone without a name on this device) add their details next.
      if (isRegister || !profile.name?.trim()) return setStep('details')
      finishStudent()
    })
  }

  const submitDetails = (event: React.FormEvent) => {
    event.preventDefault()
    if (name.trim().length < 2) return setErrors({ name: 'Enter your name.' })
    setErrors({})
    pretend(() => finishStudent({ name, phone: digits ?? undefined, studyLevel: studyLevel || undefined }))
  }

  const submitEmail = (event: React.FormEvent) => {
    event.preventDefault()
    const found: typeof errors = {}
    if (isRegister && role === 'student' && name.trim().length < 2) found.name = 'Enter your name.'
    if (!isEmail(email)) found.email = 'Enter a valid email address.'
    if (isRegister ? password.length < MIN_PASSWORD : !password) found.password = isRegister ? `Use at least ${MIN_PASSWORD} characters.` : 'Enter your password.'
    setErrors(found)
    if (Object.keys(found).length) return
    pretend(() => {
      if (role === 'tutor') return finishTutor()
      finishStudent(isRegister || !profile.name?.trim() ? { name: name || email.split('@')[0]!, email } : undefined)
    })
  }

  const heading =
    step === 'code'
      ? 'Enter the code'
      : step === 'details'
        ? 'One last step'
        : isRegister
          ? role === 'tutor'
            ? 'Join Pathway as a tutor'
            : 'Create your account'
          : 'Sign in to Pathway'
  const subheading =
    step === 'code'
      ? `We sent a 6-digit code to ${digits ? formatIndianMobile(digits) : 'your mobile'}.`
      : step === 'details'
        ? 'Tell us your name so counsellors and colleges know who they are talking to.'
        : isRegister
          ? role === 'tutor'
            ? 'Create your tutor profile and start receiving session requests.'
            : 'Save colleges, track enquiries and get picks for your goals.'
          : 'Welcome back. Use your mobile number or email.'

  return (
    <div className="flex flex-col gap-6">
      {step !== 'start' ? (
        <button
          type="button"
          onClick={() => {
            setErrors({})
            setStep(step === 'details' ? 'code' : 'start')
          }}
          className="-ml-1 flex w-fit items-center gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[28px] leading-tight font-extrabold text-foreground">{heading}</h1>
        <p className="text-[15px] leading-6 text-muted-foreground">{subheading}</p>
      </div>

      {step === 'start' ? (
        <>
          <RoleSwitch role={role} onChange={(value) => { setRole(value); setErrors({}) }} />

          {method === 'phone' ? (
            <form onSubmit={sendCode} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${ids}-phone`}>Mobile number</Label>
                <div className={cn('flex h-11 items-center overflow-hidden rounded-lg border bg-background focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20', errors.phone ? 'border-destructive' : 'border-border')}>
                  <span className="flex h-full items-center border-r bg-muted/50 px-3 text-[15px] font-medium text-muted-foreground" aria-hidden="true">
                    +91
                  </span>
                  <input
                    id={`${ids}-phone`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    maxLength={16}
                    value={phone}
                    autoFocus
                    aria-invalid={!!errors.phone || undefined}
                    aria-describedby={errors.phone ? `${ids}-phone-error` : undefined}
                    onChange={(event) => {
                      setPhone(event.target.value)
                      setErrors({})
                    }}
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
                  />
                </div>
                <FieldError id={`${ids}-phone-error`} message={errors.phone} />
              </div>
              <Button type="submit" size="lg" className="h-11 w-full text-[15px] font-semibold" disabled={busy}>
                {busy ? 'Sending code…' : 'Continue'}
              </Button>
            </form>
          ) : (
            <form onSubmit={submitEmail} noValidate className="flex flex-col gap-4">
              {isRegister && role === 'student' ? (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`${ids}-name`}>Full name</Label>
                  <Input id={`${ids}-name`} autoComplete="name" className={inputClass} value={name} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? `${ids}-name-error` : undefined} onChange={(event) => {
                    setName(event.target.value)
                    clearError('name')
                  }} />
                  <FieldError id={`${ids}-name-error`} message={errors.name} />
                </div>
              ) : null}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${ids}-email`}>Email</Label>
                <Input id={`${ids}-email`} type="email" autoComplete="email" autoFocus className={inputClass} value={email} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? `${ids}-email-error` : undefined} onChange={(event) => {
                    setEmail(event.target.value)
                    clearError('email')
                  }} />
                <FieldError id={`${ids}-email-error`} message={errors.email} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${ids}-password`}>Password</Label>
                <div className="relative">
                  <Input
                    id={`${ids}-password`}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    className={cn(inputClass, 'pr-11')}
                    value={password}
                    aria-invalid={!!errors.password || undefined}
                    aria-describedby={`${ids}-password-${errors.password ? 'error' : 'hint'}`}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      clearError('password')
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    {showPassword ? <EyeOff className="size-4.5" aria-hidden="true" /> : <Eye className="size-4.5" aria-hidden="true" />}
                  </button>
                </div>
                {errors.password ? (
                  <FieldError id={`${ids}-password-error`} message={errors.password} />
                ) : (
                  <p id={`${ids}-password-hint`} className="text-[13px] text-muted-foreground">
                    {isRegister ? `At least ${MIN_PASSWORD} characters.` : 'Forgot it? Sign in with your mobile number instead.'}
                  </p>
                )}
              </div>
              <Button type="submit" size="lg" className="h-11 w-full text-[15px] font-semibold" disabled={busy}>
                {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
              </Button>
            </form>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground" aria-hidden="true">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 text-[15px] font-semibold"
            onClick={() => {
              setMethod(method === 'phone' ? 'email' : 'phone')
              setErrors({})
            }}
          >
            {method === 'phone' ? <Mail className="size-4.5" aria-hidden="true" /> : <Smartphone className="size-4.5" aria-hidden="true" />}
            {method === 'phone' ? 'Continue with email' : 'Continue with mobile number'}
          </Button>
        </>
      ) : null}

      {step === 'code' ? (
        <div className="flex flex-col gap-4">
          <OtpInput value={code} onChange={(value) => { setCode(value); setErrors({}) }} onComplete={verify} invalid={!!errors.code} describedBy={errors.code ? `${ids}-code-error` : undefined} />
          <FieldError id={`${ids}-code-error`} message={errors.code} />
          <Button type="button" size="lg" className="h-11 w-full text-[15px] font-semibold" disabled={busy} onClick={() => verify()}>
            {busy ? 'Verifying…' : 'Verify and continue'}
          </Button>
          <div className="flex items-center justify-between text-sm">
            <button type="button" onClick={() => setStep('start')} className="rounded-md font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
              Change number
            </button>
            <button
              type="button"
              disabled={resendIn > 0 || busy}
              onClick={() => {
                setResendIn(RESEND_SECONDS)
                toast.info('Code sent again')
              }}
              className="rounded-md font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-default disabled:text-muted-foreground disabled:no-underline"
            >
              {resendIn > 0 ? `Resend in 0:${String(resendIn).padStart(2, '0')}` : 'Resend code'}
            </button>
          </div>
          <p className="text-[13px] leading-5 text-muted-foreground">Demo: no SMS is sent. Enter any 6 digits.</p>
        </div>
      ) : null}

      {step === 'details' ? (
        <form onSubmit={submitDetails} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${ids}-details-name`}>Full name</Label>
            <Input id={`${ids}-details-name`} autoComplete="name" autoFocus className={inputClass} value={name} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? `${ids}-details-name-error` : undefined} onChange={(event) => {
                    setName(event.target.value)
                    clearError('name')
                  }} />
            <FieldError id={`${ids}-details-name-error`} message={errors.name} />
          </div>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-foreground">
              What are you studying now? <span className="font-normal text-muted-foreground">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {studyLevelOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={studyLevel === option}
                  onClick={() => setStudyLevel(studyLevel === option ? '' : option)}
                  className={cn(
                    'h-9 rounded-full border px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                    studyLevel === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/60',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <Button type="submit" size="lg" className="h-11 w-full text-[15px] font-semibold" disabled={busy}>
            {busy ? 'Saving…' : 'Finish'}
          </Button>
        </form>
      ) : null}

      {step === 'start' ? (
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            {isRegister ? 'Already have an account? ' : 'New to Pathway? '}
            <Link href={{ pathname: isRegister ? '/login' : '/register', query: next ? { next } : undefined }} className="font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
              {isRegister ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            By continuing you agree to Pathway&apos;s{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            . Demo: nothing is sent to a server.
          </p>
        </div>
      ) : null}
    </div>
  )
}
