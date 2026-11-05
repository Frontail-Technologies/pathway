'use client'

import { type FormEvent, useId, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'
import { submitEnquiry, type EnquiryEntityRef, type EnquirySourceInput } from '../api/enquiries-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type EnquiryIntent = 'enquiry' | 'brochure' | 'counselling'

export const enquiryIntentCopy: Record<EnquiryIntent, { title: (entity?: string) => string; submit: string; done: (entity?: string) => string }> = {
  enquiry: {
    title: (entity) => (entity ? `Enquire — ${entity}` : 'Send an enquiry'),
    submit: 'Send Enquiry',
    done: (entity) => `Your enquiry${entity ? ` for ${entity}` : ''} has been noted.`,
  },
  brochure: {
    title: (entity) => (entity ? `Get ${entity} brochure` : 'Get brochure'),
    submit: 'Email Me the Brochure',
    done: (entity) => `We'll email the ${entity ? `${entity} ` : ''}brochure to you.`,
  },
  counselling: {
    title: () => 'Get free counselling',
    submit: 'Request a Call Back',
    done: () => 'A counsellor will call you back shortly.',
  },
}

const INDIAN_MOBILE = /^[6-9]\d{9}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type EnquiryFormProps = {
  intent?: EnquiryIntent
  entityName?: string
  entity?: EnquiryEntityRef
  source?: EnquirySourceInput
  topic?: string
  interestOptions?: readonly string[]
  interestLabel?: string
  defaultInterest?: string
  onSubmitted?: () => void
}

export function EnquiryForm({ intent = 'enquiry', entityName, entity, source, topic, interestOptions = [], interestLabel = 'Interested in', defaultInterest, onSubmitted }: EnquiryFormProps) {
  const initialInterest = defaultInterest && interestOptions.includes(defaultInterest) ? defaultInterest : interestOptions[0]
  const id = useId()
  const copy = enquiryIntentCopy[intent]
  const emailRequired = intent === 'brochure'

  const { signedIn } = useRoleSession('student')
  const { profile } = useStudentProfile()
  const queryClient = useQueryClient()
  const [name, setName] = useState(signedIn ? profile.name : '')
  const [phone, setPhone] = useState(signedIn ? (profile.phone ?? '') : '')
  const [email, setEmail] = useState(signedIn ? profile.email : '')
  const [city, setCity] = useState(signedIn ? (profile.city ?? '') : '')
  const [interest, setInterest] = useState<string | undefined>(initialInterest)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({})

  const submit = useMutation({
    mutationFn: submitEnquiry,
    onSuccess: (receipt) => {
      toast.success(receipt.duplicate ? `We already have this request${entityName ? ` for ${entityName}` : ''}. Our team will be in touch.` : copy.done(entityName))
      setMessage('')
      void queryClient.invalidateQueries({ queryKey: ['me'] })
      onSubmitted?.()
    },
    onError: (error) => {
      if (error instanceof ApiRequestError) {
        const fields = error.fields
        if (fields.phone || fields.email || fields.name) {
          setErrors({ name: fields.name, phone: fields.phone, email: fields.email })
          return
        }
        if (error.code === 'RATE_LIMITED') {
          toast.error('Too many requests from this number. Please try again later.')
          return
        }
        toast.error(error.message)
        return
      }
      toast.error('Something went wrong. Please try again.')
    },
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!INDIAN_MOBILE.test(digits)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (emailRequired && !email.trim()) next.email = 'Email is needed to send the brochure.'
    else if (email.trim() && !EMAIL.test(email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    submit.mutate({ intent, entity, source, topic, interest, name, phone: digits, email, city, message: intent === 'brochure' ? undefined : message })
  }

  const field = (key: string) => `${id}-${key}`

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={field('name')}>Full name</Label>
        <Input id={field('name')} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? field('name-error') : undefined} />
        {errors.name && <p id={field('name-error')} className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={field('phone')}>Mobile number</Label>
        <div className="flex">
          <span className="flex h-9 items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+91</span>
          <Input id={field('phone')} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className="rounded-l-none" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? field('phone-error') : undefined} />
        </div>
        {errors.phone && <p id={field('phone-error')} className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={field('email')}>Email{emailRequired ? '' : ' (optional)'}</Label>
        <Input id={field('email')} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? field('email-error') : undefined} />
        {errors.email && <p id={field('email-error')} className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={field('city')}>City (optional)</Label>
        <Input id={field('city')} autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Where do you live?" />
      </div>

      {interestOptions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={field('interest')}>{interestLabel}</Label>
          <Select value={interest} onValueChange={(value) => setInterest(value ?? undefined)} items={interestOptions.map((option) => ({ value: option, label: option }))}>
            <SelectTrigger id={field('interest')} className="w-full">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {interestOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {intent !== 'brochure' && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={field('message')}>Your question (optional)</Label>
          <Textarea id={field('message')} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything specific you'd like to ask?" />
        </div>
      )}

      <Button type="submit" variant="cta" disabled={submit.isPending} className="mt-1 h-11 w-full text-sm font-semibold">
        {submit.isPending ? 'Sending…' : copy.submit}
      </Button>
      <p className="text-center text-[11px] leading-4 text-muted-foreground">
        By submitting, you agree to be contacted about your request. See our{' '}
        <a href="/privacy" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}
