import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COACHING_PROVIDER_TYPES } from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'

export function CoachingIdentitySection({
  formData,
  errors,
  updateField,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  updateField: <K extends keyof CoachingFormData>(field: K, value: CoachingFormData[K]) => void
}) {
  return (
    <div id="section-identity" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Identity & Provider Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="coaching-name" className="text-xs font-semibold">
            Provider / Institute Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="coaching-name"
            value={formData.name}
            onChange={(e) => {
              updateField('name', e.target.value)
              if (!formData.slug) {
                updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
              }
            }}
            placeholder="e.g. Apex JEE Academy"
            className="text-xs h-9"
          />
          {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="coaching-slug" className="text-xs font-semibold">
            URL Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id="coaching-slug"
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            placeholder="e.g. apex-jee-academy-kota"
            className="text-xs h-9 font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">
            Provider Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.providerType}
            onValueChange={(val) => updateField('providerType', (val || 'Coaching Institute') as any)}
          >
            <SelectTrigger className="h-9 text-xs bg-card">
              <SelectValue placeholder="Select provider type">
                {formData.providerType || 'Select provider type'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COACHING_PROVIDER_TYPES.map((type: string) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="coaching-location" className="text-xs font-semibold">
            City / Location <span className="text-destructive">*</span>
          </Label>
          <Input
            id="coaching-location"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g. Kota or Online"
            className="text-xs h-9"
          />
          {errors.location && <p className="text-[11px] text-destructive">{errors.location}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="coaching-state" className="text-xs font-semibold">
            State (Optional for physical institutes)
          </Label>
          <Input
            id="coaching-state"
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value)}
            placeholder="e.g. Rajasthan"
            className="text-xs h-9"
          />
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
            <span className="font-medium text-foreground">Featured Provider</span>
          </label>
        </div>
      </div>
    </div>
  )
}
