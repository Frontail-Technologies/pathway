import type { ReactNode } from 'react'







 
export function DetailStickySidebar({ children }: { children: ReactNode }) {
  return <div className="hidden shrink-0 lg:sticky lg:top-44 lg:z-10 lg:block lg:w-75">{children}</div>
}
