import { Children, isValidElement, type ReactNode } from 'react'

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)

export function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return Children.toArray(node.props.children).map(nodeText).join('')
  return ''
}

export function articleHeadings(markdown: string) {
  return markdown
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, '').replace(/[*_`]/g, '').trim())
    .filter(Boolean)
    .map((text) => ({ id: headingId(text), text }))
}
