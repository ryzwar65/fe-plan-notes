<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
import { formatDate } from '~/utils/format'

definePageMeta({ layout: 'default' })

const auth = useAuthStore()
const plans = usePlansStore()
const transactions = useTransactionsStore()

await useAsyncData('profile', async () => {
  if (!plans.list.length) await plans.fetchAll()
  if (!transactions.list.length) await transactions.fetchAll()
  return true
})
</script>

<template>
  <div class="space-y-5 max-w-3xl">
    <div>
      <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-1">/profile</p>
      <h1 class="font-display uppercase text-3xl tracking-tight">Profil</h1>
    </div>

    <BCard tone="mustard">
      <div class="flex items-center gap-4">
        <BAvatar :name="auth.user?.name || 'Guest'" :src="auth.user?.avatarUrl" size="lg" />
        <div class="flex-1">
          <h2 class="font-display uppercase text-2xl tracking-tight">{{ auth.user?.name }}</h2>
          <p class="font-mono text-sm">{{ auth.user?.email }}</p>
          <p class="font-mono text-[10px] uppercase tracking-widest mt-1 text-[var(--color-ink-soft)]">
            Bergabung {{ auth.user?.createdAt ? formatDate(auth.user.createdAt, 'long') : '-' }}
          </p>
        </div>
      </div>
    </BCard>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BCard tone="olive">
        <p class="font-mono uppercase text-xs tracking-wider mb-1">Plan Aktif</p>
        <p class="font-display text-3xl">{{ plans.active.length }}</p>
      </BCard>
      <BCard tone="terracotta">
        <p class="font-mono uppercase text-xs tracking-wider mb-1">Transaksi</p>
        <p class="font-display text-3xl">{{ transactions.list.length }}</p>
      </BCard>
      <BCard tone="teal">
        <p class="font-mono uppercase text-xs tracking-wider mb-1">Saldo</p>
        <p class="font-display text-3xl">{{ new Intl.NumberFormat('id-ID').format(transactions.monthly.balance) }}</p>
      </BCard>
    </div>

    <BCard tone="bone">
      <h3 class="font-display uppercase text-base tracking-tight mb-3">Akun</h3>
      <BButton variant="danger" @click="auth.logout">
        <LogOut class="w-4 h-4" /> Keluar
      </BButton>
    </BCard>
  </div>
</template>
