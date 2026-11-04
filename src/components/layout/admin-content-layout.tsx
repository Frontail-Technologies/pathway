import { Suspense } from 'react'
import { AdminAuthGuard } from '@/features/admin/auth/admin-auth-guard'
import { AdminTopbar } from './admin-topbar'
import { AdminSidebar } from './admin-sidebar'

export function AdminContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
    <AdminAuthGuard>
    <div data-theme="admin" className="flex min-h-dvh bg-admin-canvas text-foreground font-body">
      <div className="hidden lg:block w-60 shrink-0 bg-admin-sidebar border-r border-admin-sidebar-border sticky top-0 h-dvh overflow-hidden z-20">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 min-h-dvh">
        <AdminTopbar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
    </AdminAuthGuard>
    </Suspense>
  )
}
