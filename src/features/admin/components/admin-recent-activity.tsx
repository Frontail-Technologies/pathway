import { Clock } from 'lucide-react'
import { AdminEmptyState } from './admin-empty-state'

export function AdminRecentActivity() {
  return (
    <AdminEmptyState
      icon={Clock}
      title="No recorded admin activity yet"
      className="py-4"
    />
  )
}
