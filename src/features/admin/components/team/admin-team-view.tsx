'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Check, MoreHorizontal, ShieldCheck, UserPlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import {
  changeMemberRole,
  formatDateTime,
  listTeam,
  memberName,
  reactivateMember,
  revokeInvitation,
  roleInfo,
  roleLabels,
  signOutMemberEverywhere,
  STAFF_ROLES,
  statusLabels,
  statusTone,
  suspendMember,
  type StaffInvitation,
  type StaffRole,
  type TeamMember,
} from '@/features/admin/data/admin-team-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminTableSkeleton } from '../admin-skeletons'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, Monogram, Panel, StatusBadge, stopRowClick, Tag } from '../kit'
import { formatRelative } from '../demo/relative-time'
import { InviteMemberDialog } from './invite-member-dialog'

const DEFAULT_FILTERS = { q: '', role: 'all', status: 'active' }

type Row =
  | { kind: 'member'; id: string; email: string; role: StaffRole; status: TeamMember['status']; when: string | null; member: TeamMember }
  | { kind: 'invitation'; id: string; email: string; role: StaffRole; status: 'invited'; when: string; invitation: StaffInvitation }

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)

export function AdminTeamView() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { hydrated, session } = useAdminSession()
  const isAdmin = session?.role === 'admin'
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const query = useQuery({ queryKey: queryKeys.adminTeam, queryFn: listTeam, enabled: hydrated && isAdmin })
  const refresh = () => void queryClient.invalidateQueries({ queryKey: queryKeys.adminTeam })

  const rows = React.useMemo<Row[]>(() => {
    if (!query.data) return []
    const members: Row[] = query.data.members.map((member) => ({ kind: 'member', id: member.userId, email: member.email, role: member.role, status: member.status, when: member.lastLoginAt, member }))
    const invitations: Row[] = query.data.invitations.map((invitation) => ({ kind: 'invitation', id: invitation.id, email: invitation.email, role: invitation.role, status: 'invited', when: invitation.createdAt, invitation }))
    return [...members, ...invitations]
  }, [query.data])

  const counts = React.useMemo(() => {
    const result = { active: 0, invited: 0, suspended: 0 }
    for (const row of rows) if (row.status in result) result[row.status as keyof typeof result] += 1
    return result
  }, [rows])

  const filtered = React.useMemo(() => {
    const needle = f.q.trim().toLowerCase()
    return rows.filter((row) => {
      if (needle && !row.email.toLowerCase().includes(needle) && !memberName(row.email).toLowerCase().includes(needle)) return false
      if (f.role !== 'all' && row.role !== f.role) return false
      if (f.status !== 'all' && row.status !== f.status) return false
      return true
    })
  }, [rows, f])

  const act = useMutation({
    mutationFn: async ({ run }: { run: () => Promise<unknown>; success: string }) => run(),
    onSuccess: (_, variables) => {
      refresh()
      toast.success(variables.success)
    },
    onError: (error) => toast.error(messageOf(error, 'That action did not go through. Please try again.')),
  })

  const columns = React.useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Member',
        cell: ({ row }) => {
          const item = row.original
          const name = item.kind === 'member' ? memberName(item.email) : item.email
          return (
            <div className="flex min-w-[220px] items-center gap-3">
              <Monogram name={name} size="sm" className={item.kind === 'invitation' ? 'opacity-60' : undefined} />
              <div className="min-w-0">
                {item.kind === 'member' ? (
                  <Link href={`/admin/team/${item.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
                    {name}
                  </Link>
                ) : (
                  <p className="font-medium text-foreground">{item.email}</p>
                )}
                <p className="truncate text-[13px] text-muted-foreground">
                  {item.kind === 'member' ? item.email : item.invitation.invitedBy ? `Invited by ${item.invitation.invitedBy.email}` : 'Invited'}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <Tag>{roleLabels[row.original.role]}</Tag>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const item = row.original
          if (item.kind === 'invitation') return <StatusBadge tone={item.invitation.expired ? 'danger' : 'warning'}>{item.invitation.expired ? 'Invite expired' : 'Invite pending'}</StatusBadge>
          return <StatusBadge tone={statusTone[item.status]}>{statusLabels[item.status]}</StatusBadge>
        },
      },
      {
        accessorKey: 'when',
        header: ({ table }) => (table.getRowModel().rows.every((r) => r.original.kind === 'invitation') ? 'Invited' : 'Last sign-in'),
        cell: ({ row }) => {
          const item = row.original
          if (item.kind === 'invitation') return <span className="whitespace-nowrap text-muted-foreground">{formatRelative(item.when)} · expires {formatDateTime(item.invitation.expiresAt)}</span>
          return <span className="whitespace-nowrap">{item.when ? formatRelative(item.when) : 'Never'}</span>
        },
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
          const item = row.original
          const self = item.kind === 'member' && item.email === session?.email
          return (
            <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${item.email}`} />}>
                  <MoreHorizontal className="size-4" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {item.kind === 'invitation' ? (
                    <DropdownMenuItem variant="destructive" onClick={() => act.mutate({ run: () => revokeInvitation(item.id), success: 'Invitation revoked' })}>
                      <X className="size-4" aria-hidden="true" />
                      Revoke invitation
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem render={<Link href={`/admin/team/${item.id}`} />}>View member</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {STAFF_ROLES.filter((role) => role !== item.role).map((role) => (
                        <DropdownMenuItem key={role} disabled={self} onClick={() => act.mutate({ run: () => changeMemberRole(item.id, role), success: `${memberName(item.email)} is now ${roleLabels[role].toLowerCase()}` })}>
                          <ShieldCheck className="size-4" aria-hidden="true" />
                          Make {roleLabels[role].toLowerCase()}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem disabled={self} onClick={() => act.mutate({ run: () => signOutMemberEverywhere(item.id), success: 'All sessions ended' })}>
                        Sign out everywhere
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {item.status === 'active' ? (
                        <DropdownMenuItem variant="destructive" disabled={self} onClick={() => act.mutate({ run: () => suspendMember(item.id), success: `${memberName(item.email)} suspended` })}>
                          Suspend account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => act.mutate({ run: () => reactivateMember(item.id), success: `${memberName(item.email)} reactivated` })}>
                          <Check className="size-4" aria-hidden="true" />
                          Reactivate account
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [act, session?.email],
  )

  const existingEmails = rows.map((row) => row.email.toLowerCase())
  const total = query.data ? `${query.data.members.length} member${query.data.members.length === 1 ? '' : 's'}${counts.invited ? ` · ${counts.invited} invited` : ''}` : undefined

  if (hydrated && session && !isAdmin) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Team & access" />
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState art="notFound" title="Administrators only" description="Ask an administrator if you need a role change or a new team member added." className="py-14" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Workspace"
        title="Team & access"
        count={total}
        actions={
          <Button type="button" size="sm" className="gap-1.5" onClick={() => setInviteOpen(true)} disabled={!isAdmin}>
            <UserPlus className="size-4" aria-hidden="true" />
            Invite member
          </Button>
        }
      />

      {query.isLoading ? (
        <AdminTableSkeleton rows={4} columns={5} />
      ) : query.isError ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            art="loadError"
            title="Could not load the team"
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
        <AdminDataTable
          tabs={{
            value: f.status,
            onChange: (value) => set({ status: value }),
            total: rows.length,
            options: [
              { value: 'active', label: 'Active', count: counts.active },
              { value: 'invited', label: 'Invited', count: counts.invited },
              { value: 'suspended', label: 'Suspended', count: counts.suspended },
            ],
          }}
          toolbar={
            <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search name or email" hasActiveFilters={active} onReset={reset} resultCount={filtered.length}>
              <AdminFilterSelect label="Role" value={f.role} onChange={(role) => set({ role })} options={STAFF_ROLES.map((value) => ({ value, label: roleLabels[value] }))} />
            </AdminToolbar>
          }
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          onRowClick={(row) => (row.kind === 'member' ? router.push(`/admin/team/${row.id}`) : undefined)}
          getRowAriaLabel={(row) => (row.kind === 'member' ? `Open ${row.email}` : `Invitation for ${row.email}`)}
          hasActiveFilters={active}
          onResetFilters={reset}
          emptyTitle={f.status === 'invited' ? 'No open invitations' : f.status === 'suspended' ? 'No suspended accounts' : 'No one matches'}
          emptyDescription={f.status === 'invited' ? 'Invite someone and share the one-time link with them.' : 'Try a different search or status.'}
          mobileCardRender={(row) => {
            const item = row.original
            return (
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{item.kind === 'member' ? memberName(item.email) : item.email}</p>
                  <p className="truncate text-[13px] text-muted-foreground">{item.kind === 'member' ? item.email : `Invited ${formatRelative(item.when)}`}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Tag>{roleLabels[item.role]}</Tag>
                    {item.kind === 'invitation' ? <StatusBadge tone="warning">Invite pending</StatusBadge> : <StatusBadge tone={statusTone[item.status]}>{statusLabels[item.status]}</StatusBadge>}
                  </div>
                </div>
                {item.kind === 'member' ? (
                  <Button variant="outline" size="sm" render={<Link href={`/admin/team/${item.id}`} />}>
                    Open
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => act.mutate({ run: () => revokeInvitation(item.id), success: 'Invitation revoked' })}>
                    Revoke
                  </Button>
                )}
              </div>
            )
          }}
        />
      )}

      <Panel title="What each role can do" description="Permissions are fixed per role and enforced by the API.">
        <div className="grid gap-4 sm:grid-cols-2">
          {STAFF_ROLES.map((role) => {
            const info = roleInfo[role]
            return (
              <div key={role} className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={role === 'admin' ? 'size-4 text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
                  <p className="text-sm font-semibold text-foreground">{roleLabels[role]}</p>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">{info.summary}</p>
                <ul className="mt-3 space-y-1.5 text-[13px]">
                  {info.can.map((item) => (
                    <li key={item} className="flex gap-2 text-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                  {info.cannot.map((item) => (
                    <li key={item} className="flex gap-2 text-muted-foreground">
                      <X className="mt-0.5 size-3.5 shrink-0 text-destructive/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Panel>

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} existingEmails={existingEmails} />
    </div>
  )
}
