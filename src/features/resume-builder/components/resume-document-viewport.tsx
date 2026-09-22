'use client'

import { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent, type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ChevronLeft, ChevronRight, Minus, Plus, Scan } from 'lucide-react'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../data/page-size'
import type { ResumeDocument } from './resume-template-renderer'

const MIN_SCALE = 0.45
const MAX_SCALE = 2.5
const CANVAS_PADDING = 36
// The library applies `step` as an exponent (scale * e^step), so its defaults jump ~65% per click — keep steps small (~12%).
const ZOOM_BUTTON_STEP = 0.12

// Contain-fit, then re-center: fitToView alone can leave a width-limited page top-aligned.
async function applyFit(ref: ReactZoomPanPinchRef, animationTime: number) {
  await ref.fitToView({ mode: 'contain', minScale: MIN_SCALE, maxScale: MAX_SCALE, animationTime })
  await ref.centerView(ref.instance.state.scale, 0)
}

/**
 * Centralizes all `react-zoom-pan-pinch` usage in one place — a PDF/Figma-
 * style document viewer (cursor-anchored wheel zoom, drag-to-pan once
 * zoomed, a small floating zoom toolbar with a real percentage readout
 * instead of fixed Fit/75%/100% preset buttons) plus, only when the resume
 * has more than one page, a floating bottom-center pager. Feature code
 * elsewhere never touches the zoom-pan-pinch API directly.
 *
 * Plain wheel = zoom (toward the cursor), matching common document-viewer
 * conventions. There's no continuous multi-page scroll to protect here —
 * only one page is shown at a time and page navigation is the explicit
 * pager below — so wheel-to-zoom doesn't fight anything a user would
 * otherwise use scroll for.
 */
export function ResumeDocumentViewport({ document, resetKey }: { document: ResumeDocument; resetKey: string }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<ReactZoomPanPinchRef>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [scalePercent, setScalePercent] = useState(100)
  const [isPanning, setIsPanning] = useState(false)
  const [isAtFit, setIsAtFit] = useState(true)

  const pageCount = Math.max(document.pageCount, 1)
  const clampedPageIndex = Math.min(pageIndex, pageCount - 1)

  const fit = () => {
    setIsAtFit(true)
    const ref = zoomRef.current
    if (ref) void applyFit(ref, 150)
  }

  // Template change (via `resetKey`) resets to page 1.
  useEffect(() => {
    setPageIndex(0)
  }, [resetKey])

  // Template change and page change warrant a fresh fit. The very first fit
  // (initial load) is instead handled by `onInit` below — at the moment this
  // effect first runs, react-zoom-pan-pinch may not have finished measuring
  // its wrapper/content yet, so calling `fitToView` here on mount can compute
  // against a stale/zero size; `onInit` fires only once the library's own
  // measurements are actually ready.
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    fit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, clampedPageIndex])

  // Preview panel resize re-fits only while the user hasn't manually zoomed since the last fit.
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      if (isAtFit) fit()
    })
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtFit])

  const goToPage = (next: number) => {
    setPageIndex(Math.min(Math.max(next, 0), pageCount - 1))
  }

  const cursor = isPanning ? 'grabbing' : isAtFit ? 'zoom-in' : 'grab'

  return (
    <div ref={outerRef} className="relative h-full min-h-0 overflow-hidden bg-muted/60">
      <TransformWrapper
        ref={zoomRef}
        minScale={MIN_SCALE}
        maxScale={MAX_SCALE}
        initialScale={1}
        centerOnInit
        wheel={{ step: 0.002 }}
        pinch={{ step: 3 }}
        doubleClick={{ mode: 'toggle', step: 0.35 }}
        onZoomStart={() => setIsAtFit(false)}
        onPanningStart={() => {
          setIsAtFit(false)
          setIsPanning(true)
        }}
        onPanningStop={() => setIsPanning(false)}
        onTransform={(_ref, state) => setScalePercent(Math.round(state.scale * 100))}
        onInit={(ref) => void applyFit(ref, 0)}
      >
        {/* Content is the page's true size (plus padding) — not 100% of the wrapper — so fitToView's contain-fit has a real size to fit. */}
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%', cursor }} contentStyle={{ padding: CANVAS_PADDING }}>
          <div
            className="relative overflow-hidden bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08),0_16px_36px_rgba(15,23,42,0.14)]"
            style={{ width: RESUME_PAGE_WIDTH, height: RESUME_PAGE_HEIGHT }}
          >
            {document.pages[clampedPageIndex]}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div className="absolute right-4 bottom-4 flex items-center gap-0.5 rounded-full border bg-card/95 p-1 shadow-md backdrop-blur-sm">
        <button type="button" aria-label="Zoom out" onClick={() => zoomRef.current?.zoomOut(ZOOM_BUTTON_STEP, 120)} className="flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
          <Minus className="size-3.5" aria-hidden="true" />
        </button>
        <span className="w-10 text-center text-xs font-medium tabular-nums text-foreground" aria-live="polite">
          {scalePercent}%
        </span>
        <button type="button" aria-label="Reset zoom to fit" onClick={fit} className="flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
          <Scan className="size-3.5" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Zoom in" onClick={() => zoomRef.current?.zoomIn(ZOOM_BUTTON_STEP, 120)} className="flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
          <Plus className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      {pageCount > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-card/95 py-1 pr-1 pl-2 shadow-md backdrop-blur-sm">
          <button
            type="button"
            aria-label="Previous page"
            disabled={clampedPageIndex === 0}
            onClick={() => goToPage(clampedPageIndex - 1)}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="px-1 text-xs font-medium tabular-nums text-foreground" aria-live="polite">
            Page {clampedPageIndex + 1} of {pageCount}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={clampedPageIndex === pageCount - 1}
            onClick={() => goToPage(clampedPageIndex + 1)}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {document.measureNode}
    </div>
  )
}
