'use client'

import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

interface DynamicIconProps {
  name: string
  className?: string
  size?: number
}

// List of all available icon names
type LucideIconName = keyof typeof LucideIcons

// Helper function to get icon component
function getIconComponent(iconName: string): ComponentType<LucideProps> | null {
  // Convert to PascalCase
  const pascalCaseName = iconName
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as LucideIconName
  
  // Check if the icon exists in LucideIcons
  if (pascalCaseName in LucideIcons) {
    return LucideIcons[pascalCaseName] as ComponentType<LucideProps>
  }
  
  return null
}

export function DynamicIcon({ name, className = '', size = 24 }: DynamicIconProps) {
  const IconComponent = getIconComponent(name) || LucideIcons.BookOpen
  
  return <IconComponent size={size} className={className} />
}