'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../../kit'
import {
  formatPromotionDate,
  placementSlots,
  promotionKindHints,
  promotionKindLabels,
  promotionPlacementLabels,
  promotionStatusHints,
  promotionStatusLabels,
  promotionStatusTones,
  promotionTargetTypeLabels,
  promotionTitle,
} from '../shared/promotion-constants'

export function AdminPromotionDetailView({ promotion }: { promotion: AdminPromotion }) {
  const [copied, setCopied] = React.useState(false)
  const slots = placementSlots(promotion.placement)

  const copyId = () => {
    void navigator.clipboard.writeText(promotion.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/promotions', label: 'Featured listings' }}
        title={promotionTitle(promotion)}
        media={<Monogram name={promotionTitle(promotion)} size="lg" />}
        chips={
          <>
            <StatusBadge tone={promotionStatusTones[promotion.effectiveStatus]}>{promotionStatusLabels[promotion.effectiveStatus]}</StatusBadge>
            <Tag>{promotionKindLabels[promotion.kind]}</Tag>
          </>
        }
        actions={
          <>
            <Button type="button" variant="outline" size="sm" onClick={copyId} className="gap-1.5">
              {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy ID'}
            </Button>
            <Link href={`/admin/promotions/${promotion.id}/edit`} className={buttonVariants({ size: 'sm' })}>
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel
            title="Featured record"
            action={
              promotion.targetPublicUrl ? (
                <a href={promotion.targetPublicUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground">
                  Public page
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              ) : undefined
            }
          >
            <div className="flex items-start gap-3">
              {promotion.targetImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- record imagery can be any URL
                <img src={promotion.targetImageUrl} alt="" className="size-12 shrink-0 rounded-md border border-border object-cover" />
              ) : null}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {promotion.targetAdminUrl ? (
                    <Link href={promotion.targetAdminUrl} className="text-sm font-medium text-foreground hover:text-primary hover:underline">
                      {promotion.targetName || promotion.targetId}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-foreground">{promotion.targetName || promotion.targetId}</span>
                  )}
                  <Tag>{promotionTargetTypeLabels[promotion.targetType]}</Tag>
                </div>
                {promotion.targetSubtitle ? <p className="mt-0.5 text-[13px] text-muted-foreground">{promotion.targetSubtitle}</p> : null}
              </div>
            </div>
          </Panel>

          <Panel title="Placement">
            <FactList
              items={[
                { label: 'Slot', value: promotionPlacementLabels[promotion.placement] },
                { label: 'Slots on this surface', value: slots ?? '—' },
                { label: 'Priority', value: promotion.priority ?? 'Default' },
                { label: 'Label', value: promotion.label || '—' },
                { label: 'Type', value: <span className="block">{promotionKindLabels[promotion.kind]}<span className="mt-0.5 block text-[13px] font-normal text-muted-foreground">{promotionKindHints[promotion.kind]}</span></span> },
              ]}
            />
          </Panel>

          {promotion.notes ? (
            <Panel title="Notes">
              <p className="text-sm whitespace-pre-line text-foreground">{promotion.notes}</p>
            </Panel>
          ) : null}
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <Panel title="Schedule">
              <FactList
                columns={1}
                items={[
                  { label: 'Status', value: promotionStatusHints[promotion.effectiveStatus] },
                  { label: 'Starts', value: formatPromotionDate(promotion.startsAt) ?? 'Immediately' },
                  { label: 'Ends', value: formatPromotionDate(promotion.endsAt) ?? 'No end date' },
                  { label: 'Created', value: formatPromotionDate(promotion.createdAt) ?? '—' },
                  { label: 'Last updated', value: formatPromotionDate(promotion.updatedAt) ?? '—' },
                ]}
              />
              <p className="mt-4 text-[13px] text-muted-foreground">Status follows the start and end dates automatically.</p>
            </Panel>
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
