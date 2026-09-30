import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CoachingEditorHeader({
  isEditing,
  providerName,
  providerId,
  saveStatus,
  onSave,
}: {
  isEditing: boolean
  providerName: string
  providerId: string
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  onSave: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/admin/tutors-coaching"
          className="hover:text-foreground transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tutors & Coaching
        </Link>
        <span>/</span>
        {isEditing ? (
          <>
            <Link
              href={`/admin/tutors-coaching/coaching/${providerId}`}
              className="hover:text-foreground transition-colors truncate"
            >
              {providerName || 'Coaching Details'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Edit</span>
          </>
        ) : (
          <span className="text-foreground font-semibold">Create Provider</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-5 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {isEditing ? `Edit Provider: ${providerName}` : 'Create Coaching Provider'}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs"
            render={
              <Link
                href={
                  isEditing
                    ? `/admin/tutors-coaching/coaching/${providerId}`
                    : '/admin/tutors-coaching'
                }
              />
            }
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={saveStatus === 'saving'}
            className="h-9 gap-1.5 text-xs"
          >
            {saveStatus === 'saving' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isEditing ? 'Save Changes' : 'Create Provider'}
          </Button>
        </div>
      </div>
    </div>
  )
}
