import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { EditorSection, Field } from '../../../shared/editor-kit'
import type { TutorFormData } from '../use-tutor-editor'

const HAIR_STYLES = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long' },
  { value: 'bun', label: 'Bun' },
]
const GLASSES = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Yes' },
]

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
    <EditorSection id="portrait" title="Portrait" description="Use a real photo where possible. Without one, the illustrated avatar is shown.">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <TutorPortrait tutor={{ name: formData.name || 'Tutor preview', portrait: formData.portrait, avatar: formData.avatar }} className="size-20 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-5">
          <Field label="Photo file" htmlFor="tutor-portrait-path" hint="Path to an uploaded image. Leave empty to use the avatar.">
            <Input id="tutor-portrait-path" value={formData.portrait} onChange={(event) => updateField('portrait', event.target.value)} placeholder="e.g. /tutors/arjun-sharma.jpg" className="h-9 font-mono text-sm" />
          </Field>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="Hair style">
              <Select value={formData.avatar.style} onValueChange={(value) => updateAvatarField('style', (value || 'short') as TutorFormData['avatar']['style'])} items={HAIR_STYLES}>
                <SelectTrigger aria-label="Hair style" className="h-9 w-full bg-card text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HAIR_STYLES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Glasses">
              <Select value={formData.avatar.glasses ? 'true' : 'false'} onValueChange={(value) => updateAvatarField('glasses', value === 'true')} items={GLASSES}>
                <SelectTrigger aria-label="Glasses" className="h-9 w-full bg-card text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GLASSES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Shirt colour" htmlFor="tutor-avatar-shirt">
              <Input id="tutor-avatar-shirt" value={formData.avatar.shirt} onChange={(event) => updateAvatarField('shirt', event.target.value)} className="h-9 font-mono text-sm" />
            </Field>

            <Field label="Skin tone" htmlFor="tutor-avatar-skin">
              <Input id="tutor-avatar-skin" value={formData.avatar.skin} onChange={(event) => updateAvatarField('skin', event.target.value)} className="h-9 font-mono text-sm" />
            </Field>
          </div>
        </div>
      </div>
    </EditorSection>
  )
}
