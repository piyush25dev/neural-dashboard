'use client'

import { motion } from 'framer-motion'
import { Settings, Moon, Bell, Lock } from 'lucide-react'

export function SettingsView() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-neural-50 mb-2 flex items-center gap-2">
            <Settings className="text-accent-cool" size={32} />
            Settings
          </h2>
          <p className="text-neural-400 mb-8">
            Customize your dashboard experience
          </p>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bento-card p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Moon className="text-cyan-glow" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-neural-50">Dark Mode</h3>
                  <p className="text-neural-400 text-sm">Always enabled</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-cyan-glow rounded-full relative">
                <motion.div className="absolute top-1 left-1 w-4 h-4 bg-neural-950 rounded-full" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bento-card p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Bell className="text-accent-warm" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-neural-50">Notifications</h3>
                  <p className="text-neural-400 text-sm">Get course updates</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-neural-700 rounded-full relative">
                <motion.div className="absolute top-1 left-1 w-4 h-4 bg-neural-400 rounded-full" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bento-card p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Lock className="text-pulse" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-neural-50">Privacy</h3>
                  <p className="text-neural-400 text-sm">Keep profile private</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-cyan-glow rounded-full relative">
                <motion.div className="absolute top-1 right-1 w-4 h-4 bg-neural-950 rounded-full" />
              </div>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Log Out
          </motion.button>
        </motion.div>
      </div>
    </main>
  )
}