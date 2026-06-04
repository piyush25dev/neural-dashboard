import { SidebarClient } from './SidebarClient'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

// This is a Server Component wrapper
export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  // Pass all props to the client component
  return <SidebarClient activeTab={activeTab} onTabChange={onTabChange} />
}