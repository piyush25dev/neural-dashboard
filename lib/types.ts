export interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
  description?: string
  color?: string
}

export interface UserProgress {
  id?: string
  daily_streak: number
  total_hours: number
  last_active?: string
  name?: string
}

export interface DashboardData {
  courses: Course[]
  userProgress: UserProgress
}

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
}
