'use client'

import { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent, type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ChevronLeft, ChevronRight, Minus, Plus, Scan } from 'lucide-react'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../data/page-size'
import type { ResumeDocument } from './resume-template-renderer'

const MIN_SCALE = 0.45
const MAX_SCALE = 2.5
const CANVAS_PADDING = 36

const ZOOM_BUTTON_STEP = 0.12


async function applyFit(ref: ReactZoomPanPinchRef, animationTime: number) {
  await ref.fitToView({ mode: 'contain', minScale: MIN_SCALE, maxScale: MAX_SCALE, animationTime })
  await ref.centerView(ref.instance.state.scale, 0)
}














 
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

  
  useEffect(() => {
    setPageIndex(0)
  }, [resetKey])

  
  
  
  
  
  
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    fit()
    
  }, [resetKey, clampedPageIndex])

  
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      if (isAtFit) fit()
    })
    observer.observe(el)
    return () => observer.disconnect()
    
  }, [isAtFit])

  const goToPage = (next: number) => {
    setPageIndex(Math.min(Math.max(next, 0), pageCount - 1))
  }

  const cursor = isPanning ? 'grabbing' : isAtFit ? 'zoom-in' : 'grab'

  return (
    
    
    
    <div className="flex h-full min-h-0 flex-col bg-muted/60">
      <div ref={outerRef} className="relative min-h-0 flex-1 overflow-hidden">
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
          { }
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%', cursor }} contentStyle={{ padding: CANVAS_PADDING }}>
            <div
              className="relative overflow-hidden bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08),0_16px_36px_rgba(15,23,42,0.14)]"
              style={{ width: RESUME_PAGE_WIDTH, height: RESUME_PAGE_HEIGHT }}
            >
              {document.pages[clampedPageIndex]}
            </div>
          </TransformComponent>
        </TransformWrapper>

        {document.measureNode}
      </div>

      { }
      <div className="flex shrink-0 items-center justify-center gap-3 border-t bg-card px-3 py-2">
        <div className="flex items-center gap-0.5 rounded-full border bg-background p-1">
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
          <div className="flex items-center gap-1 rounded-full border bg-background py-1 pr-1 pl-2">
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
      </div>
    </div>
  )
}
