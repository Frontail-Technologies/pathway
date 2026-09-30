import * as React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

export function ScholarshipEditorMobileActions({
  isEdit,
  onSubmit,
}: {
  isEdit: boolean
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 sm:hidden flex items-center justify-between gap-3 shadow-lg">
      <Link
        href="/admin/scholarships"
        className={buttonVariants({
          variant: 'outline',
          size: 'sm',
          className: 'flex-1 text-xs font-semibold',
        })}
      >
        <X className="w-3.5 h-3.5 mr-1" />
        Cancel
      </Link>
      <Button
        size="sm"
        onClick={onSubmit}
        className="flex-1 text-xs font-semibold gap-1.5 shadow-xs"
      >
        <Save className="w-3.5 h-3.5" />
        {isEdit ? 'Save Changes' : 'Create Scheme'}
      </Button>
    </div>
  )
}
