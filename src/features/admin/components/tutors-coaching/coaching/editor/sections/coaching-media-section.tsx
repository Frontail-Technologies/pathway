import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
  const [imagePath, setImagePath] = useState('')

  const handleAddImage = () => {
    if (!imagePath.trim()) return
    addGalleryImage(imagePath.trim())
    setImagePath('')
  }

  return (
    <div id="section-media" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Media & Visual Assets</h2>

      <div className="space-y-4 text-xs">
        <p className="text-muted-foreground">
          Category-appropriate visual assets and campus photographs for public coaching profile.
        </p>

        <div className="flex gap-2">
          <Input
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="e.g. /coaching/apex-jee-academy.jpg"
            className="text-xs h-8 font-mono"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddImage()
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddImage}
            className="h-8 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Image
          </Button>
        </div>

        {formData.gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {formData.gallery.map((imgSrc, idx) => (
              <div key={idx} className="group relative rounded-lg overflow-hidden border border-border bg-muted">
                <div className="aspect-4/3 relative">
                  { }
                  <img
                    src={imgSrc}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-1.5 flex items-center justify-between bg-card text-[10px] font-mono text-muted-foreground">
                  <span className="truncate max-w-[100px]">{imgSrc}</span>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    aria-label={`Remove gallery image ${idx + 1}`}
                    className="text-muted-foreground hover:text-destructive transition-colors p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
