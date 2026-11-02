'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { isValidEmail, TEAM_ROLE_INFO, TEAM_ROLES, type TeamRole } from '@/features/admin/data/admin-team'
import { DemoNote, Field, FormSelect } from '../demo/demo-form'

export function InviteMemberDialog({ open, onOpenChange, existingEmails, onInvite }: { open: boolean; onOpenChange: (open: boolean) => void; existingEmails: string[]; onInvite: (email: string, role: TeamRole) => void }) {
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState<TeamRole>('Editor')
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (open) {
      setEmail('')
      setRole('Editor')
      setError(undefined)
    }
  }, [open])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = email.trim().toLowerCase()
    if (!isValidEmail(value)) return setError('Enter a valid email address.')
    if (existingEmails.includes(value)) return setError('This person has already been invited.')
    onInvite(value, role)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
            <DialogDescription>Add someone to the admin with a role.</DialogDescription>
          </DialogHeader>
          <Field id="invite-email" label="Email" error={error}>
            <Input
              id="invite-email"
              type="email"
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError(undefined)
              }}
              placeholder="name@example.com"
              className="h-9"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'invite-email-error' : undefined}
            />
          </Field>
          <Field id="invite-role" label="Role" hint={TEAM_ROLE_INFO[role].summary}>
            <FormSelect id="invite-role" value={role} onChange={setRole} options={TEAM_ROLES.map((r) => ({ value: r, label: r }))} />
          </Field>
          <DemoNote>Demo: no email is sent. The invite is saved on this device only.</DemoNote>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Add invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
