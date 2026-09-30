'use client'

import Link from 'next/link'
import type { AdminInstitutionDetail } from '@/features/admin/types/institutions'
import {
  institutionCompletenessStatusStyles as completenessStatusStyles,
  institutionDetailQualityBadgeStyles as qualityBadgeStyles,
  institutionQualityCheckStyles as qualityCheckStyles,
} from '@/features/admin/constants/institutions'
import { AdminDetailStickyRail } from '../admin-detail-sticky-rail'
import { AdminSection } from '../admin-section'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  GraduationCap,
  Banknote,
  MapPin,
  AlertCircle,
  ShieldAlert,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminInstitutionDetailView({
  data,
}: {
  data: AdminInstitutionDetail
}) {
  const { institution, detail } = data

  const initials = institution.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)

  const qualityItems: { key: keyof typeof institution.qualityBreakdown; label: string }[] = [
    { key: 'identity', label: 'Identity & Approval' },
    { key: 'programs', label: 'Program Data' },
    { key: 'fees', label: 'Fee Schedules' },
    { key: 'admissions', label: 'Admissions Process' },
    { key: 'placements', label: 'Placement Claims' },
    { key: 'scholarships', label: 'Scholarship Schemes' },
    { key: 'media', label: 'Campus Media' },
  ]

  const completenessItems: { key: keyof typeof institution.breakdown; label: string }[] = [
    { key: 'identity', label: 'Identity & Accreditation' },
    { key: 'overview', label: 'Overview & Highlights' },
    { key: 'programs', label: 'Programs & Courses' },
    { key: 'fees', label: 'Fee Schedules' },
    { key: 'admissions', label: 'Admission Processes' },
    { key: 'facilities', label: 'Campus Facilities' },
    { key: 'placements', label: 'Placement Statistics' },
    { key: 'scholarships', label: 'Scholarship Schemes' },
    { key: 'media', label: 'Photography & Gallery' },
  ]

  const qualityConfig = qualityBadgeStyles[institution.qualityStatus]

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/institutions"
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
          })}
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Back to Institutions
        </Link>

        <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <Avatar size="lg" className="bg-primary/10 text-primary font-bold shrink-0 text-base">
              <AvatarFallback className="bg-primary/10 text-primary text-base font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                  {institution.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold px-2 py-0.5"
                >
                  {institution.type}
                </Badge>
                <Badge
                  variant="secondary"
                  className={cn('text-xs font-semibold px-2 py-0.5', qualityConfig.className)}
                >
                  {qualityConfig.label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {institution.city}, {institution.state}
                </span>
                <span>•</span>
                <span>{institution.approval}</span>
                {detail?.established && (
                  <>
                    <span>•</span>
                    <span>Est. {detail.established}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
            {institution.hasDetailPage && (
              <Link
                href={`/college/${institution.slug}`}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'text-xs font-semibold bg-card shadow-xs inline-flex',
                })}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Public Page
              </Link>
            )}

            <Link
              href={`/admin/institutions/${institution.id}/edit`}
              className={buttonVariants({ size: 'sm', className: 'text-xs font-semibold gap-1.5 shadow-xs' })}
            >
              <Edit className="w-3.5 h-3.5" />
              Edit Institution
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <AdminSection title="Overview">
            {detail?.overviewCopy ? (
              <div className="space-y-4 text-xs text-foreground leading-relaxed">
                <p>{detail.overviewCopy}</p>

                {detail.facts && detail.facts.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-border/60">
                    {detail.facts.map((fact) => (
                      <div key={fact.label} className="p-3 rounded-lg bg-muted/40 space-y-1">
                        <span className="text-[11px] text-muted-foreground font-medium block">
                          {fact.label}
                        </span>
                        <span className="text-xs font-bold text-foreground block">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-muted-foreground leading-relaxed">
                  Catalog entry currently contains basic discovery information. In-depth academic narrative, founding history, and institutional facts have not been configured yet.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-medium block">Primary Degree</span>
                    <span className="text-xs font-bold text-foreground block">{institution.degree}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-medium block">Popular Program</span>
                    <span className="text-xs font-bold text-foreground block">{institution.popularCourse}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-medium block">Fee Baseline</span>
                    <span className="text-xs font-bold text-foreground block">{institution.fees}</span>
                  </div>
                </div>
              </div>
            )}
          </AdminSection>

          <AdminSection
            title="Programs & Courses"
            badge={
              <Badge variant="secondary" className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-2 py-0.5">
                {detail?.courses?.length || 1} {detail?.courses?.length === 1 ? 'Program' : 'Programs'}
              </Badge>
            }
          >
            {detail?.courses && detail.courses.length > 0 ? (
              <div className="divide-y divide-border/60 -my-2">
                {detail.courses.map((course) => (
                  <div key={course.name} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{course.name}</span>
                        <Badge variant="secondary" className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0">
                          {course.level}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {course.duration} • {course.mode} • Exam: {course.exam} • Eligibility: {course.eligibility}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs font-bold text-foreground block">{course.fees}</span>
                      <span className="text-[10px] text-muted-foreground block">Annual tuition</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div>
                    <span className="font-semibold text-foreground block">{institution.popularCourse}</span>
                    <span className="text-[11px] text-muted-foreground block">Primary catalogued course</span>
                  </div>
                  <span className="font-bold text-foreground">{institution.fees}</span>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Additional course curriculum, specializations, and semester syllabi can be managed once ADM-05 Programs is connected.
                </p>
              </div>
            )}
          </AdminSection>

          {detail?.fees && detail.fees.length > 0 && (
            <AdminSection title="Admissions & Fees">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/30 overflow-hidden border border-border/60">
                  <div className="grid grid-cols-4 px-3.5 py-2 bg-muted/70 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Course</span>
                    <span>Duration</span>
                    <span>Tuition Fee</span>
                    <span className="text-right">Total Fee</span>
                  </div>
                  <div className="divide-y divide-border/60 text-xs">
                    {detail.fees.map((fee) => (
                      <div key={fee.course} className="grid grid-cols-4 px-3.5 py-2.5 items-center">
                        <span className="font-semibold text-foreground">{fee.course}</span>
                        <span className="text-muted-foreground">{fee.duration}</span>
                        <span className="text-muted-foreground">{fee.tuitionFee}</span>
                        <span className="text-right font-bold text-foreground">{fee.totalFee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {detail.admissions && detail.admissions.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-foreground block">Admission Criteria</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {detail.admissions.map((adm) => (
                        <div key={adm.title} className="p-3 rounded-lg bg-muted/40 space-y-1">
                          <span className="text-xs font-semibold text-foreground block">{adm.title}</span>
                          <span className="text-[11px] text-muted-foreground block">Exam: {adm.exam}</span>
                          <span className="text-[10px] text-primary font-medium block">{adm.selection}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AdminSection>
          )}

          {detail?.facilities && detail.facilities.length > 0 && (
            <AdminSection title="Campus Facilities">
              <div className="flex flex-wrap gap-2">
                {detail.facilities.map((fac) => (
                  <Badge
                    key={fac}
                    variant="secondary"
                    className="text-xs font-medium bg-muted/80 text-foreground border-0 px-2.5 py-1"
                  >
                    {fac}
                  </Badge>
                ))}
              </div>
            </AdminSection>
          )}

          {detail?.placementMetrics && detail.placementMetrics.length > 0 && (
            <AdminSection title="Placements & Recruiters">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-warning-surface border border-warning/20 flex items-center gap-2.5 text-foreground">
                  <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                  <span className="text-xs font-medium">
                    Placement statistics and package claims lack recorded provenance • Requires source review
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {detail.placementMetrics.map((pm) => (
                    <div key={pm.label} className="p-3 rounded-lg bg-muted/40 space-y-1">
                      <span className="text-[11px] text-muted-foreground font-medium block">{pm.label}</span>
                      <span className="text-sm font-extrabold text-foreground block">{pm.value}</span>
                    </div>
                  ))}
                </div>

                {detail.recruiters && detail.recruiters.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-foreground block mb-2">Key Recruiters</span>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.recruiters.map((rec) => (
                        <span
                          key={rec}
                          className="text-[11px] font-medium bg-card px-2.5 py-1 rounded-md border border-border/80 text-foreground"
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AdminSection>
          )}

          {detail?.scholarships && detail.scholarships.length > 0 && (
            <AdminSection title="Scholarships">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-warning-surface border border-warning/20 flex items-center gap-2.5 text-foreground">
                  <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                  <span className="text-xs font-medium">
                    Scholarship deadlines and financial terms have no recorded source • Requires source review
                  </span>
                </div>

                <div className="space-y-2.5">
                  {detail.scholarships.map((sch) => (
                    <div key={sch.name} className="p-3.5 rounded-lg bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-xs font-bold text-foreground block">{sch.name}</span>
                        <span className="text-[11px] text-muted-foreground block">{sch.eligibility}</span>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <Badge variant="secondary" className="text-[10px] font-bold bg-success-surface text-success border-0 px-2 py-0.5">
                          {sch.benefit}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground block mt-1">{sch.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AdminSection>
          )}

          {detail?.gallery && detail.gallery.length > 0 && (
            <AdminSection title="Media Gallery">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {detail.gallery.slice(0, 4).map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded">
                      {img.category}
                    </span>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          <AdminSection title="Change History">
            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 shrink-0 text-muted-foreground/70" />
              <p className="text-xs leading-relaxed">
                No audit log entries recorded for this institution yet. Ingestion and editorial changes will be logged here.
              </p>
            </div>
          </AdminSection>
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <AdminSection title="Data Quality">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>Trust & Review Status</span>
                  <Badge
                    variant="secondary"
                    className={cn('text-[10px] font-semibold px-2 py-0.5', qualityConfig.className)}
                  >
                    {qualityConfig.label}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Operational readiness audit derived from factual source provenance and completeness.
                </p>
              </div>

              <div className="space-y-2">
                {qualityItems.map(({ key, label }) => {
                  const state = institution.qualityBreakdown[key]
                  const config = qualityCheckStyles[state]
                  const Icon = config.icon

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-1.5 text-xs border-b border-border/50 last:border-0"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <Badge
                        variant="secondary"
                        className={cn('text-[10px] font-semibold gap-1 px-2 py-0.5', config.badgeClass)}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    </div>
                  )
                })}
              </div>

              {institution.topIssues && institution.topIssues.length > 0 && (
                <div className="pt-2 border-t border-border/60 space-y-2">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
                    Actionable Items
                  </span>
                  <div className="space-y-1.5">
                    {institution.topIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="flex items-start gap-2 p-2 rounded-md bg-muted/40 text-[11px] text-muted-foreground leading-snug"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
                        <span>{issue.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AdminSection>

          <AdminSection title="Content Completeness">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>Profile Score</span>
                  <span className="tabular-nums">{institution.completeness}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-300',
                      institution.completeness >= 80
                        ? 'bg-success'
                        : institution.completeness >= 35
                        ? 'bg-warning'
                        : 'bg-muted-foreground/50'
                    )}
                    style={{ width: `${institution.completeness}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {completenessItems.map(({ key, label }) => {
                  const state = institution.breakdown[key]
                  const config = completenessStatusStyles[state]
                  const Icon = config.icon

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-1.5 text-xs border-b border-border/50 last:border-0"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <Badge
                        variant="secondary"
                        className={cn('text-[10px] font-semibold gap-1 px-2 py-0.5', config.badgeClass)}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          </AdminSection>

          <AdminSection title="Data Source & Sync">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Source Type</span>
                <span className="font-semibold text-foreground capitalize">
                  Manual Catalog
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Sync Status</span>
                <Badge variant="secondary" className="text-[10px] font-semibold bg-secondary text-secondary-foreground border-0 px-2 py-0.5 capitalize">
                  Manual
                </Badge>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Source Origin</span>
                <span className="text-muted-foreground font-medium">Internal Record</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Incoming Changes</span>
                <span className="text-muted-foreground">None</span>
              </div>
            </div>
          </AdminSection>

          <AdminSection title="Admin Actions">
            <div className="space-y-2">
              <Link
                href={`/admin/institutions/${institution.id}/edit`}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
                })}
              >
                <Edit className="w-3.5 h-3.5 mr-2 text-primary" />
                Edit Institution Details
              </Link>

              {institution.hasDetailPage ? (
                <Link
                  href={`/college/${institution.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
                  })}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 text-primary" />
                  Open Public Page
                </Link>
              ) : null}

              <Link
                href={`/admin/programs?institution=${institution.id}`}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
                })}
              >
                <GraduationCap className="w-3.5 h-3.5 mr-2 text-primary" />
                Manage Programs
              </Link>

              <Link
                href={`/admin/admissions-fees?institution=${institution.id}`}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
                })}
              >
                <Banknote className="w-3.5 h-3.5 mr-2 text-primary" />
                Manage Admissions & Fees
              </Link>
            </div>
          </AdminSection>
        </AdminDetailStickyRail>
      </div>

    </div>
  )
}
