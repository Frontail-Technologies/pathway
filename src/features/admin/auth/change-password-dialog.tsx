'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { changeOwnPassword } from '@/features/admin/data/admin-team-api'
import { Field } from '../components/demo/demo-form'

const MIN_PASSWORD = 8

export function ChangePasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [current, setCurrent] = React.useState('')
  const [next, setNext] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [error, setError] = React.useState<string>()
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setCurrent('')
      setNext('')
      setConfirm('')
      setError(undefined)
    }
  }, [open])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!current) return setError('Enter your current password.')
    if (next.length < MIN_PASSWORD) return setError(`The new password needs at least ${MIN_PASSWORD} characters.`)
    if (next !== confirm) return setError('The two new passwords do not match.')
    setError(undefined)
    setBusy(true)
    changeOwnPassword({ currentPassword: current, newPassword: next })
      .then(() => {
        toast.success('Password changed', { description: 'Your other devices have been signed out.' })
        onOpenChange(false)
      })
      .catch((err: unknown) => setError(err instanceof ApiRequestError ? err.message : 'Could not change the password. Please try again.'))
      .finally(() => setBusy(false))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>You stay signed in here; every other device is signed out.</DialogDescription>
          </DialogHeader>
          <Field id="pw-current" label="Current password" required error={error}>
            <Input id="pw-current" type="password" autoComplete="current-password" autoFocus value={current} onChange={(event) => setCurrent(event.target.value)} className="h-9" aria-invalid={error ? true : undefined} />
          </Field>
          <Field id="pw-next" label="New password" required>
            <Input id="pw-next" type="password" autoComplete="new-password" value={next} onChange={(event) => setNext(event.target.value)} className="h-9" />
          </Field>
          <Field id="pw-confirm" label="Confirm new password" required>
            <Input id="pw-confirm" type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="h-9" />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={busy}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={busy}>
              {busy ? 'Saving…' : 'Change password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
