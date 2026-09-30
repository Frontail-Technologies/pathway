import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CoachingEditorMobileActions({
  saveStatus,
  onSave,
  isEditing,
}: {
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  onSave: () => void
  isEditing: boolean
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-card border-t border-border z-20 shadow-lg flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground truncate">
        {saveStatus === 'saved' ? 'Ready to sync' : 'Unsaved changes'}
      </span>
      <Button
        size="sm"
        onClick={onSave}
        disabled={saveStatus === 'saving'}
        className="h-9 gap-1.5 text-xs shrink-0"
      >
        {saveStatus === 'saving' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Save className="w-3.5 h-3.5" />
        )}
        {isEditing ? 'Save Changes' : 'Create Provider'}
      </Button>
    </div>
  )
}
