import { defineStore } from 'pinia'
import type { Plan, PlanMember } from '~/types'
import type { PlanInput, InviteInput } from '~/utils/schemas'

export const usePlansStore = defineStore('plans', () => {
  const list = ref<Plan[]>([])
  const current = ref<Plan | null>(null)
  const members = ref<PlanMember[]>([])
  const loading = ref(false)

  const api = () => useApi()

  const byType = computed(() => (type: string) => list.value.filter(p => p.type === type))
  const active = computed(() => list.value.filter(p => p.status === 'active'))

  const fetchAll = async () => {
    loading.value = true
    try {
      list.value = await api().get<Plan[]>('/plans')
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (id: string) => {
    current.value = await api().get<Plan>(`/plans/${id}`)
    return current.value
  }

  const fetchMembers = async (id: string) => {
    members.value = await api().get<PlanMember[]>(`/plans/${id}/members`)
  }

  const create = async (input: PlanInput) => {
    const plan = await api().post<Plan>('/plans', input)
    list.value.unshift(plan)
    return plan
  }

  const update = async (id: string, input: Partial<PlanInput>) => {
    const plan = await api().patch<Plan>(`/plans/${id}`, input)
    const idx = list.value.findIndex(p => p.id === id)
    if (idx >= 0) list.value[idx] = plan
    if (current.value?.id === id) current.value = plan
    return plan
  }

  const remove = async (id: string) => {
    await api().del(`/plans/${id}`)
    list.value = list.value.filter(p => p.id !== id)
  }

  const invite = async (planId: string, input: InviteInput) => {
    return await api().post(`/plans/${planId}/invite`, input)
  }

  return {
    list, current, members, loading,
    byType, active,
    fetchAll, fetchOne, fetchMembers, create, update, remove, invite,
  }
})
