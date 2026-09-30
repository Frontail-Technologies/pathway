import { Camera, Sparkles, ImageOff } from 'lucide-react'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { TutorPortraitBadge } from '../../shared/tutor-status-badge'

export function TutorPortraitMediaSection({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Portrait & Visual Assets</h2>
        <TutorPortraitBadge status={tutor.portraitStatus} />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 p-4 rounded-lg bg-muted/30 border border-border/50">
        <TutorPortrait tutor={tutor} className="size-24 rounded-2xl shrink-0 shadow-xs" />
        <div className="space-y-2 text-xs flex-1">
          <div className="flex items-center gap-2">
            {tutor.portraitStatus === 'real' ? (
              <span className="font-semibold text-success flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                Verified Photographic Headshot
              </span>
            ) : tutor.portraitStatus === 'illustration' ? (
              <span className="font-semibold text-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Generated SVG Illustration Avatar
              </span>
            ) : (
              <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <ImageOff className="w-4 h-4" />
                No Asset Configured
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {tutor.portraitStatus === 'real'
              ? `Asset path: ${tutor.portrait}. High-resolution photographic headshot approved for public profile.`
              : `This tutor profile currently uses an SVG illustrated avatar. Real photographic portraits are required for full public verification.`}
          </p>

          {tutor.avatar && (
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted-foreground">
              <div className="bg-card p-2 rounded border border-border">
                <span className="block font-medium text-foreground">Style:</span> {tutor.avatar.style}
              </div>
              <div className="bg-card p-2 rounded border border-border">
                <span className="block font-medium text-foreground">Hair:</span> {tutor.avatar.hair}
              </div>
              <div className="bg-card p-2 rounded border border-border">
                <span className="block font-medium text-foreground">Shirt:</span> {tutor.avatar.shirt}
              </div>
              <div className="bg-card p-2 rounded border border-border">
                <span className="block font-medium text-foreground">Glasses:</span>{' '}
                {tutor.avatar.glasses ? 'Yes' : 'No'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
