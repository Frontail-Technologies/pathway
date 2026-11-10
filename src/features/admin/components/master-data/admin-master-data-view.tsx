'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { listKinds, TAXONOMY_KINDS, type TaxonomyKind } from '@/features/admin/data/admin-master-data-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminPageHeader } from '../kit'
import { GeographyPanel } from './geography-panel'
import { TaxonomyPanel } from './taxonomy-panel'

const DEFAULT_FILTERS = { tab: 'taxonomy', kind: 'stream', q: '', status: 'active', state: 'all' }

export function AdminMasterDataView() {
  const { session } = useAdminSession()
  const canManage = session?.role === 'admin'
  const { values: f, set } = useUrlFilters(DEFAULT_FILTERS)
  const kinds = useQuery({ queryKey: queryKeys.adminTaxonomyKinds, queryFn: listKinds, enabled: Boolean(session) })
  const kind = (TAXONOMY_KINDS as readonly string[]).includes(f.kind) ? (f.kind as TaxonomyKind) : 'stream'
  const totals = kinds.data ? kinds.data.reduce((acc, k) => ({ active: acc.active + k.active, aliases: acc.aliases + k.aliases }), { active: 0, aliases: 0 }) : null
  const fallbackKinds = React.useMemo(() => TAXONOMY_KINDS.map((k) => ({ kind: k, label: k.replace(/_/g, ' '), active: 0, retired: 0, aliases: 0 })), [])

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Workspace"
        title="Master data"
        count={totals ? `${totals.active} terms · ${totals.aliases} aliases` : undefined}
        description="The shared vocabularies every screen reads: study levels, streams, subjects, exams, states and cities. Changes reach the website, the app and the admin filters on their next load."
        meta={!canManage && session ? <p className="text-[13px] text-muted-foreground">Staff can browse master data; only administrators change it.</p> : undefined}
      />

      <Tabs value={f.tab} onValueChange={(value) => set({ tab: String(value), q: '' })}>
        <TabsList>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>
      </Tabs>

      {f.tab === 'geography' ? (
        <GeographyPanel canManage={canManage} filters={{ q: f.q, state: f.state }} setFilters={(next) => set(next)} />
      ) : (
        <TaxonomyPanel kind={kind} kinds={kinds.data ?? fallbackKinds} onKindChange={(next) => set({ kind: next, q: '' })} canManage={canManage} filters={{ q: f.q, status: f.status }} setFilters={(next) => set(next)} />
      )}
    </div>
  )
}
