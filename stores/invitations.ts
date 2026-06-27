import { defineStore } from 'pinia'
import type { Invitation } from '~/types'

export const useInvitationsStore = defineStore('invitations', () => {
  const inbox = ref<Invitation[]>([])
  const sent = ref<Invitation[]>([])
  const loading = ref(false)

  const api = () => useApi()
  const pendingCount = computed(() => inbox.value.filter(i => i.status === 'pending').length)

  const fetchInbox = async () => {
    loading.value = true
    try {
      inbox.value = await api().get<Invitation[]>('/invitations')
    } finally {
      loading.value = false
    }
  }

  const fetchSent = async () => {
    sent.value = await api().get<Invitation[]>('/invitations?direction=sent')
  }

  const accept = async (token: string) => {
    await api().post(`/invitations/${token}/accept`)
    const inv = inbox.value.find(i => i.token === token)
    if (inv) inv.status = 'accepted'
  }

  const reject = async (token: string) => {
    await api().post(`/invitations/${token}/reject`)
    const inv = inbox.value.find(i => i.token === token)
    if (inv) inv.status = 'rejected'
  }

  return { inbox, sent, loading, pendingCount, fetchInbox, fetchSent, accept, reject }
})
