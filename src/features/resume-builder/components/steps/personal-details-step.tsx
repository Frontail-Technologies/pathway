'use client'

import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { ResumePersonal } from '../../data/types'

export function PersonalDetailsStep({ personal, onChange }: { personal: ResumePersonal; onChange: (personal: ResumePersonal) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = <K extends keyof ResumePersonal>(key: K, value: ResumePersonal[K]) => onChange({ ...personal, [key]: value })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update('photo', typeof reader.result === 'string' ? reader.result : undefined)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          {personal.photo ? (
            
            <img src={personal.photo} alt="" className="size-full object-cover" />
          ) : (
            <Camera className="size-6 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <div>
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            Upload Photo
          </Button>
          <p className="mt-1 text-xs text-muted-foreground">Optional — stays on this device only.</p>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" required>
          <Input value={personal.firstName} onChange={(event) => update('firstName', event.target.value)} placeholder="Aarav" />
        </Field>
        <Field label="Last Name" required>
          <Input value={personal.lastName} onChange={(event) => update('lastName', event.target.value)} placeholder="Mehta" />
        </Field>
        <Field label="Email" required>
          <Input type="email" value={personal.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" />
        </Field>
        <Field label="Phone" required>
          <Input type="tel" value={personal.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+91 98765 43210" />
        </Field>
        <Field label="City / Location" required>
          <Input value={personal.location} onChange={(event) => update('location', event.target.value)} placeholder="Pune, Maharashtra" />
        </Field>
        <Field label="Professional Headline" required>
          <Input value={personal.headline} onChange={(event) => update('headline', event.target.value)} placeholder="B.Tech Computer Science Student" />
        </Field>
        <Field label="LinkedIn">
          <Input value={personal.linkedin ?? ''} onChange={(event) => update('linkedin', event.target.value)} placeholder="linkedin.com/in/yourname" />
        </Field>
        <Field label="Portfolio / Website">
          <Input value={personal.portfolio ?? ''} onChange={(event) => update('portfolio', event.target.value)} placeholder="yourname.dev" />
        </Field>
        <Field label="GitHub">
          <Input value={personal.github ?? ''} onChange={(event) => update('github', event.target.value)} placeholder="github.com/yourname" />
        </Field>
      </div>

      <Field label="Professional Summary">
        <Textarea
          value={personal.summary ?? ''}
          onChange={(event) => update('summary', event.target.value)}
          placeholder="Write a short introduction about your academic background, strengths and career goals."
          className="min-h-24"
        />
      </Field>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  )
}
