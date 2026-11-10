'use client'

import * as React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { MapPin, Pencil, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { createCity, createState, getGeography, slugify, updateCity, updateState, type AdminCity, type AdminState } from '@/features/admin/data/admin-master-data-api'
import { AdminDataTable } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminTableSkeleton } from '../admin-skeletons'
import { AdminFilterSelect, AdminToolbar, StatusBadge, stopRowClick, Tag } from '../kit'
import { Field, FormSelect } from '../demo/demo-form'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)
const STATE_KINDS: { value: AdminState['kind']; label: string }[] = [
  { value: 'state', label: 'State' },
  { value: 'union_territory', label: 'Union territory' },
]

type Row =
  | { kind: 'state'; id: string; name: string; slug: string; meta: string; count: number; usage: number; state: AdminState }
  | { kind: 'city'; id: string; name: string; slug: string; meta: string; count: number; usage: number; city: AdminCity }

type Filters = { q: string; state: string }
type DialogState = { kind: 'none' } | { kind: 'state'; state: AdminState | null } | { kind: 'city'; city: AdminCity | null; stateId?: string }

function StateDialog({ state, open, onOpenChange }: { state: AdminState | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const queryClient = useQueryClient()
  const [name, setName] = React.useState('')
  const [code, setCode] = React.useState('IN-')
  const [slug, setSlug] = React.useState('')
  const [kind, setKind] = React.useState<AdminState['kind']>('state')
  const [error, setError] = React.useState<string>()
  React.useEffect(() => {
    if (open) {
      setName(state?.name ?? '')
      setCode(state?.code ?? 'IN-')
      setSlug(state?.slug ?? '')
      setKind(state?.kind ?? 'state')
      setError(undefined)
    }
  }, [open, state])
  const mutation = useMutation({
    mutationFn: () => (state ? updateState(state.id, { name: name.trim(), kind }) : createState({ code: code.trim().toUpperCase(), slug, name: name.trim(), kind })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminGeography })
      toast.success(state ? 'State updated' : 'State added')
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not save.')),
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form
          className="grid gap-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            if (!name.trim()) return setError('Enter a name.')
            if (!state && !/^IN-[A-Z]{2}$/.test(code.trim().toUpperCase())) return setError('Use an ISO code such as IN-MH.')
            setError(undefined)
            mutation.mutate()
          }}
        >
          <DialogHeader>
            <DialogTitle>{state ? 'Edit state' : 'Add state or union territory'}</DialogTitle>
            <DialogDescription>{state ? 'The code and slug are fixed because records and URLs use them.' : 'Use the official ISO 3166-2 code.'}</DialogDescription>
          </DialogHeader>
          <Field id="state-name" label="Name" required error={error}>
            <Input
              id="state-name"
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (!state) setSlug(slugify(event.target.value))
              }}
              className="h-9"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field id="state-code" label="ISO code" required>
              <Input id="state-code" value={code} disabled={Boolean(state)} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="IN-MH" className="h-9 font-mono text-[13px]" />
            </Field>
            <Field id="state-slug" label="Slug" required>
              <Input id="state-slug" value={slug} disabled={Boolean(state)} onChange={(event) => setSlug(event.target.value.toLowerCase())} className="h-9 font-mono text-[13px]" />
            </Field>
          </div>
          <Field id="state-kind" label="Type">
            <FormSelect id="state-kind" value={kind} onChange={setKind} options={STATE_KINDS} />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving…' : state ? 'Save changes' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CityDialog({ states, city, defaultStateId, open, onOpenChange }: { states: AdminState[]; city: AdminCity | null; defaultStateId?: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const queryClient = useQueryClient()
  const [stateId, setStateId] = React.useState('')
  const [name, setName] = React.useState('')
  const [slug, setSlug] = React.useState('')
  const [lgd, setLgd] = React.useState('')
  const [error, setError] = React.useState<string>()
  React.useEffect(() => {
    if (open) {
      setStateId(city?.stateId ?? defaultStateId ?? states[0]?.id ?? '')
      setName(city?.name ?? '')
      setSlug(city?.slug ?? '')
      setLgd(city?.lgdCode ?? '')
      setError(undefined)
    }
  }, [open, city, defaultStateId, states])
  const mutation = useMutation({
    mutationFn: () => (city ? updateCity(city.id, { name: name.trim(), lgdCode: lgd.trim() || null }) : createCity(stateId, { slug, name: name.trim(), lgdCode: lgd.trim() || null })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminGeography })
      toast.success(city ? 'City updated' : 'City added')
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not save.')),
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form
          className="grid gap-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            if (!name.trim()) return setError('Enter a name.')
            if (!city && !stateId) return setError('Choose a state.')
            if (lgd && !/^\d{3,8}$/.test(lgd.trim())) return setError('The LGD code is 3 to 8 digits.')
            setError(undefined)
            mutation.mutate()
          }}
        >
          <DialogHeader>
            <DialogTitle>{city ? 'Edit city' : 'Add city'}</DialogTitle>
            <DialogDescription>{city ? 'The slug and state are fixed because records and URLs use them.' : 'Cities are unique within a state.'}</DialogDescription>
          </DialogHeader>
          <Field id="city-state" label="State" required>
            <FormSelect id="city-state" value={stateId} onChange={setStateId} options={states.map((s) => ({ value: s.id, label: s.name }))} placeholder="Choose a state" className={city ? 'pointer-events-none opacity-60' : undefined} />
          </Field>
          <Field id="city-name" label="Name" required error={error}>
            <Input
              id="city-name"
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (!city) setSlug(slugify(event.target.value))
              }}
              className="h-9"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field id="city-slug" label="Slug" required>
              <Input id="city-slug" value={slug} disabled={Boolean(city)} onChange={(event) => setSlug(event.target.value.toLowerCase())} className="h-9 font-mono text-[13px]" />
            </Field>
            <Field id="city-lgd" label="LGD code" hint="Optional">
              <Input id="city-lgd" value={lgd} onChange={(event) => setLgd(event.target.value)} inputMode="numeric" className="h-9 font-mono text-[13px]" />
            </Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving…' : city ? 'Save changes' : 'Add city'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function GeographyPanel({ canManage, filters, setFilters }: { canManage: boolean; filters: Filters; setFilters: (next: Partial<Filters>) => void }) {
  const query = useQuery({ queryKey: queryKeys.adminGeography, queryFn: getGeography })
  const [dialog, setDialog] = React.useState<DialogState>({ kind: 'none' })

  const states = React.useMemo(() => query.data?.states ?? [], [query.data])
  const showingCities = filters.state !== 'all'
  const selectedState = states.find((s) => s.id === filters.state)

  const rows = React.useMemo<Row[]>(() => {
    if (!query.data) return []
    if (!showingCities) return states.map((state) => ({ kind: 'state', id: state.id, name: state.name, slug: state.slug, meta: state.code, count: state.cities, usage: state.usage, state }))
    return query.data.cities.filter((c) => c.stateId === filters.state).map((city) => ({ kind: 'city', id: city.id, name: city.name, slug: city.slug, meta: city.lgdCode ? `LGD ${city.lgdCode}` : '', count: 0, usage: city.usage, city }))
  }, [query.data, states, filters.state, showingCities])

  const filtered = React.useMemo(() => {
    const needle = filters.q.trim().toLowerCase()
    return needle ? rows.filter((row) => [row.name, row.slug, row.meta].some((v) => v.toLowerCase().includes(needle))) : rows
  }, [rows, filters.q])

  const columns = React.useMemo<ColumnDef<Row>[]>(() => {
    const stateOnly: ColumnDef<Row>[] = showingCities
      ? []
      : [
          { id: 'kind', header: 'Type', cell: ({ row }) => (row.original.kind === 'state' ? <StatusBadge tone={row.original.state.kind === 'state' ? 'info' : 'neutral'}>{row.original.state.kind === 'state' ? 'State' : 'Union territory'}</StatusBadge> : null) },
          { accessorKey: 'count', header: 'Cities', cell: ({ row }) => <span className={row.original.count ? 'tabular-nums' : 'tabular-nums text-muted-foreground'}>{row.original.count}</span> },
        ]
    return [
      {
        accessorKey: 'name',
        header: showingCities ? 'City' : 'State',
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            {row.original.kind === 'state' ? (
              <button
                type="button"
                onClick={(event) => {
                  stopRowClick(event)
                  setFilters({ state: row.original.id, q: '' })
                }}
                className="text-left font-medium text-foreground hover:text-primary hover:underline"
              >
                {row.original.name}
              </button>
            ) : (
              <p className="font-medium text-foreground">{row.original.name}</p>
            )}
            <p className="font-mono text-[12px] text-muted-foreground">{row.original.slug}</p>
          </div>
        ),
      },
      { id: 'meta', header: showingCities ? 'LGD code' : 'Code', cell: ({ row }) => (row.original.meta ? <Tag>{row.original.meta}</Tag> : <span className="text-muted-foreground">—</span>) },
      ...stateOnly,
      { accessorKey: 'usage', header: 'Used by', cell: ({ row }) => <span className={row.original.usage ? 'tabular-nums' : 'tabular-nums text-muted-foreground'}>{row.original.usage}</span> },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1" onClick={stopRowClick} onKeyDown={stopRowClick}>
            {row.original.kind === 'state' ? (
              <Button variant="ghost" size="sm" className="gap-1.5" disabled={!canManage} onClick={() => setDialog({ kind: 'city', city: null, stateId: row.original.id })}>
                <Plus className="size-3.5" aria-hidden="true" />
                City
              </Button>
            ) : null}
            <Button variant="ghost" size="icon-sm" aria-label={`Edit ${row.original.name}`} disabled={!canManage} onClick={() => setDialog(row.original.kind === 'state' ? { kind: 'state', state: row.original.state } : { kind: 'city', city: row.original.city })}>
              <Pencil className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ),
      },
    ]
  }, [showingCities, canManage, setFilters])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">{selectedState ? `${selectedState.name} · ${selectedState.cities} ${selectedState.cities === 1 ? 'city' : 'cities'}` : `${states.length} states and union territories`}</p>
            <p className="text-[13px] text-muted-foreground">Institutions, coaching centres, scholarships and student preferences point at these rows, so they are never deleted; correct a name instead.</p>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button size="sm" variant="outline" className="gap-1.5" disabled={!canManage} onClick={() => setDialog({ kind: 'state', state: null })}>
            <Plus className="size-4" aria-hidden="true" />
            State
          </Button>
          <Button size="sm" className="gap-1.5" disabled={!canManage || states.length === 0} onClick={() => setDialog({ kind: 'city', city: null, stateId: selectedState?.id })}>
            <Plus className="size-4" aria-hidden="true" />
            City
          </Button>
        </div>
      </div>

      {query.isLoading ? (
        <AdminTableSkeleton rows={6} columns={5} />
      ) : query.isError ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            art="loadError"
            title="Could not load geography"
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
          toolbar={
            <AdminToolbar search={filters.q} onSearchChange={(q) => setFilters({ q })} searchPlaceholder={showingCities ? 'Search cities' : 'Search states'} hasActiveFilters={Boolean(filters.q) || showingCities} onReset={() => setFilters({ q: '', state: 'all' })} resultCount={filtered.length}>
              <AdminFilterSelect label="Show" value={filters.state} onChange={(state) => setFilters({ state })} allLabel="States" options={states.map((s) => ({ value: s.id, label: `Cities in ${s.name}` }))} />
            </AdminToolbar>
          }
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          pageSize={25}
          onRowClick={(row) => (row.kind === 'state' ? setFilters({ state: row.id, q: '' }) : undefined)}
          getRowAriaLabel={(row) => (row.kind === 'state' ? `Show cities in ${row.name}` : row.name)}
          hasActiveFilters={Boolean(filters.q)}
          onResetFilters={() => setFilters({ q: '' })}
          emptyTitle={showingCities ? 'No cities yet' : 'No states match'}
          emptyDescription={showingCities ? 'Add the first city for this state.' : 'Try a different search.'}
          mobileCardRender={(row) => {
            const item = row.original
            return (
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="font-mono text-[12px] text-muted-foreground">
                    {item.slug}
                    {item.meta ? ` · ${item.meta}` : ''}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {item.kind === 'state' ? `${item.count} ${item.count === 1 ? 'city' : 'cities'} · ` : ''}
                    {item.usage} record{item.usage === 1 ? '' : 's'}
                  </p>
                </div>
                {item.kind === 'state' ? (
                  <Button variant="outline" size="sm" onClick={() => setFilters({ state: item.id, q: '' })}>
                    Cities
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled={!canManage} onClick={() => setDialog({ kind: 'city', city: item.city })}>
                    Edit
                  </Button>
                )}
              </div>
            )
          }}
        />
      )}

      <StateDialog state={dialog.kind === 'state' ? dialog.state : null} open={dialog.kind === 'state'} onOpenChange={(open) => !open && setDialog({ kind: 'none' })} />
      <CityDialog states={states} city={dialog.kind === 'city' ? dialog.city : null} defaultStateId={dialog.kind === 'city' ? dialog.stateId : undefined} open={dialog.kind === 'city'} onOpenChange={(open) => !open && setDialog({ kind: 'none' })} />
    </div>
  )
}
