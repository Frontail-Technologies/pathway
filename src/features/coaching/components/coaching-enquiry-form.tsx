'use client'

import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CoachingProvider } from '../data/coaching'

type CoachingEnquiryFormProps = {
  provider: CoachingProvider
  onSubmitted?: () => void
  /** Compact/inline sidebar variant omits the optional message field to stay short. */
  compact?: boolean
}

/**
 * Shared enquiry fields + submit behavior used both inline (desktop sidebar)
 * and inside the enquiry Dialog (mobile / hero / closing CTA) — frontend-only
 * (no backend/API); a valid submission shows Sonner success feedback and
 * never claims the enquiry reached a real provider.
 */
export function CoachingEnquiryForm({ provider, onSubmitted, compact = false }: CoachingEnquiryFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [interestedIn, setInterestedIn] = useState<string | undefined>(provider.exams[0])
  const [message, setMessage] = useState('')

  const programOptions = provider.programs?.length ? provider.programs.map((program) => program.name) : provider.exams

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      toast.error('Please share your name and at least an email or phone number.')
      return
    }
    toast.success(`Your enquiry for ${provider.name} has been noted. This is a demo preview — no enquiry is sent to a real provider.`)
    setName('')
    setEmail('')
    setPhone('')
    setInterestedIn(provider.exams[0])
    setMessage('')
    onSubmitted?.()
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
        <Input id={`enquiry-phone-${provider.slug}`} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your phone number" />
      </div>
      {programOptions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label>Interested In</Label>
          <Select value={interestedIn} onValueChange={(value) => setInterestedIn(value ?? undefined)} items={programOptions.map((option) => ({ value: option, label: option }))}>
            <SelectTrigger className="w-full">
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
      <Button type="submit" variant="cta" className="h-10 w-full text-sm font-semibold">
        Send Enquiry
      </Button>
    </form>
  )
}
