import { AdminHeader } from './admin-header'
import { AdminSidebar } from './admin-sidebar'

export function AdminContentLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-muted"><AdminHeader /><div className="container-shell flex gap-8 py-8"><AdminSidebar /><main className="min-w-0 flex-1">{children}</main></div></div> }
