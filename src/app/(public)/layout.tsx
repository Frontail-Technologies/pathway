import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
export default function PublicLayout({ children }: { children: React.ReactNode }) { return <div className="flex min-h-screen flex-col pb-15 md:pb-0"><PublicHeader /><main className="flex-1 min-h-[70vh]">{children}</main><PublicFooter /></div> }
