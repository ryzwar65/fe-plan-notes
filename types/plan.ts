export type PlanType = 'saving' | 'installment' | 'expense'
export type PlanStatus = 'active' | 'done' | 'archived'
export type PlanRole = 'owner' | 'editor' | 'viewer'

export interface Plan {
  id: string
  ownerId: string
  name: string
  description?: string
  type: PlanType
  status: PlanStatus
  targetAmount: number
  currentAmount: number
  dueDate?: string | null
  color: string
  createdAt: string
  memberCount?: number
}

export interface PlanMember {
  id: string
  planId: string
  userId: string
  user: { id: string; name: string; email: string; avatarUrl?: string | null }
  role: PlanRole
  joinedAt: string
}
