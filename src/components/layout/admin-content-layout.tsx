import { AdminTopbar } from './admin-topbar'
import { AdminSidebar } from './admin-sidebar'

export function AdminContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="admin" className="flex min-h-dvh bg-admin-canvas text-foreground font-body">
      <div className="hidden lg:block w-64 shrink-0 bg-admin-sidebar border-r border-admin-sidebar-border sticky top-0 h-dvh overflow-hidden z-20">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 min-h-dvh">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="w-full max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
