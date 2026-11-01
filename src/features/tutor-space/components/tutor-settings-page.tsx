'use client'

import { LogOut, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { DashboardSection } from '@/features/student/components/dashboard-parts'
import type { TutorNotificationSettings } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'
import { useTutorSignOut } from './tutor-space-nav'

const notificationRows: { key: keyof TutorNotificationSettings; label: string; hint: string }[] = [
  { key: 'newRequests', label: 'New session requests', hint: 'When a student sends you a request.' },
  { key: 'weeklySummary', label: 'Weekly summary', hint: 'Profile views and requests from the past week.' },
  { key: 'productUpdates', label: 'Product updates', hint: 'New Pathway features for tutors.' },
]

export function TutorSettingsPage() {
  const { state, update, reset } = useTutorSpace()
  const signOut = useTutorSignOut()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Notifications and your demo account.</p>
      </div>

      <DashboardSection title="Notifications" description="Saved on this device. Emails are not sent in the demo.">
        <ul className="divide-y">
          {notificationRows.map((row) => (
            <li key={row.key}>
              <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-sm font-medium text-foreground">{row.label}</span>
                  <span className="block text-xs text-muted-foreground">{row.hint}</span>
                </span>
                <Switch checked={state.notifications[row.key]} onCheckedChange={(checked) => update((current) => ({ notifications: { ...current.notifications, [row.key]: checked } }))} />
              </label>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection title="Account">
        <dl className="flex flex-col gap-2.5 text-sm">
          {[
            ['Name', state.profile.name],
            ['Account type', 'Tutor'],
            ['Sign-in status', 'Demo account'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="min-w-0 truncate text-right font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row">
          <Button
            variant="outline"
            className="h-11 gap-2 text-sm"
            onClick={() => {
              reset()
              toast.success('Demo tutor data reset.')
            }}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset demo data
          </Button>
          <Button variant="outline" className="h-11 gap-2 text-sm text-destructive hover:bg-destructive/5 hover:text-destructive" onClick={signOut}>
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </Button>
        </div>
      </DashboardSection>
    </div>
  )
}
