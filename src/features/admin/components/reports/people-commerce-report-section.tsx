import { PlatformReportsData } from '../../data/admin-reports'
import { UserCheck, BookMarked, Inbox, CreditCard } from 'lucide-react'

export function PeopleCommerceReportSection({ data }: { data: PlatformReportsData['peopleAndCommerce'] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Users, Study Material & Integrations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Student Accounts</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              Demo Account
            </span>
          </div>

          <div className="space-y-3">
            <div className="text-2xl font-bold font-heading text-foreground">{data.studentsCount}</div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profile Completion:</span>
                <span className="font-semibold text-foreground">{data.studentsAverageCompletion}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${data.studentsAverageCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-foreground">Study Material (Notes)</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">
              Notes Store
            </span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-muted/40 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{data.notesCount}</div>
                <div className="text-[10px] text-muted-foreground">Notes</div>
              </div>
              <div className="p-2.5 bg-muted/40 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{data.purchasesCount}</div>
                <div className="text-[10px] text-muted-foreground">Purchases</div>
              </div>
              <div className="p-2.5 bg-muted/40 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{data.entitlementsCount}</div>
                <div className="text-[10px] text-muted-foreground">Entitlements</div>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                Payment Provider: Not connected
              </div>
            </div>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-foreground">Inbound & Reviews</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-full">
              Integrations
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Lead Capture Pipeline</span>
                <span className="text-[11px] font-medium text-amber-600">Not connected</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                CRM and enquiry capture persistence not connected.
              </p>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">External Reviews Sync</span>
                <span className="text-[11px] font-medium text-amber-600">Not connected</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Google reviews synchronization not connected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
