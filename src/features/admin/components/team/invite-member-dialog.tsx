'use client'

import * as React from 'react'
import { Check, Copy, Link2 } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { createInvitation, inviteLink, isValidEmail, roleInfo, roleLabels, STAFF_ROLES, type CreatedInvitation, type StaffRole } from '@/features/admin/data/admin-team-api'
import { Field, FormSelect } from '../demo/demo-form'

export function InviteLinkBox({ token, email }: { token: string; email: string }) {
  const [copied, setCopied] = React.useState(false)
  const link = inviteLink(token)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      toast.success('Link copied')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy. Select the link and copy it manually.')
    }
  }
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2.5 rounded-lg border border-success/30 bg-success/5 px-3.5 py-3 text-sm">
        <Link2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
        <p className="text-foreground">
          Send this link to <span className="font-medium">{email}</span>. It works once and expires in 7 days. You will not see it again after closing this dialog.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input readOnly value={link} onFocus={(event) => event.currentTarget.select()} className="h-9 font-mono text-[12px]" aria-label="Invitation link" />
        <Button type="button" variant="outline" className="h-9 shrink-0 gap-1.5" onClick={copy}>
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  )
}

export function InviteMemberDialog({ open, onOpenChange, existingEmails }: { open: boolean; onOpenChange: (open: boolean) => void; existingEmails: string[] }) {
  const queryClient = useQueryClient()
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState<StaffRole>('staff')
  const [error, setError] = React.useState<string>()
  const [created, setCreated] = React.useState<CreatedInvitation | null>(null)

  React.useEffect(() => {
    if (open) {
      setEmail('')
      setRole('staff')
      setError(undefined)
      setCreated(null)
    }
  }, [open])

  const mutation = useMutation({
    mutationFn: createInvitation,
    onSuccess: (invitation) => {
      setCreated(invitation)
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminTeam })
    },
    onError: (err) => setError(err instanceof ApiRequestError ? err.message : 'Could not create the invitation. Please try again.'),
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = email.trim().toLowerCase()
    if (!isValidEmail(value)) return setError('Enter a valid work email address.')
    if (existingEmails.includes(value)) return setError('This person already has an account or an open invitation.')
    setError(undefined)
    mutation.mutate({ email: value, role })
  }

  const info = roleInfo[role]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {created ? (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Invitation ready</DialogTitle>
              <DialogDescription>
                {created.email} will join as {roleLabels[created.role].toLowerCase()} once they open the link and set a password.
              </DialogDescription>
            </DialogHeader>
            <InviteLinkBox token={created.token} email={created.email} />
            <DialogFooter>
              <Button type="button" size="sm" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4" noValidate>
            <DialogHeader>
              <DialogTitle>Invite a team member</DialogTitle>
              <DialogDescription>You get a one-time link to share. No public sign-up exists for the admin.</DialogDescription>
            </DialogHeader>
            <Field id="invite-email" label="Work email" required error={error}>
              <Input
                id="invite-email"
                type="email"
                autoFocus
                autoComplete="off"
                placeholder="name@pathway.in"
                value={email}
                aria-invalid={error ? true : undefined}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError(undefined)
                }}
                className="h-9"
              />
            </Field>
            <Field id="invite-role" label="Role" hint={info.summary}>
              <FormSelect id="invite-role" value={role} onChange={setRole} options={STAFF_ROLES.map((value) => ({ value, label: roleLabels[value] }))} />
            </Field>
            <ul className="space-y-1 rounded-lg bg-muted/50 px-3.5 py-3 text-[13px] text-muted-foreground">
              {info.can.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating…' : 'Create invitation'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
