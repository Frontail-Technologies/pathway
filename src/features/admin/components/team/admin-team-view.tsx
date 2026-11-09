'use client'

import * as React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Check, Trash2, UserPlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ADMIN_STORAGE_KEYS } from '@/features/admin/data/admin-demo-storage'
import { logAdminActivity } from '@/features/admin/data/admin-activity'
import { DEMO_OWNER, TEAM_ROLE_INFO, TEAM_ROLES, type TeamMember, type TeamRole } from '@/features/admin/data/admin-team'
import { useDemoStorage } from '@/features/admin/hooks/use-demo-storage'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, Panel, StatusBadge, stopRowClick, Tag } from '../kit'
import { DemoNote, FormSelect } from '../demo/demo-form'
import { formatRelative } from '../demo/relative-time'
import { InviteMemberDialog } from './invite-member-dialog'

const DEFAULT_FILTERS = { q: '', role: 'all', status: 'all' }

export function AdminTeamView() {
  const [invites, setInvites] = useDemoStorage<TeamMember[]>(ADMIN_STORAGE_KEYS.team, [])
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const members = React.useMemo(() => [DEMO_OWNER, ...invites], [invites])
  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return members.filter((member) => {
      if (query && ![member.name, member.email].some((value) => value.toLowerCase().includes(query))) return false
      if (f.role !== 'all' && member.role !== f.role) return false
      if (f.status !== 'all' && member.status !== f.status) return false
      return true
    })
  }, [members, f])

  const invite = (email: string, role: TeamRole) => {
    setInvites((previous) => [...previous, { id: `inv-${Date.now().toString(36)}`, name: email, email, role, status: 'pending', invitedAt: new Date().toISOString() }])
    logAdminActivity({ area: 'Team', action: 'Invited', label: `${email} as ${role}`, href: '/admin/team' })
    setInviteOpen(false)
    toast.success('Invite added', { description: 'Demo: no email was sent.' })
  }

  const changeRole = React.useCallback(
    (member: TeamMember, role: TeamRole) => {
      if (role === member.role) return
      setInvites((previous) => previous.map((item) => (item.id === member.id ? { ...item, role } : item)))
      logAdminActivity({ area: 'Team', action: 'Role changed', label: `${member.email}: ${member.role} → ${role}`, href: '/admin/team' })
      toast.success(`Role changed to ${role}`)
    },
    [setInvites],
  )

  const remove = React.useCallback(
    (member: TeamMember) => {
      setInvites((previous) => previous.filter((item) => item.id !== member.id))
      logAdminActivity({ area: 'Team', action: 'Removed', label: `Invite for ${member.email}`, href: '/admin/team' })
      toast.success('Invite removed')
    },
    [setInvites],
  )

  const columns = React.useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Member',
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <p className="font-medium text-foreground">{row.original.name}</p>
            {row.original.status === 'active' ? <p className="text-[13px] text-muted-foreground">{row.original.email}</p> : null}
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) =>
          row.original.id === DEMO_OWNER.id ? (
            <Tag>Owner</Tag>
          ) : (
            <div className="w-32" onClick={stopRowClick} onKeyDown={stopRowClick}>
              <FormSelect value={row.original.role} onChange={(role) => changeRole(row.original, role)} options={TEAM_ROLES.map((r) => ({ value: r, label: r }))} className="h-8" />
            </div>
          ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) =>
          row.original.status === 'active' ? (
            <StatusBadge tone="success">Active</StatusBadge>
          ) : (
            <div className="flex flex-col gap-0.5">
              <StatusBadge tone="warning">Invite pending</StatusBadge>
              {row.original.invitedAt ? <span className="text-xs text-muted-foreground">Added {formatRelative(row.original.invitedAt)}</span> : null}
            </div>
          ),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) =>
          row.original.status === 'pending' ? (
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive" onClick={() => remove(row.original)}>
                <Trash2 className="size-4" aria-hidden="true" />
                Remove
              </Button>
            </div>
          ) : null,
      },
    ],
    [changeRole, remove],
  )

  const pending = invites.length

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Team & access"
        count={`1 member${pending ? ` · ${pending} pending` : ''}`}
        description="Who can use the admin and what each role allows."
        meta={<DemoNote>Demo: there are no real accounts. Invites are saved on this device only and no email is sent.</DemoNote>}
        actions={
          <Button type="button" size="sm" className="gap-1.5" onClick={() => setInviteOpen(true)}>
            <UserPlus className="size-4" aria-hidden="true" />
            Invite member
          </Button>
        }
      />
<AdminDataTable
  tabs={{ value: f.status, onChange: (value) => set({ status: value }), options: [{ value: 'active', label: 'Active' }, { value: 'pending', label: 'Invite pending' }] }}
  toolbar={
    <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search name or email" hasActiveFilters={active} onReset={reset} summary={active ? `${filtered.length} of ${members.length} match` : undefined}>
          <AdminFilterSelect label="Role" value={f.role} onChange={(role) => set({ role })} options={TEAM_ROLES.map((r) => ({ value: r, label: r }))} />
        </AdminToolbar>
  }
        columns={columns}
        data={filtered}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No members match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const member = row.original
          return (
            <div className="space-y-3 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{member.name}</p>
                  {member.status === 'active' ? <p className="text-[13px] text-muted-foreground">{member.email}</p> : null}
                </div>
                {member.status === 'active' ? <StatusBadge tone="success">Active</StatusBadge> : <StatusBadge tone="warning">Invite pending</StatusBadge>}
              </div>
              {member.status === 'pending' ? (
                <div className="flex items-center gap-2">
                  <FormSelect value={member.role} onChange={(role) => changeRole(member, role)} options={TEAM_ROLES.map((r) => ({ value: r, label: r }))} className="h-8 flex-1" />
                  <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove invite for ${member.email}`} className="text-muted-foreground hover:text-destructive" onClick={() => remove(member)}>
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              ) : (
                <Tag>{member.role}</Tag>
              )}
            </div>
          )
        }}
      />

      <Panel title="Roles" description="What each role can do in the admin.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TEAM_ROLES.map((role) => {
            const info = TEAM_ROLE_INFO[role]
            return (
              <div key={role} className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{role}</p>
                  <p className="text-[13px] text-muted-foreground">{info.summary}</p>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {info.can.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" aria-label="Can" />
                      {item}
                    </li>
                  ))}
                  {info.cannot.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0" aria-label="Cannot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Panel>

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} existingEmails={invites.map((member) => member.email)} onInvite={invite} />
    </div>
  )
}
