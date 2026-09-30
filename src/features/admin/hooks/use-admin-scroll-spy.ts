'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface UseAdminScrollSpyOptions {
  sectionIds: string[]
  offset?: number
}

export interface UseAdminScrollSpyReturn {
  activeSectionId: string
  scrollToSection: (id: string) => void
}











 
export function useAdminScrollSpy({
  sectionIds,
  offset = 120,
}: UseAdminScrollSpyOptions): UseAdminScrollSpyReturn {
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionIds[0] || '')
  const isProgrammaticScrollRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const findSectionElement = useCallback((id: string): HTMLElement | null => {
    return document.getElementById(`section-${id}`) || document.getElementById(id)
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      setActiveSectionId(id)
      isProgrammaticScrollRef.current = true

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 700)

      const element = findSectionElement(id)
      if (element) {
        const targetY = element.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth',
        })
      }
    },
    [findSectionElement, offset]
  )

  useEffect(() => {
    if (sectionIds.length === 0) return

    let rafId: number | null = null

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return

      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight
        const docHeight = document.documentElement.scrollHeight

        
        if (docHeight - scrollPosition < 40) {
          const lastId = sectionIds[sectionIds.length - 1]
          setActiveSectionId(lastId)
          return
        }

        
        if (window.scrollY < offset - 20) {
          setActiveSectionId(sectionIds[0])
          return
        }

        
        const activationLine = offset + 20
        let currentActive = sectionIds[0]

        for (const id of sectionIds) {
          const el = findSectionElement(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= activationLine) {
              currentActive = id
            }
          }
        }

        setActiveSectionId(currentActive)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [sectionIds, offset, findSectionElement])

  return {
    activeSectionId,
    scrollToSection,
  }
}
