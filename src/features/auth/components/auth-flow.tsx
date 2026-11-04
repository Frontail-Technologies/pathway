'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, GraduationCap, Presentation } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ApiRequestError, registerStudentAccount, registerTutorAccount, signInWithPassword, signOut, type SessionUser } from '../lib/session-client'
import { useAuthSession } from '../state/auth-session-provider'
import { isEmail, MIN_PASSWORD, safeNextPath } from '../lib/auth-helpers'

type Mode = 'login' | 'register'
type AccountType = 'student' | 'tutor'
type Field = 'email' | 'password' | 'firstName' | 'lastName' | 'displayName'
type FieldErrors = Partial<Record<Field, string>>

const inputClass = 'h-11 border-border bg-background text-[15px]'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-[13px] text-destructive">
      {message}
    </p>
  )
}

function AccountTypeSwitch({ value, onChange }: { value: AccountType; onChange: (value: AccountType) => void }) {
  const options = [
    { value: 'student' as const, label: 'Student', icon: GraduationCap },
    { value: 'tutor' as const, label: 'Tutor', icon: Presentation },
  ]
  return (
    <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-1 rounded-[12px] bg-muted p-1">
      {options.map(({ value: option, label, icon: Icon }) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            'flex h-10 items-center justify-center gap-2 rounded-[9px] text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
            value === option ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  )
}

export function AuthFlow({ mode, next, accountType: initialType }: { mode: Mode; next?: string; accountType?: AccountType }) {
  const router = useRouter()
  const ids = useId()
  const session = useAuthSession()

  const [accountType, setAccountType] = useState<AccountType>(initialType ?? 'student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string>()
  const [busy, setBusy] = useState(false)
  const [finishing, setFinishing] = useState(false)

  const isRegister = mode === 'register'
  const studentHome = safeNextPath(next, '/student')
  const clearError = (field: Field) => {
    setFormError(undefined)
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  useEffect(() => {
    if (finishing || session.status !== 'signedIn') return
    if (session.user?.role === 'student') router.replace(studentHome)
    else if (session.user?.role === 'tutor') router.replace('/tutor-dashboard')
  }, [session.status, session.user?.role, finishing, router, studentHome])

  const finish = async (user: SessionUser) => {
    if (user.role === 'staff' || user.role === 'admin') {
      await signOut()
      setFormError('Staff and admin accounts sign in at the admin console (/admin/login).')
      return
    }
    setFinishing(true)
    toast.success(user.role === 'tutor' ? (isRegister ? 'Your tutor account is ready' : 'Signed in to Tutor Space') : isRegister ? 'Your account is ready' : 'Signed in')
    router.push(user.role === 'tutor' ? '/tutor-dashboard' : studentHome)
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const found: FieldErrors = {}
    if (!isEmail(email)) found.email = 'Enter a valid email address.'
    if (isRegister ? password.length < MIN_PASSWORD : !password) found.password = isRegister ? `Use at least ${MIN_PASSWORD} characters.` : 'Enter your password.'
    if (isRegister && accountType === 'student') {
      if (!firstName.trim()) found.firstName = 'Enter your first name.'
      if (!lastName.trim()) found.lastName = 'Enter your last name.'
    }
    if (isRegister && accountType === 'tutor' && !displayName.trim()) found.displayName = 'Enter the name students will see.'
    setErrors(found)
    setFormError(undefined)
    if (Object.keys(found).length) return

    setBusy(true)
    try {
      const user = !isRegister
        ? await signInWithPassword({ email, password })
        : accountType === 'tutor'
          ? await registerTutorAccount({ email, password, displayName })
          : await registerStudentAccount({ email, password, firstName, lastName })
      await finish(user)
    } catch (error) {
      if (error instanceof ApiRequestError) {
        const fields = error.fields as FieldErrors
        setErrors(fields)
        if (!Object.keys(fields).length) setFormError(error.message)
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  const heading = isRegister ? (accountType === 'tutor' ? 'Join Pathway as a tutor' : 'Create your account') : 'Sign in to Pathway'
  const subheading = isRegister
    ? accountType === 'tutor'
      ? 'Create your tutor account. Your profile is reviewed before students can see it.'
      : 'Save colleges, track enquiries and get picks for your goals.'
    : 'Welcome back. Sign in with your email and password.'

  const textField = (field: Field, label: string, value: string, setValue: (value: string) => void, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={`${ids}-${field}`}>{label}</Label>
      <Input
        id={`${ids}-${field}`}
        className={inputClass}
        value={value}
        aria-invalid={!!errors[field] || undefined}
        aria-describedby={errors[field] ? `${ids}-${field}-error` : undefined}
        onChange={(event) => {
          setValue(event.target.value)
          clearError(field)
        }}
        {...props}
      />
      <FieldError id={`${ids}-${field}-error`} message={errors[field]} />
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[28px] leading-tight font-extrabold text-foreground">{heading}</h1>
        <p className="text-[15px] leading-6 text-muted-foreground">{subheading}</p>
      </div>

      {isRegister ? (
        <AccountTypeSwitch
          value={accountType}
          onChange={(value) => {
            setAccountType(value)
            setErrors({})
            setFormError(undefined)
          }}
        />
      ) : null}

      {formError ? (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          {formError}
        </p>
      ) : null}

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {isRegister && accountType === 'student' ? (
          <div className="grid grid-cols-2 gap-3">
            {textField('firstName', 'First name', firstName, setFirstName, { autoComplete: 'given-name' })}
            {textField('lastName', 'Last name', lastName, setLastName, { autoComplete: 'family-name' })}
          </div>
        ) : null}
        {isRegister && accountType === 'tutor' ? textField('displayName', 'Name on your profile', displayName, setDisplayName, { autoComplete: 'name' }) : null}
        {textField('email', 'Email', email, setEmail, { type: 'email', autoComplete: 'email', autoFocus: true })}
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
              {isRegister ? `At least ${MIN_PASSWORD} characters. Avoid common passwords and your email name.` : 'Use the email and password of your Pathway account.'}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" className="h-11 w-full text-[15px] font-semibold" disabled={busy}>
          {busy ? 'Please wait…' : isRegister ? (accountType === 'tutor' ? 'Create tutor account' : 'Create account') : 'Sign in'}
        </Button>
      </form>

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
          .
        </p>
      </div>
    </div>
  )
}
