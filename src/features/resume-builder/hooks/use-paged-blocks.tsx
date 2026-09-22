'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

export type PaginationBlock = { id: string; node: ReactNode }

type PagedBlocksOptions = {
  /** Fixed content width the blocks are measured at — must match the width they'll actually render at. */
  width: number
  /** Usable vertical space per page (page height minus top/bottom padding). */
  usableHeight: number
  /** Vertical gap rendered between consecutive blocks, so measurement matches the real stacked layout. */
  gap: number
}

/**
 * Deterministic, measurement-based pagination: renders every block off-screen
 * at the real content width, measures each one's actual height, then greedily
 * packs them onto pages so a page never exceeds `usableHeight`. A block is
 * never split — if a single block doesn't fit within the current page and
 * the page isn't empty, it moves whole to the next page. This is why a
 * section heading is combined into the same block as its first entry (see
 * `buildBlocksFromSections`) — it's how "never split a heading from its
 * first item" is enforced structurally rather than with an `if length > N`
 * business rule.
 */
export function usePagedBlocks(blocks: PaginationBlock[], { width, usableHeight, gap }: PagedBlocksOptions) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<PaginationBlock[][]>(() => (blocks.length > 0 ? [blocks] : [[]]))

  useLayoutEffect(() => {
    const container = measureRef.current
    if (!container) return

    const measure = () => {
      const children = Array.from(container.children) as HTMLElement[]
      const result: PaginationBlock[][] = []
      let current: PaginationBlock[] = []
      let currentHeight = 0

      blocks.forEach((block, index) => {
        const height = children[index]?.getBoundingClientRect().height ?? 0
        const addition = current.length > 0 ? height + gap : height
        if (current.length > 0 && currentHeight + addition > usableHeight) {
          result.push(current)
          current = [block]
          currentHeight = height
        } else {
          current.push(block)
          currentHeight += addition
        }
      })

      if (current.length > 0 || result.length === 0) result.push(current)
      setPages(result)
    }

    measure()
    // Fonts/images can change block heights after the first layout pass.
    const raf = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(raf)
  }, [blocks, width, usableHeight, gap])

  const measureNode = (
    <div style={{ position: 'fixed', top: 0, left: -99999, width, visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      <div ref={measureRef} style={{ display: 'flex', flexDirection: 'column', gap }}>
        {blocks.map((block) => (
          <div key={block.id}>{block.node}</div>
        ))}
      </div>
    </div>
  )

  return { pages, measureNode }
}
