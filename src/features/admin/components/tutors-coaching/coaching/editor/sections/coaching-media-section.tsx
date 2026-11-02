import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EditorSection, Field, RemoveButton } from '../../../shared/editor-kit'
import type { CoachingFormData } from '../use-coaching-editor'

export function CoachingMediaSection({
  formData,
  addGalleryImage,
  removeGalleryImage,
}: {
  formData: CoachingFormData
  addGalleryImage: (path: string) => void
  removeGalleryImage: (index: number) => void
}) {
  const [path, setPath] = useState('')
  const add = () => {
    if (!path.trim()) return
    addGalleryImage(path.trim())
    setPath('')
  }

  return (
    <EditorSection id="media" title="Photos" description="Photos of the centre or classes for the public profile.">
      <Field label="Add photo" htmlFor="coaching-photo" hint="Path to an uploaded image.">
        <div className="flex gap-2">
          <Input
            id="coaching-photo"
            value={path}
            onChange={(event) => setPath(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                add()
              }
            }}
            placeholder="e.g. /coaching/apex-jee-academy.jpg"
            className="h-9 font-mono text-sm"
          />
          <Button type="button" variant="outline" size="sm" onClick={add} className="h-9 gap-1.5">
            <Plus className="size-4" aria-hidden="true" />
            Add
          </Button>
        </div>
      </Field>

      {formData.gallery.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {formData.gallery.map((src, index) => (
            <div key={`${src}-${index}`} className="overflow-hidden rounded-md border border-border">
              <div className="aspect-4/3 bg-muted">
                <img src={src} alt={`Photo ${index + 1}`} className="size-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 bg-card py-1 pr-1 pl-2">
                <span className="truncate font-mono text-xs text-muted-foreground">{src}</span>
                <RemoveButton label={`Remove photo ${index + 1}`} onClick={() => removeGalleryImage(index)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </EditorSection>
  )
}
