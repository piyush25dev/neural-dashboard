'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { DashboardContent } from '@/components/DashboardContent'
import { CoursesView } from '@/components/views/CoursesView'
import { ProgressView } from '@/components/views/ProgressView'
import { SettingsView } from '@/components/views/SettingsView'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex h-screen bg-neural-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'courses' && <CoursesView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}