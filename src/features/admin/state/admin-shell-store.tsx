'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type AdminMode = 'light' | 'dark'
export type AdminDensity = 'comfortable' | 'compact'

type AdminShellState = {
  collapsed: boolean
  mode: AdminMode
  density: AdminDensity
  menuOpen: boolean
  toggleCollapsed: () => void
  setMode: (mode: AdminMode) => void
  setDensity: (density: AdminDensity) => void
  setMenuOpen: (open: boolean) => void
}

const STORAGE_KEY = 'pathway.admin.shell.v1'

type Persisted = { collapsed?: boolean; mode?: AdminMode; density?: AdminDensity }

function readPersisted(): Persisted {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as Persisted
  } catch {
    return {}
  }
}

const AdminShellContext = createContext<AdminShellState | null>(null)

export function AdminShellProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mode, setModeState] = useState<AdminMode>('light')
  const [density, setDensityState] = useState<AdminDensity>('comfortable')
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = readPersisted()
    if (saved.collapsed !== undefined) setCollapsed(saved.collapsed)
    if (saved.mode) setModeState(saved.mode)
    if (saved.density) setDensityState(saved.density)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ collapsed, mode, density }))
    } catch {}
  }, [collapsed, mode, density, loaded])

  const toggleCollapsed = useCallback(() => setCollapsed((value) => !value), [])
  const setMode = useCallback((next: AdminMode) => setModeState(next), [])
  const setDensity = useCallback((next: AdminDensity) => setDensityState(next), [])

  const value = useMemo<AdminShellState>(() => ({ collapsed, mode, density, menuOpen, toggleCollapsed, setMode, setDensity, setMenuOpen }), [collapsed, mode, density, menuOpen, toggleCollapsed, setMode, setDensity])
  return <AdminShellContext.Provider value={value}>{children}</AdminShellContext.Provider>
}

export function useAdminShell() {
  const context = useContext(AdminShellContext)
  if (!context) throw new Error('useAdminShell must be used inside AdminShellProvider')
  return context
}
