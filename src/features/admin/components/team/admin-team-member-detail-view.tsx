'use client'

import * as React from 'react'
import { CalendarDays, Clock, LogOut, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import {
  activityLabels,
  changeMemberRole,
  formatDateTime,
  getTeamMember,
  memberName,
  reactivateMember,
  roleInfo,
  roleLabels,
  signOutMemberEverywhere,
  statusLabels,
  statusTone,
  suspendMember,
  type TeamMemberDetail,
} from '@/features/admin/data/admin-team-api'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { AdminPageHeader, FactList, Monogram, Panel, RecordHeader, StatusBadge, Tag } from '../kit'
import { formatRelative } from '../demo/relative-time'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)
const back = { href: '/admin/team', label: 'Team & access' }

function describe(event: TeamMemberDetail['activity'][number]) {
  const diff = event.metadata.diff as Record<string, { before?: unknown; after?: unknown }> | undefined
  if (event.action === 'user.role_changed' && diff?.role) return `${String(diff.role.before)} → ${String(diff.role.after)}`
  if (event.action === 'user.created' && event.metadata.source === 'invitation') return 'Accepted an invitation'
  return null
}

export function AdminTeamMemberDetailView({ userId }: { userId: string }) {
  const queryClient = useQueryClient()
  const { hydrated, session } = useAdminSession()
  const isAdmin = session?.role === 'admin'
  const query = useQuery({ queryKey: queryKeys.adminTeamMember(userId), queryFn: () => getTeamMember(userId), enabled: hydrated && isAdmin })

  const act = useMutation({
    mutationFn: async ({ run }: { run: () => Promise<TeamMemberDetail>; success: string }) => run(),
    onSuccess: (next, variables) => {
      queryClient.setQueryData(queryKeys.adminTeamMember(userId), next)
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminTeam, exact: true })
      toast.success(variables.success)
    },
    onError: (error) => toast.error(messageOf(error, 'That action did not go through. Please try again.')),
  })

  if (hydrated && session && !isAdmin) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Team member" back={back} />
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState art="notFound" title="Administrators only" className="py-14" />
        </div>
      </div>
    )
  }

  if (!query.data) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Team member" back={back} />
        {query.isError ? (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <AdminEmptyState
              art={query.error instanceof ApiRequestError && query.error.status === 404 ? 'notFound' : 'loadError'}
              title={query.error instanceof ApiRequestError && query.error.status === 404 ? 'Member not found' : 'Could not load this member'}
              description={messageOf(query.error, 'Please try again.')}
              action={
                <Button variant="outline" onClick={() => void query.refetch()}>
                  Try again
                </Button>
              }
              className="py-14"
            />
          </div>
        ) : (
          <AdminPanelSkeleton lines={6} />
        )}
      </div>
    )
  }

  const member = query.data
  const name = memberName(member.email)
  const self = member.email === session?.email
  const otherRole = member.role === 'admin' ? 'staff' : 'admin'
  const busy = act.isPending

  return (
    <div className="space-y-5">
      <RecordHeader
        title={name}
        media={<Monogram name={name} size="lg" />}
        description={member.email}
        back={back}
        chips={
          <>
            <Tag>{roleLabels[member.role]}</Tag>
            <StatusBadge tone={statusTone[member.status]}>{statusLabels[member.status]}</StatusBadge>
            {self ? <StatusBadge tone="info">You</StatusBadge> : null}
          </>
        }
        meta={[
          { icon: Clock, label: member.lastLoginAt ? `Last sign-in ${formatRelative(member.lastLoginAt)}` : 'Never signed in' },
          { icon: MonitorSmartphone, label: `${member.activeSessions} active session${member.activeSessions === 1 ? '' : 's'}` },
          { icon: CalendarDays, label: `Member since ${formatDateTime(member.createdAt)}` },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5" disabled={self || busy} onClick={() => act.mutate({ run: () => changeMemberRole(userId, otherRole), success: `${name} is now ${roleLabels[otherRole].toLowerCase()}` })}>
              <ShieldCheck className="size-4" aria-hidden="true" />
              Make {roleLabels[otherRole].toLowerCase()}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" disabled={self || busy || member.activeSessions === 0} onClick={() => act.mutate({ run: () => signOutMemberEverywhere(userId), success: 'All sessions ended' })}>
              <LogOut className="size-4" aria-hidden="true" />
              Sign out everywhere
            </Button>
            {member.status === 'active' ? (
              <Button variant="destructive" size="sm" disabled={self || busy} onClick={() => act.mutate({ run: () => suspendMember(userId), success: `${name} suspended` })}>
                Suspend
              </Button>
            ) : (
              <Button size="sm" disabled={busy} onClick={() => act.mutate({ run: () => reactivateMember(userId), success: `${name} reactivated` })}>
                Reactivate
              </Button>
            )}
          </>
        }
      />

      {self ? <p className="text-[13px] text-muted-foreground">You cannot change your own role or suspend your own account. Use the account menu to change your password.</p> : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Account activity" description="The last 20 account events: sign-ins, role changes, suspensions and password changes.">
            {member.activity.length === 0 ? (
              <AdminEmptyState art="noActivity" title="No account activity yet" className="py-8" />
            ) : (
              <ol className="space-y-4">
                {member.activity.map((event) => {
                  const detail = describe(event)
                  return (
                    <li key={event.id} className="border-l-2 border-border pl-3">
                      <p className="text-sm font-medium text-foreground">{activityLabels[event.action] ?? event.action}</p>
                      <p className="text-[13px] text-muted-foreground">
                        {formatDateTime(event.createdAt)}
                        {event.actorEmail ? ` · by ${event.actorEmail}` : ''}
                      </p>
                      {detail ? <p className="mt-1 text-[13px] text-foreground">{detail}</p> : null}
                    </li>
                  )
                })}
              </ol>
            )}
          </Panel>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Account">
            <FactList
              columns={1}
              items={[
                { label: 'Email', value: member.email },
                { label: 'Role', value: roleLabels[member.role] },
                { label: 'Status', value: statusLabels[member.status] },
                { label: 'Active sessions', value: member.activeSessions },
                { label: 'Last sign-in', value: formatDateTime(member.lastLoginAt) },
                { label: 'Created', value: formatDateTime(member.createdAt) },
              ]}
            />
          </Panel>
          <Panel title={`${roleLabels[member.role]} permissions`} description={roleInfo[member.role].summary}>
            <ul className="space-y-1.5 text-[13px] text-foreground">
              {roleInfo[member.role].can.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            {roleInfo[member.role].cannot.length ? (
              <ul className="mt-3 space-y-1.5 text-[13px] text-muted-foreground">
                {roleInfo[member.role].cannot.map((item) => (
                  <li key={item}>✕ {item}</li>
                ))}
              </ul>
            ) : null}
          </Panel>
        </div>
      </div>
    </div>
  )
}
