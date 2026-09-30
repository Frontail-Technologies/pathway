import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorIdentitySection({
  formData,
  errors,
  updateField,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  updateField: <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => void
}) {
  return (
    <div id="section-identity" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4 scroll-mt-24">
      <h2 className="text-sm font-bold text-foreground">Identity & Core Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <Label htmlFor="tutor-name" className="text-xs font-semibold">
            Tutor Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tutor-name"
            value={formData.name}
            onChange={(e) => {
              updateField('name', e.target.value)
              if (!formData.slug) {
                updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
              }
            }}
            placeholder="e.g. Arjun Sharma"
            className="text-xs h-9"
          />
          {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tutor-slug" className="text-xs font-semibold">
            URL Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tutor-slug"
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            placeholder="e.g. arjun-sharma"
            className="text-xs h-9 font-mono"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="tutor-headline" className="text-xs font-semibold">
            Professional Headline <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tutor-headline"
            value={formData.headline}
            onChange={(e) => updateField('headline', e.target.value)}
            placeholder="e.g. Physics tutor for JEE & NEET"
            className="text-xs h-9"
          />
          {errors.headline && <p className="text-[11px] text-destructive">{errors.headline}</p>}
        </div>

        <div className="flex items-center gap-6 sm:col-span-2 pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.hasDetailPage}
              onChange={(e) => updateField('hasDetailPage', e.target.checked)}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="font-medium text-foreground">Has Dedicated Public Detail Page</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="font-medium text-foreground">Featured Educator</span>
          </label>
        </div>
      </div>
    </div>
  )
}
