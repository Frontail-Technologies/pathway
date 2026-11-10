'use client'

import * as React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Archive, ArrowDown, ArrowUp, GitMerge, Link2, MoreHorizontal, Pencil, Plus, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { getTerm, kindHelp, listTerms, reorderTerms, updateTerm, type AdminTerm, type AdminTermDetail, type KindOverview, type TaxonomyKind } from '@/features/admin/data/admin-master-data-api'
import { AdminDataTable } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminTableSkeleton } from '../admin-skeletons'
import { AdminToolbar, StatusBadge, stopRowClick, Tag } from '../kit'
import { FormSelect } from '../demo/demo-form'
import { MergeDialog, TermDialog, TermSheet, useInvalidateTaxonomy } from './term-dialogs'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)

type Filters = { q: string; status: string }

export function TaxonomyPanel({ kind, kinds, onKindChange, canManage, filters, setFilters }: { kind: TaxonomyKind; kinds: KindOverview[]; onKindChange: (kind: TaxonomyKind) => void; canManage: boolean; filters: Filters; setFilters: (next: Partial<Filters>) => void }) {
  const refresh = useInvalidateTaxonomy(kind)
  const query = useQuery({ queryKey: queryKeys.adminTaxonomyTerms(kind), queryFn: () => listTerms(kind) })
  const [editing, setEditing] = React.useState<AdminTerm | null>(null)
  const [dialog, setDialog] = React.useState<'none' | 'term' | 'merge' | 'sheet'>('none')
  const [sheetTerm, setSheetTerm] = React.useState<AdminTermDetail | null>(null)

  const terms = React.useMemo(() => query.data ?? [], [query.data])
  const counts = React.useMemo(() => ({ active: terms.filter((t) => t.isActive).length, retired: terms.filter((t) => !t.isActive).length }), [terms])
  const filtered = React.useMemo(() => {
    const needle = filters.q.trim().toLowerCase()
    return terms.filter((term) => {
      if (filters.status === 'active' && !term.isActive) return false
      if (filters.status === 'retired' && term.isActive) return false
      if (needle && ![term.label, term.slug, ...term.aliases.map((a) => a.alias)].some((v) => v.toLowerCase().includes(needle))) return false
      return true
    })
  }, [terms, filters])

  const act = useMutation({
    mutationFn: async ({ run }: { run: () => Promise<unknown>; success: string }) => run(),
    onSuccess: (_, v) => {
      refresh()
      toast.success(v.success)
    },
    onError: (error) => toast.error(messageOf(error, 'That change did not go through.')),
  })

  const move = React.useCallback(
    (term: AdminTerm, direction: -1 | 1) => {
      const ordered = [...terms].sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
      const index = ordered.findIndex((t) => t.id === term.id)
      const target = index + direction
      if (target < 0 || target >= ordered.length) return
      ;[ordered[index], ordered[target]] = [ordered[target]!, ordered[index]!]
      act.mutate({ run: () => reorderTerms(kind, ordered.map((t) => t.id)), success: 'Order updated' })
    },
    [terms, kind, act],
  )

  const openSheet = React.useCallback(
    (term: AdminTerm) => {
      setSheetTerm({ ...term, usageByTable: [] })
      setDialog('sheet')
      getTerm(kind, term.id)
        .then(setSheetTerm)
        .catch(() => undefined)
    },
    [kind],
  )

  const liveSheetTerm = React.useMemo(() => {
    if (!sheetTerm) return null
    const current = terms.find((t) => t.id === sheetTerm.id)
    return current ? { ...current, usageByTable: sheetTerm.usageByTable } : sheetTerm
  }, [sheetTerm, terms])

  const columns = React.useMemo<ColumnDef<AdminTerm>[]>(
    () => [
      {
        accessorKey: 'label',
        header: 'Term',
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <button
              type="button"
              onClick={(event) => {
                stopRowClick(event)
                openSheet(row.original)
              }}
              className="text-left font-medium text-foreground hover:text-primary hover:underline"
            >
              {row.original.label}
            </button>
            <p className="font-mono text-[12px] text-muted-foreground">{row.original.slug}</p>
          </div>
        ),
      },
      { id: 'parent', header: 'Parent', cell: ({ row }) => (row.original.parent ? <Tag>{row.original.parent.label}</Tag> : <span className="text-muted-foreground">—</span>) },
      { id: 'aliases', header: 'Aliases', cell: ({ row }) => <span className={row.original.aliases.length ? 'tabular-nums' : 'tabular-nums text-muted-foreground'}>{row.original.aliases.length}</span> },
      { accessorKey: 'usage', header: 'Used by', cell: ({ row }) => <span className={row.original.usage ? 'tabular-nums' : 'tabular-nums text-muted-foreground'}>{row.original.usage}</span> },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => (
          <StatusBadge tone={row.original.isActive ? 'success' : 'neutral'}>{row.original.isActive ? 'Active' : row.original.metadata.mergedInto ? `Merged into ${String(row.original.metadata.mergedInto)}` : 'Retired'}</StatusBadge>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
          const term = row.original
          return (
            <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${term.label}`} />}>
                  <MoreHorizontal className="size-4" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem onClick={() => openSheet(term)}>
                    <Link2 className="size-4" aria-hidden="true" />
                    Usage and aliases
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!canManage}
                    onClick={() => {
                      setEditing(term)
                      setDialog('term')
                    }}
                  >
                    <Pencil className="size-4" aria-hidden="true" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={!canManage || act.isPending} onClick={() => move(term, -1)}>
                    <ArrowUp className="size-4" aria-hidden="true" />
                    Move up
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={!canManage || act.isPending} onClick={() => move(term, 1)}>
                    <ArrowDown className="size-4" aria-hidden="true" />
                    Move down
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {term.isActive ? (
                    <>
                      <DropdownMenuItem
                        disabled={!canManage}
                        onClick={() => {
                          setEditing(term)
                          setDialog('merge')
                        }}
                      >
                        <GitMerge className="size-4" aria-hidden="true" />
                        Merge into…
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" disabled={!canManage} onClick={() => act.mutate({ run: () => updateTerm(kind, term.id, { isActive: false }), success: `${term.label} retired` })}>
                        <Archive className="size-4" aria-hidden="true" />
                        Retire
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem disabled={!canManage} onClick={() => act.mutate({ run: () => updateTerm(kind, term.id, { isActive: true }), success: `${term.label} restored` })}>
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Restore
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [kind, canManage, act, move, openSheet],
  )

  const kindOptions = kinds.map((k) => ({ value: k.kind, label: `${k.label} (${k.active})` }))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="sm:max-w-xs sm:flex-1">
          <label htmlFor="kind-select" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Taxonomy kind
          </label>
          <FormSelect id="kind-select" value={kind} onChange={onKindChange} options={kindOptions} />
          <p className="mt-2 text-[13px] text-muted-foreground">{kindHelp[kind]}</p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 self-start sm:self-auto"
          disabled={!canManage}
          onClick={() => {
            setEditing(null)
            setDialog('term')
          }}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add term
        </Button>
      </div>

      {query.isLoading ? (
        <AdminTableSkeleton rows={6} columns={5} />
      ) : query.isError ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            art="loadError"
            title="Could not load terms"
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
            value: filters.status,
            onChange: (status) => setFilters({ status }),
            total: terms.length,
            options: [
              { value: 'active', label: 'Active', count: counts.active },
              { value: 'retired', label: 'Retired', count: counts.retired },
            ],
          }}
          toolbar={<AdminToolbar search={filters.q} onSearchChange={(q) => setFilters({ q })} searchPlaceholder="Search label, slug or alias" hasActiveFilters={Boolean(filters.q)} onReset={() => setFilters({ q: '' })} resultCount={filtered.length} />}
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          pageSize={25}
          onRowClick={(row) => openSheet(row)}
          getRowAriaLabel={(row) => `Open ${row.label}`}
          hasActiveFilters={Boolean(filters.q)}
          onResetFilters={() => setFilters({ q: '' })}
          emptyTitle={filters.status === 'retired' ? 'No retired terms' : 'No terms match'}
          emptyDescription={filters.status === 'retired' ? 'Retired terms stay here for history and can be restored.' : 'Try a different search or add a term.'}
          mobileCardRender={(row) => {
            const term = row.original
            return (
              <button type="button" onClick={() => openSheet(term)} className="flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{term.label}</p>
                  <p className="font-mono text-[12px] text-muted-foreground">{term.slug}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {term.usage} record{term.usage === 1 ? '' : 's'} · {term.aliases.length} alias{term.aliases.length === 1 ? '' : 'es'}
                  </p>
                </div>
                <StatusBadge tone={term.isActive ? 'success' : 'neutral'}>{term.isActive ? 'Active' : 'Retired'}</StatusBadge>
              </button>
            )
          }}
        />
      )}

      <TermDialog kind={kind} terms={terms} term={editing} open={dialog === 'term'} onOpenChange={(open) => !open && setDialog('none')} />
      <MergeDialog kind={kind} terms={terms} term={editing} open={dialog === 'merge'} onOpenChange={(open) => !open && setDialog('none')} />
      <TermSheet kind={kind} term={liveSheetTerm} open={dialog === 'sheet'} onOpenChange={(open) => !open && setDialog('none')} />
    </div>
  )
}
