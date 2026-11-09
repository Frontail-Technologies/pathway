'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface SeoCanonicalRobotsSectionProps {
  canonicalPath: string
  overrideRobots: boolean
  robotsIndex: boolean
  robotsFollow: boolean
  onCanonicalPathChange: (value: string) => void
  onOverrideRobotsChange: (value: boolean) => void
  onRobotsIndexChange: (value: boolean) => void
  onRobotsFollowChange: (value: boolean) => void
  baselineCanonical: string
  error?: string
}

export function SeoCanonicalRobotsSection({
  canonicalPath,
  overrideRobots,
  robotsIndex,
  robotsFollow,
  onCanonicalPathChange,
  onOverrideRobotsChange,
  onRobotsIndexChange,
  onRobotsFollowChange,
  baselineCanonical,
  error,
}: SeoCanonicalRobotsSectionProps) {
  const isCustomCanonical = canonicalPath.trim().length > 0

  return (
    <section id="canonical" className="scroll-mt-20 space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Canonical and indexing</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Canonical path</Label>
          <Input
            placeholder={baselineCanonical || '/college/iit-delhi'}
            value={canonicalPath}
            onChange={(e) => onCanonicalPathChange(e.target.value)}
            className="h-9 text-sm bg-background font-mono"
          />
          {error ? (
            <p className="text-[13px] text-destructive">{error}</p>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px] text-muted-foreground">
              <span>A path on this site starting with /, e.g. /college/iit-delhi.</span>
              {!isCustomCanonical && (
                <span>
                  Default: <code className="font-mono text-xs">{baselineCanonical || '/'}</code>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">
                Set indexing for this page
              </Label>
              <p className="text-[13px] text-muted-foreground">
                {overrideRobots
                  ? 'Custom indexing rules are on.'
                  : 'Uses the default: indexed, links followed.'}
              </p>
            </div>
            <Switch
              checked={overrideRobots}
              onCheckedChange={onOverrideRobotsChange}
            />
          </div>
          {overrideRobots ? (
            <div className="pt-3 border-t border-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium flex items-center gap-1.5">
                    Show in search results
                  </Label>
                  <p className="text-[13px] text-muted-foreground">
                    Lets search engines index this page.
                  </p>
                </div>
                <Switch
                  checked={robotsIndex}
                  onCheckedChange={onRobotsIndexChange}
                />
              </div>

              {robotsIndex === false && (
                <p className="flex items-start gap-2 rounded-md border border-border bg-card p-3 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" aria-hidden="true" />
                  This page will be marked noindex and won’t appear in search results.
                </p>
              )}

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium flex items-center gap-1.5">
                    Follow links on this page
                  </Label>
                  <p className="text-[13px] text-muted-foreground">
                    Lets search engines follow the links on this page.
                  </p>
                </div>
                <Switch
                  checked={robotsFollow}
                  onCheckedChange={onRobotsFollowChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
