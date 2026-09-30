import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { TutorFormData } from '../use-tutor-editor'

const HAIR_STYLE_LABELS: Record<string, string> = {
  short: 'Short',
  long: 'Long',
  bun: 'Bun',
}

export function TutorPortraitSection({
  formData,
  updateField,
  updateAvatarField,
}: {
  formData: TutorFormData
  updateField: <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => void
  updateAvatarField: <K extends keyof TutorFormData['avatar']>(field: K, value: TutorFormData['avatar'][K]) => void
}) {
  return (
    <div id="section-portrait" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Portrait & Visual Assets</h2>

      <div className="flex flex-col sm:flex-row items-start gap-5 p-4 rounded-lg bg-muted/30 border border-border/50">
        <TutorPortrait
          tutor={{
            name: formData.name || 'Tutor Preview',
            portrait: formData.portrait,
            avatar: formData.avatar,
          }}
          className="size-24 rounded-2xl shrink-0 shadow-xs"
        />

        <div className="space-y-4 text-xs flex-1">
          <div className="space-y-1.5">
            <Label htmlFor="tutor-portrait-path" className="text-xs font-semibold">
              Photographic Portrait Path (Optional)
            </Label>
            <Input
              id="tutor-portrait-path"
              value={formData.portrait}
              onChange={(e) => updateField('portrait', e.target.value)}
              placeholder="e.g. /tutors/arjun-sharma.jpg"
              className="text-xs h-9 font-mono"
            />
            <p className="text-[11px] text-muted-foreground">
              If left blank, the SVG illustrated avatar below will be used as a verified fallback.
            </p>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-3">
            <Label className="text-xs font-semibold block">Illustrated Avatar Configuration</Label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground block">Hair Style</span>
                <Select
                  value={formData.avatar.style}
                  onValueChange={(val) => updateAvatarField('style', (val || 'short') as 'short' | 'long' | 'bun')}
                >
                  <SelectTrigger className="h-8 text-xs bg-card">
                    <SelectValue placeholder="Select style">
                      {HAIR_STYLE_LABELS[formData.avatar.style] || 'Short'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                    <SelectItem value="bun">Bun</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground block">Glasses</span>
                <Select
                  value={formData.avatar.glasses ? 'true' : 'false'}
                  onValueChange={(val) => updateAvatarField('glasses', val === 'true')}
                >
                  <SelectTrigger className="h-8 text-xs bg-card">
                    <SelectValue placeholder="Select">
                      {formData.avatar.glasses ? 'Yes' : 'No'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground block">Shirt Color</span>
                <Input
                  value={formData.avatar.shirt}
                  onChange={(e) => updateAvatarField('shirt', e.target.value)}
                  className="h-8 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground block">Skin Tone</span>
                <Input
                  value={formData.avatar.skin}
                  onChange={(e) => updateAvatarField('skin', e.target.value)}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
