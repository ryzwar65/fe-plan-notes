<script setup lang="ts">
import type { Transaction } from '~/types'
import { formatIDR, formatDate } from '~/utils/format'
import { transactionTypeLabel, transactionTypeSign } from '~/utils/plan-helpers'

interface Props { items: Transaction[] }
defineProps<Props>()

const toneByType = (type: string) => ({
  income: 'olive',
  expense: 'terracotta',
  saving_in: 'mustard',
  saving_out: 'dusty',
  installment_payment: 'teal',
}[type] || 'ink')
</script>

<template>
  <BCard tone="bone" :padded="false">
    <div class="px-5 py-4 border-b-2 border-[var(--color-ink)] flex items-center justify-between bg-[var(--color-mustard-soft)]">
      <h3 class="font-display uppercase text-base tracking-tight">Transaksi Terbaru</h3>
      <NuxtLink to="/transactions" class="font-mono uppercase text-[10px] tracking-widest underline">Semua</NuxtLink>
    </div>
    <div class="divide-y divide-[var(--color-ink)]/10">
      <div v-if="!items.length" class="px-5 py-6 text-center font-mono text-sm text-[var(--color-ink-soft)]">
        Belum ada transaksi
      </div>
      <div v-for="t in items" :key="t.id" class="px-5 py-3 flex items-center gap-3">
        <BBadge :tone="toneByType(t.type) as any">{{ transactionTypeLabel(t.type) }}</BBadge>
        <div class="flex-1 min-w-0">
          <p class="font-body text-sm truncate">{{ t.description }}</p>
          <p class="font-mono text-[10px] text-[var(--color-ink-soft)] uppercase tracking-wider">
            {{ formatDate(t.occurredAt) }}<span v-if="t.planName"> · {{ t.planName }}</span>
          </p>
        </div>
        <span :class="['font-mono font-bold whitespace-nowrap', transactionTypeSign(t.type) > 0 ? 'text-[var(--color-olive)]' : 'text-[var(--color-terracotta)]']">
          {{ transactionTypeSign(t.type) > 0 ? '+' : '-' }}{{ formatIDR(t.amount, { compact: true }) }}
        </span>
      </div>
    </div>
  </BCard>
</template>
