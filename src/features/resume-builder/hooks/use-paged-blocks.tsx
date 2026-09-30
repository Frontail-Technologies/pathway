'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

export type PaginationBlock = { id: string; node: ReactNode }

type PagedBlocksOptions = {
   
  width: number
   
  usableHeight: number
   
  gap: number
}











 
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
