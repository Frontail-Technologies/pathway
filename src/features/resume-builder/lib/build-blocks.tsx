import type { ReactNode } from 'react'
import type { PaginationBlock } from '../hooks/use-paged-blocks'

export type ResumeSection = { id: string; heading: ReactNode; items: ReactNode[] }

/**
 * Converts a template's ordered sections into flat atomic pagination blocks:
 * a section's heading is always combined with its first item into one block
 * (so a heading can never land alone at the bottom of a page), and every
 * subsequent item becomes its own block.
 */
export function buildBlocksFromSections(sections: ResumeSection[]): PaginationBlock[] {
  const blocks: PaginationBlock[] = []
  sections.forEach((section) => {
    if (section.items.length === 0) return
    blocks.push({
      id: `${section.id}-0`,
      node: (
        <div key={`${section.id}-0`} className="flex flex-col gap-2">
          {section.heading}
          {section.items[0]}
        </div>
      ),
    })
    section.items.slice(1).forEach((item, index) => {
      blocks.push({ id: `${section.id}-${index + 1}`, node: item })
    })
  })
  return blocks
}
