'use client'

import { type FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'
import { submitEnquiry } from '@/features/enquiries/api/enquiries-api'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CoachingProvider } from '../data/coaching'

type CoachingEnquiryFormProps = {
  provider: CoachingProvider
  onSubmitted?: () => void
   
  compact?: boolean
}






 
export function CoachingEnquiryForm({ provider, onSubmitted, compact = false }: CoachingEnquiryFormProps) {
  const { signedIn } = useRoleSession('student')
  const { profile } = useStudentProfile()
  const queryClient = useQueryClient()
  const [name, setName] = useState(signedIn ? profile.name : '')
  const [email, setEmail] = useState(signedIn ? profile.email : '')
  const [phone, setPhone] = useState(signedIn ? (profile.phone ?? '') : '')
  const [interestedIn, setInterestedIn] = useState<string | undefined>(provider.exams[0])
  const [message, setMessage] = useState('')

  const programOptions = provider.programs?.length ? provider.programs.map((program) => program.name) : provider.exams

  const submit = useMutation({
    mutationFn: submitEnquiry,
    onSuccess: (receipt) => {
      toast.success(receipt.duplicate ? `We already have your enquiry for ${provider.name}. The team will be in touch.` : `Your enquiry for ${provider.name} has been sent. The team will be in touch.`)
      setMessage('')
      void queryClient.invalidateQueries({ queryKey: ['me'] })
      onSubmitted?.()
    },
    onError: (error) => {
      if (error instanceof ApiRequestError && error.code === 'RATE_LIMITED') toast.error('Too many requests from this number. Please try again later.')
      else toast.error(error instanceof ApiRequestError ? (Object.values(error.fields).find(Boolean) ?? error.message) : 'Something went wrong. Please try again.')
    },
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (name.trim().length < 2) {
      toast.error('Please enter your name.')
      return
    }
    if (!/^[6-9]\d{9}$/.test(digits)) {
      toast.error('Enter a valid 10-digit mobile number so the team can reach you.')
      return
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Enter a valid email address.')
      return
    }
    submit.mutate({ intent: 'enquiry', entity: { kind: 'coaching', slug: provider.slug }, interest: interestedIn, name, phone: digits, email, message: compact ? undefined : message })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`enquiry-name-${provider.slug}`}>Name</Label>
        <Input id={`enquiry-name-${provider.slug}`} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`enquiry-email-${provider.slug}`}>Email</Label>
        <Input id={`enquiry-email-${provider.slug}`} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`enquiry-phone-${provider.slug}`}>Phone</Label>
        <Input id={`enquiry-phone-${provider.slug}`} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="10-digit mobile number" />
      </div>
      {programOptions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`enquiry-interest-${provider.slug}`}>Interested In</Label>
          <Select value={interestedIn} onValueChange={(value) => setInterestedIn(value ?? undefined)} items={programOptions.map((option) => ({ value: option, label: option }))}>
            <SelectTrigger id={`enquiry-interest-${provider.slug}`} className="w-full">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {programOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {!compact && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`enquiry-message-${provider.slug}`}>Message (optional)</Label>
          <Textarea id={`enquiry-message-${provider.slug}`} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Anything specific you'd like to ask?" />
        </div>
      )}
      <Button type="submit" variant="cta" disabled={submit.isPending} className="h-10 w-full text-sm font-semibold">
        {submit.isPending ? 'Sending…' : 'Send Enquiry'}
      </Button>
    </form>
  )
}
