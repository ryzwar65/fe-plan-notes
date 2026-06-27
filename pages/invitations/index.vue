<script setup lang="ts">
import { Check, X, Mail } from 'lucide-vue-next'
import { formatDate } from '~/utils/format'

definePageMeta({ layout: 'default' })

const invitations = useInvitationsStore()
const toast = useToast()

await useAsyncData('invitations-inbox', async () => {
  await invitations.fetchInbox()
  return true
})

const accept = async (token: string) => {
  try {
    await invitations.accept(token)
    toast.success('Undangan diterima')
  } catch { toast.error('Gagal menerima') }
}
const reject = async (token: string) => {
  try {
    await invitations.reject(token)
    toast.info('Undangan ditolak')
  } catch { toast.error('Gagal menolak') }
}

const statusTone = (s: string) => ({
  pending: 'mustard', accepted: 'olive', rejected: 'terracotta', expired: 'dusty',
}[s] || 'ink')
</script>

<template>
  <div class="space-y-5">
    <div>
      <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-1">/invitations</p>
      <h1 class="font-display uppercase text-3xl tracking-tight">Inbox Undangan</h1>
      <p class="font-body text-sm text-[var(--color-ink-soft)] mt-1">
        {{ invitations.pendingCount }} undangan menunggu jawabanmu.
      </p>
    </div>

    <BCard v-if="!invitations.inbox.length" tone="cream">
      <div class="flex items-center gap-3 py-6 justify-center">
        <Mail class="w-6 h-6" />
        <span class="font-mono uppercase text-sm tracking-wider">Inbox kosong</span>
      </div>
    </BCard>

    <div v-else class="space-y-3">
      <BCard
        v-for="inv in invitations.inbox"
        :key="inv.id"
        tone="bone"
        :padded="false"
      >
        <div class="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3">
          <BAvatar :name="inv.invitedBy.name" size="md" />
          <div class="flex-1 min-w-0">
            <p class="font-body text-sm">
              <span class="font-display uppercase tracking-tight">{{ inv.invitedBy.name }}</span>
              mengundangmu ke
              <NuxtLink :to="`/plans/${inv.planId}`" class="font-display uppercase underline">{{ inv.planName }}</NuxtLink>
              sebagai <BBadge tone="dusty">{{ inv.role }}</BBadge>
            </p>
            <p class="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)] mt-1">
              {{ formatDate(inv.createdAt) }} · kedaluwarsa {{ formatDate(inv.expiresAt) }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <BBadge :tone="statusTone(inv.status) as any">{{ inv.status }}</BBadge>
            <template v-if="inv.status === 'pending'">
              <BButton variant="olive" size="sm" @click="accept(inv.token)">
                <Check class="w-3 h-3" /> Terima
              </BButton>
              <BButton variant="danger" size="sm" @click="reject(inv.token)">
                <X class="w-3 h-3" /> Tolak
              </BButton>
            </template>
          </div>
        </div>
      </BCard>
    </div>
  </div>
</template>
