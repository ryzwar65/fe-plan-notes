<script setup lang="ts">
import type { Plan } from '~/types'
import { formatIDR, formatPercent } from '~/utils/format'
import { planTypeLabel, planTypeColor } from '~/utils/plan-helpers'

interface Props { plans: Plan[] }
defineProps<Props>()
</script>

<template>
  <BCard tone="terracotta" :padded="false">
    <div class="px-5 py-4 border-b-2 border-[var(--color-ink)] flex items-center justify-between">
      <h3 class="font-display uppercase text-base tracking-tight">Progress Plan</h3>
      <NuxtLink to="/plans" class="font-mono uppercase text-[10px] tracking-widest underline">Lihat Semua</NuxtLink>
    </div>
    <div class="p-5 space-y-4">
      <p v-if="!plans.length" class="font-mono text-sm text-[var(--color-ink-soft)]">Belum ada plan.</p>
      <div v-for="plan in plans" :key="plan.id" class="space-y-2">
        <div class="flex items-center justify-between gap-3">
          <NuxtLink :to="`/plans/${plan.id}`" class="font-display uppercase text-sm tracking-tight hover:underline">
            {{ plan.name }}
          </NuxtLink>
          <BBadge :tone="planTypeColor(plan.type) as any">{{ planTypeLabel(plan.type) }}</BBadge>
        </div>
        <BProgress
          :value="formatPercent(plan.currentAmount, plan.targetAmount)"
          :tone="planTypeColor(plan.type) as any"
          size="sm"
        />
        <div class="flex items-center justify-between font-mono text-xs">
          <span>{{ formatIDR(plan.currentAmount, { compact: true }) }}</span>
          <span class="text-[var(--color-ink-soft)]">/ {{ formatIDR(plan.targetAmount, { compact: true }) }}</span>
        </div>
      </div>
    </div>
  </BCard>
</template>
