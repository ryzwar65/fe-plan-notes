import type { PlanRole } from './plan'

export type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

export interface Invitation {
  id: string
  planId: string
  planName: string
  email: string
  invitedBy: { id: string; name: string; email: string }
  role: PlanRole
  token: string
  status: InvitationStatus
  expiresAt: string
  createdAt: string
}
