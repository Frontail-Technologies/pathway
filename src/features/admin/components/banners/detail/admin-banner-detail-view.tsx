'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminBanner } from '@/features/admin/data/admin-banners'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { AdminPageHeader, FactList, Panel, StatusBadge, Tag } from '../../kit'
import { bannerPlacementHints, bannerStatusHints, bannerStatusLabels, bannerStatusTones, formatBannerDate, placementDimensions, placementLabel } from '../shared/banner-constants'
import { BannerPreview } from '../shared/banner-preview'

function LinkValue({ label, href }: { label?: string; href?: string }) {
  if (!label && !href) return <span className="text-muted-foreground">None</span>
  return (
    <span className="block">
      {label ?? '—'}
      {href ? (
        <Link href={href} target="_blank" className="mt-0.5 flex w-fit items-center gap-1 font-mono text-[13px] font-normal break-all text-primary hover:underline">
          {href}
          <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
        </Link>
      ) : null}
    </span>
  )
}

function ImageValue({ src, alt, fallback }: { src?: string; alt: string; fallback: string }) {
  if (!src) return <span className="font-normal text-muted-foreground">{fallback}</span>
  // eslint-disable-next-line @next/next/no-img-element -- banner artwork can be any URL
  return <img src={src} alt={alt} className="mt-1 aspect-video w-full rounded-md border border-border object-cover" />
}

export function AdminBannerDetailView({ banner }: { banner: AdminBanner }) {
  const status = banner.effectiveStatus
  const isInternalLink = banner.ctaHref?.startsWith('/')

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/banners', label: 'Banners' }}
        title={banner.name}
        meta={
          <>
            <StatusBadge tone={bannerStatusTones[status]}>{bannerStatusLabels[status]}</StatusBadge>
            <Tag>{placementLabel(banner.placement)}</Tag>
          </>
        }
        actions={
          <>
            {banner.ctaHref ? (
              <Link href={banner.ctaHref} target="_blank" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                Open link
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>
            ) : null}
            <Link href={`/admin/banners/${banner.id}/edit`} className={buttonVariants({ size: 'sm' })}>
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Preview">
            <BannerPreview data={banner} />
          </Panel>

          <Panel title="Copy">
            <FactList
              items={[
                { label: 'Headline', value: banner.title },
                { label: 'Label above headline', value: banner.eyebrow || '—' },
                { label: 'Supporting text', value: banner.description ? <span className="font-normal whitespace-pre-line">{banner.description}</span> : '—' },
              ]}
            />
          </Panel>

          <Panel title="Buttons">
            <FactList
              items={[
                { label: 'Main button', value: <LinkValue label={banner.ctaLabel} href={banner.ctaHref} /> },
                { label: 'Second button', value: <LinkValue label={banner.secondaryCtaLabel} href={banner.secondaryCtaHref} /> },
              ]}
            />
            {banner.ctaHref ? <p className="mt-4 text-[13px] text-muted-foreground">{isInternalLink ? 'The main button links to a page on Pathway.' : 'The main button links to an external site.'}</p> : null}
          </Panel>

          <Panel title="Images" description={`Recommended size ${placementDimensions(banner.placement)}`}>
            <FactList
              items={[
                { label: 'Desktop', value: <ImageValue src={banner.image} alt={banner.imageAlt || banner.title} fallback="No image" /> },
                { label: 'Mobile', value: <ImageValue src={banner.mobileImage} alt={banner.imageAlt || banner.title} fallback="Uses the desktop image" /> },
                { label: 'Alt text', value: banner.imageAlt || '—' },
              ]}
            />
          </Panel>
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <Panel title="Details">
              <FactList
                columns={1}
                items={[
                  { label: 'Status', value: bannerStatusHints[status] },
                  { label: 'Placement', value: <span className="block">{placementLabel(banner.placement)}<span className="mt-0.5 block text-[13px] font-normal text-muted-foreground">{bannerPlacementHints[banner.placement]}</span></span> },
                  { label: 'Starts', value: formatBannerDate(banner.startsAt, true) ?? 'Immediately' },
                  { label: 'Ends', value: formatBannerDate(banner.endsAt, true) ?? 'No end date' },
                  { label: 'Created', value: formatBannerDate(banner.createdAt, true) ?? '—' },
                  { label: 'Last updated', value: formatBannerDate(banner.updatedAt, true) ?? '—' },
                ]}
              />
            </Panel>
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
