'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Home, BookOpen, BarChart3, Settings, LogOut, ChevronRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

interface SidebarClientProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SidebarClient({ activeTab, onTabChange }: SidebarClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Track breakpoint to close drawer when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setIsOpen(false) // close drawer when resizing to desktop
    }
    update(mq)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId)
    setIsOpen(false)
  }

  const sidebarContent = (
    <aside className="h-screen w-64 bg-gradient-to-b from-neural-900 to-neural-950 border-r border-neural-700 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8 pt-4 lg:pt-0 flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-pulse flex items-center justify-center shrink-0"
        >
          <span className="text-neural-950 font-bold text-sm">N</span>
        </motion.div>
        <div>
          <h1 className="font-bold text-neural-50 leading-tight">Neural</h1>
          <p className="text-xs text-neural-400">Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.1, type: 'spring', stiffness: 120, damping: 20 }}
              onClick={() => handleTabChange(item.id)}
              className="sidebar-nav-item w-full text-left relative group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-background"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-glow/20 to-transparent rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-cyan-glow' : 'text-neural-400'} />
                <span className={isActive ? 'text-cyan-glow' : 'text-neural-300'}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div className="ml-auto" initial={{ x: -8 }} animate={{ x: 0 }}>
                    <ChevronRight size={16} className="text-cyan-glow" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </nav>

      <div className="h-px bg-gradient-to-r from-neural-700/0 via-neural-600 to-neural-700/0 my-4" />

      <motion.button
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="sidebar-nav-item w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300"
        onClick={() => setIsOpen(false)}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </motion.button>
    </aside>
  )

  return (
    <>
      {/* Hamburger — mobile only, hidden when sidebar is open */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-40 lg:hidden p-2 rounded-lg bg-neural-800 border border-neural-700 text-neural-50 hover:bg-neural-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </motion.button>
      )}

      {/* ── Desktop: always-visible static sidebar ── */}
      <div className="hidden lg:block h-screen sticky top-0">
        {sidebarContent}
      </div>

      {/* ── Mobile: AnimatePresence drawer + backdrop ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 28 } }}
              exit={{ x: -280, opacity: 0, transition: { duration: 0.2 } }}
              className="fixed left-0 top-0 z-40 lg:hidden"
            >
              {/* Close button inside drawer */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-[-44px] p-2 rounded-lg bg-neural-800 border border-neural-700 text-neural-50 hover:bg-neural-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}