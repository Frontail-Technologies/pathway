'use client'

import { Link2, Bot, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card id="canonical" className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Canonical Path & Robots Directives</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Canonical Path</Label>
          <Input
            placeholder={baselineCanonical || '/college/iit-delhi'}
            value={canonicalPath}
            onChange={(e) => onCanonicalPathChange(e.target.value)}
            className="h-9 text-xs bg-background font-mono"
          />
          {error ? (
            <p className="text-[11px] text-destructive">{error}</p>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-muted-foreground">
              <span>Must be an internal relative path starting with / (e.g. <code className="font-mono text-[10px]">/college/iit-delhi</code>).</span>
              {!isCustomCanonical && (
                <span className="text-slate-500 italic">
                  Using generated canonical path: <code className="font-mono text-[10px]">{baselineCanonical || '/'}</code>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
                <Bot className="w-3.5 h-3.5 text-blue-600" />
                Override robots directives
              </Label>
              <p className="text-[11px] text-muted-foreground">
                {overrideRobots
                  ? 'Custom robots directive rules enabled for this target.'
                  : 'Using existing page directives (inherits standard indexing behavior).'}
              </p>
            </div>
            <Switch
              checked={overrideRobots}
              onCheckedChange={onOverrideRobotsChange}
            />
          </div>

          {!overrideRobots ? (
            <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
              <span className="font-medium text-slate-700 dark:text-slate-300">Using existing page directives:</span> Search engines will follow the platform default indexing and link following rules for this page.
            </div>
          ) : (
            <div className="pt-3 border-t border-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    Allow Search Engine Indexing (index)
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Permit search engines like Google to index this page in search results.
                  </p>
                </div>
                <Switch
                  checked={robotsIndex}
                  onCheckedChange={onRobotsIndexChange}
                />
              </div>

              {robotsIndex === false && (
                <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Warning:</strong> This page will carry an explicit <code className="font-mono text-[10px] bg-rose-100 px-1 py-0.5 rounded">noindex</code> directive override, instructing search engines to exclude this URL from search results.
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                    Allow Following Links (follow)
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Allow search engines to crawl and follow outbound links on this page.
                  </p>
                </div>
                <Switch
                  checked={robotsFollow}
                  onCheckedChange={onRobotsFollowChange}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

