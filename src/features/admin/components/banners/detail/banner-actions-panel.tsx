import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Button } from '@/components/ui/button'
import { Edit, Eye, Power } from 'lucide-react'
import Link from 'next/link'

export function BannerActionsPanel({ banner }: { banner: AdminBanner }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Button
          className="w-full justify-center text-xs font-semibold gap-1.5"
          render={
            <Link href={`/admin/banners/${banner.id}/edit`}>
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Banner Configuration</span>
            </Link>
          }
        />
        <Button
          variant="outline"
          className="w-full justify-center text-xs font-medium gap-1.5 text-muted-foreground"
          render={
            <Link href="/admin/banners">
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Banners Directory</span>
            </Link>
          }
        />
      </div>
    </div>
  )
}
