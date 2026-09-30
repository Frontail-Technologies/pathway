import { getAdminKPIs } from '../data/admin-stats'
import { AdminStatCard } from './admin-stat-card'
import { AdminSection } from './admin-section'
import { AdminPageHeader } from './admin-page-header'
import { AdminEnquiriesChart } from './admin-enquiries-chart'
import { AdminLeadPipeline } from './admin-lead-pipeline'
import { AdminCatalogOverview } from './admin-catalog-overview'
import { AdminContentCompleteness } from './admin-content-completeness'
import { AdminNeedsAttention } from './admin-needs-attention'
import { AdminQuickActions } from './admin-quick-actions'
import { AdminRecentActivity } from './admin-recent-activity'
export function AdminDashboardView() {
  const kpis = getAdminKPIs()

  return (
    <div className="space-y-6">
      { }
      <AdminPageHeader />

      { }
      <section aria-label="Platform Summary KPIs">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {kpis.map((kpi) => (
            <AdminStatCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      { }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <AdminSection title="Enquiries Over Time">
            <AdminEnquiriesChart />
          </AdminSection>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <AdminSection title="Lead Pipeline">
            <AdminLeadPipeline />
          </AdminSection>
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <AdminSection title="Catalog Overview">
            <AdminCatalogOverview />
          </AdminSection>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <AdminSection title="Content Completeness">
            <AdminContentCompleteness />
          </AdminSection>
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <AdminSection title="Needs Attention">
            <AdminNeedsAttention />
          </AdminSection>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <AdminSection
            title="Quick Actions"
            padding="compact"
            fill={false}
          >
            <AdminQuickActions />
          </AdminSection>

          <AdminSection title="Recent Activity" className="flex-1" fill={false}>
            <AdminRecentActivity />
          </AdminSection>
        </div>
      </div>
    </div>
  )
}
