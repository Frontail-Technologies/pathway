import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { Building2, BookOpen, ExternalLink } from 'lucide-react'

export function AdmissionsFeesOverviewSection({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <AdminSection title="Offering Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1 p-3 rounded-lg bg-muted/30">
          <span className="text-[11px] font-semibold text-muted-foreground block">
            Institution
          </span>
          <Link
            href={`/admin/institutions/${offering.institutionId}`}
            className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 truncate"
          >
            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{offering.institutionName}</span>
          </Link>
          <span className="text-[10px] text-muted-foreground block">
            {offering.institutionType} • {offering.institutionCity}
          </span>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-muted/30">
          <span className="text-[11px] font-semibold text-muted-foreground block">
            Canonical Program
          </span>
          <Link
            href={`/admin/programs/${offering.programId}`}
            className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 truncate"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{offering.programName}</span>
          </Link>
          <span className="text-[10px] text-muted-foreground block">
            {offering.degree} • {offering.duration}
          </span>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-muted/30">
          <span className="text-[11px] font-semibold text-muted-foreground block">
            Annual Tuition Fee
          </span>
          <span className="text-sm font-bold text-foreground block">
            {offering.annualFee || 'Pending Schedule'}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            Total: {offering.totalProgrammeFee || 'N/A'}
          </span>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-muted/30">
          <span className="text-[11px] font-semibold text-muted-foreground block">
            Admission Mode
          </span>
          <span className="font-bold text-foreground block truncate">
            {offering.admissionMode}
          </span>
          <span className="text-[10px] text-muted-foreground block truncate">
            Session: {offering.academicSession}
          </span>
        </div>
      </div>
    </AdminSection>
  )
}
