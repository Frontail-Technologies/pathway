'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function ResumePrint({ pages }: { pages: ReactNode[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(
    <div id="resume-print" aria-hidden="true">
      {pages.map((page, index) => (
        <div key={index} className="resume-print-page">
          {page}
        </div>
      ))}
    </div>,
    document.body,
  )
}

export const printResume = () => window.print()
