<script setup lang="ts">
import type { Plan } from '~/types'
import { formatIDR, formatDate } from '~/utils/format'

interface Props { plans: Plan[] }
const props = defineProps<Props>()

const upcoming = computed(() =>
  (props.plans || [])
    .filter(p => p.dueDate)
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    .slice(0, 5)
)
</script>

<template>
  <BCard tone="teal" :padded="false">
    <div class="px-5 py-4 border-b-2 border-[var(--color-ink)] flex items-center justify-between">
      <h3 class="font-display uppercase text-base tracking-tight">Jatuh Tempo</h3>
      <BBadge tone="ink">{{ upcoming.length }}</BBadge>
    </div>
    <div class="p-4 space-y-3">
      <div v-if="!upcoming.length" class="font-mono text-sm text-[var(--color-ink-soft)] text-center py-4">
        Tidak ada cicilan jatuh tempo
      </div>
      <NuxtLink
        v-for="p in upcoming"
        :key="p.id"
        :to="`/plans/${p.id}`"
        class="block border-brutal bg-[var(--color-bone)] p-3 shadow-brutal-sm brutal-press"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="font-display uppercase text-sm tracking-tight">{{ p.name }}</span>
          <span class="font-mono text-[10px] uppercase">{{ formatDate(p.dueDate!) }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs text-[var(--color-ink-soft)]">Sisa target</span>
          <span class="font-mono font-bold">{{ formatIDR(Math.max(0, p.targetAmount - p.currentAmount), { compact: true }) }}</span>
        </div>
      </NuxtLink>
    </div>
  </BCard>
</template>
