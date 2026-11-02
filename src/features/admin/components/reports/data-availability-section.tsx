'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { DomainAvailabilityItem } from '../../data/admin-reports'
import { AdminDataTable } from '../admin-data-table'
import { StatusBadge, Tag } from '../kit'

const categoryLabels: Record<DomainAvailabilityItem['category'], string> = {
  Catalog: 'Catalogue',
  Content: 'Content',
  'Users & Commerce': 'Users',
  'Telemetry & Integrations': 'Integrations',
}

export function AvailabilityStatus({ status }: { status: DomainAvailabilityItem['status'] }) {
  if (status === 'available') return <StatusBadge tone="success">Has data</StatusBadge>
  if (status === 'empty') return <StatusBadge>No records yet</StatusBadge>
  return <StatusBadge tone="warning">Not connected yet</StatusBadge>
}

const columns: ColumnDef<DomainAvailabilityItem>[] = [
  {
    accessorKey: 'domain',
    header: 'Area',
    cell: ({ row }) => (
      <div className="min-w-[180px]">
        <p className="font-medium text-foreground">{row.original.domain}</p>
        <p className="text-[13px] text-muted-foreground">{row.original.operationalNote}</p>
      </div>
    ),
  },
  { accessorKey: 'category', header: 'Group', cell: ({ row }) => <Tag>{categoryLabels[row.original.category]}</Tag> },
  { accessorKey: 'dataSource', header: 'Source', cell: ({ row }) => <span className="whitespace-nowrap">{row.original.dataSource}</span> },
  { accessorKey: 'recordCount', header: 'Records', cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground tabular-nums">{row.original.recordCount}</span> },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <AvailabilityStatus status={row.original.status} /> },
]

export function DataAvailabilitySection({ items }: { items: DomainAvailabilityItem[] }) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      pageSize={50}
      mobileCardRender={(row) => (
        <div className="space-y-1.5 rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium text-foreground">{row.original.domain}</p>
            <AvailabilityStatus status={row.original.status} />
          </div>
          <p className="text-[13px] text-muted-foreground">
            {row.original.dataSource} · {row.original.recordCount}
          </p>
        </div>
      )}
    />
  )
}
