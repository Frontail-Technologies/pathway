import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export type ProgramEditorMobileActionsProps = {
  onCancel: () => void
  onSave: (e: React.FormEvent) => void
}

export function ProgramEditorMobileActions({
  onCancel,
  onSave,
}: ProgramEditorMobileActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 sm:hidden bg-card/95 backdrop-blur-md border-t border-border p-3 flex items-center justify-end gap-2 shadow-lg">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCancel}
        className="text-xs font-semibold"
      >
        Cancel
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={onSave}
        className="text-xs font-semibold gap-1.5 shadow-xs"
      >
        <Check className="w-3.5 h-3.5" />
        Save Program
      </Button>
    </div>
  )
}
