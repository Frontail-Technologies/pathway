'use client'

import * as React from 'react'
import { RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ADMIN_STORAGE_KEYS, resetAdminDemoData } from '@/features/admin/data/admin-demo-storage'
import { logAdminActivity } from '@/features/admin/data/admin-activity'
import { DEFAULT_ADMIN_SETTINGS, type AdminSettings } from '@/features/admin/data/admin-settings'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { isValidEmail, listTeam, memberName } from '@/features/admin/data/admin-team-api'
import { useDemoStorage } from '@/features/admin/hooks/use-demo-storage'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader } from '../kit'
import { Field, FormSection, FormSelect, StickySaveBar, ToggleRow } from '../demo/demo-form'

const FORM_ID = 'admin-settings-form'

type Errors = Partial<Record<'siteName' | 'supportEmail' | 'supportPhone', string>>

function validate(values: AdminSettings): Errors {
  const errors: Errors = {}
  if (!values.siteName.trim()) errors.siteName = 'Enter a site name.'
  if (values.supportEmail && !isValidEmail(values.supportEmail)) errors.supportEmail = 'Enter a valid email address.'
  if (values.supportPhone && !/^[+()\d\s-]{6,20}$/.test(values.supportPhone)) errors.supportPhone = 'Use digits, spaces, +, ( ) and - only.'
  return errors
}

export function AdminSettingsView() {
  const [stored, setStored, loaded] = useDemoStorage<AdminSettings>(ADMIN_STORAGE_KEYS.settings, DEFAULT_ADMIN_SETTINGS)
  const { hydrated, session } = useAdminSession()
  const team = useQuery({ queryKey: queryKeys.adminTeam, queryFn: listTeam, enabled: hydrated && session?.role === 'admin' })
  const saved = React.useMemo(() => ({ ...DEFAULT_ADMIN_SETTINGS, ...stored }), [stored])
  const [values, setValues] = React.useState<AdminSettings>(DEFAULT_ADMIN_SETTINGS)
  const [errors, setErrors] = React.useState<Errors>({})
  const [resetOpen, setResetOpen] = React.useState(false)

  React.useEffect(() => {
    setValues(saved)
    setErrors({})
  }, [saved])

  const dirty = loaded && JSON.stringify(values) !== JSON.stringify(saved)
  useUnsavedChanges(dirty)

  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    if (key in errors) setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const assigneeOptions = React.useMemo(
    () => [
      { value: 'unassigned', label: 'Unassigned' },
      ...(team.data?.members.filter((member) => member.status === 'active').map((member) => ({ value: member.userId, label: `${memberName(member.email)} (${member.email})` })) ??
        (session ? [{ value: session.email, label: session.name }] : [])),
    ],
    [team.data, session],
  )
  const assigneeValue = assigneeOptions.some((option) => option.value === values.defaultAssignee) ? values.defaultAssignee : 'unassigned'

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Check the highlighted fields')
      return
    }
    setStored({ ...values, siteName: values.siteName.trim(), supportEmail: values.supportEmail.trim(), supportPhone: values.supportPhone.trim() })
    logAdminActivity({ area: 'Settings', action: 'Updated', label: 'Admin settings', href: '/admin/settings' })
    toast.success('Settings saved', { description: 'Demo: changes are saved on this device only.' })
  }

  const resetDemo = () => {
    resetAdminDemoData()
    logAdminActivity({ area: 'Settings', action: 'Reset', label: 'Demo data', href: '/admin/settings' })
    setResetOpen(false)
    toast.success('Demo data reset', { description: 'Exam edits, stream changes, invites, settings and the activity log were cleared on this device.' })
  }

  const invalid = (key: keyof Errors) => (errors[key] ? { 'aria-invalid': true as const, 'aria-describedby': `settings-${key}-error` } : {})

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Settings" />

      <form id={FORM_ID} onSubmit={submit} noValidate className="max-w-3xl space-y-5">
        <FormSection title="General" description="Shown to students in the footer and on contact pages.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="settings-siteName" label="Site name" required error={errors.siteName} className="sm:col-span-2">
              <Input id="settings-siteName" value={values.siteName} onChange={(event) => set('siteName', event.target.value)} className="h-9" {...invalid('siteName')} />
            </Field>
            <Field id="settings-supportEmail" label="Support email" error={errors.supportEmail}>
              <Input id="settings-supportEmail" type="email" value={values.supportEmail} onChange={(event) => set('supportEmail', event.target.value)} placeholder="support@example.com" className="h-9" {...invalid('supportEmail')} />
            </Field>
            <Field id="settings-supportPhone" label="Support phone" error={errors.supportPhone}>
              <Input id="settings-supportPhone" type="tel" value={values.supportPhone} onChange={(event) => set('supportPhone', event.target.value)} placeholder="+91" className="h-9" {...invalid('supportPhone')} />
            </Field>
          </div>
        </FormSection>

        <FormSection title="Lead routing" description="What happens when a student sends an enquiry.">
          <Field id="settings-assignee" label="Default assignee" hint="New enquiries are assigned to this person." className="sm:max-w-sm">
            <FormSelect id="settings-assignee" value={assigneeValue} onChange={(v) => set('defaultAssignee', v)} options={assigneeOptions} />
          </Field>
          <ToggleRow title="Auto-acknowledge" description="Send students a confirmation that their enquiry was received." control={<Switch checked={values.autoAcknowledge} onCheckedChange={(v) => set('autoAcknowledge', v)} aria-label="Auto-acknowledge" />} />
        </FormSection>

        <FormSection title="Notifications">
          <ToggleRow title="Email on new enquiry" description="Email the assignee when a new enquiry arrives. Demo: no email is sent." control={<Switch checked={values.emailOnNewEnquiry} onCheckedChange={(v) => set('emailOnNewEnquiry', v)} aria-label="Email on new enquiry" />} />
        </FormSection>
      </form>

      <section className="max-w-3xl rounded-lg border border-destructive/40 bg-card">
        <div className="border-b border-destructive/20 px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-destructive">Danger zone</h2>
        </div>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Reset demo data</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Clears exam edits, stream publishing changes, team invites, settings and the activity log saved on this device.</p>
          </div>
          <Button type="button" variant="destructive" size="sm" className="shrink-0 gap-1.5" onClick={() => setResetOpen(true)}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset demo data
          </Button>
        </div>
      </section>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset demo data?</DialogTitle>
            <DialogDescription>Everything you changed in exams, streams, team and settings on this device will be cleared. This can&apos;t be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" size="sm" onClick={resetDemo}>
              Reset demo data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StickySaveBar visible={dirty} formId={FORM_ID} onDiscard={() => setValues(saved)} className="max-w-3xl" />
    </div>
  )
}
