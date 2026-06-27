<script setup lang="ts">
import type { Plan } from '~/types'
import { formatIDR, formatPercent, formatDate } from '~/utils/format'
import { planTypeLabel, planTypeColor } from '~/utils/plan-helpers'
import { Users, Calendar } from 'lucide-vue-next'

interface Props { plan: Plan }
const props = defineProps<Props>()

const headerBg = computed(() => ({
  saving: 'bg-[var(--color-mustard-soft)]',
  installment: 'bg-[var(--color-terracotta-soft)]',
  expense: 'bg-[var(--color-olive-soft)]',
}[props.plan.type]))
</script>

<template>
  <NuxtLink :to="`/plans/${plan.id}`" class="block group">
    <BCard tone="bone" :padded="false" class="brutal-press">
      <div :class="['px-4 py-3 border-b-2 border-[var(--color-ink)] flex items-center justify-between', headerBg]">
        <BBadge :tone="planTypeColor(plan.type) as any">{{ planTypeLabel(plan.type) }}</BBadge>
        <div class="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
          <span class="flex items-center gap-1"><Users class="w-3 h-3" />{{ plan.memberCount ?? 1 }}</span>
          <span v-if="plan.dueDate" class="flex items-center gap-1"><Calendar class="w-3 h-3" />{{ formatDate(plan.dueDate) }}</span>
        </div>
      </div>
      <div class="p-5 space-y-4">
        <div>
          <h3 class="font-display uppercase text-xl leading-tight tracking-tight mb-1">{{ plan.name }}</h3>
          <p v-if="plan.description" class="font-body text-sm text-[var(--color-ink-soft)] line-clamp-2">{{ plan.description }}</p>
        </div>
        <div>
          <div class="flex justify-between font-mono text-xs mb-1.5">
            <span>{{ formatIDR(plan.currentAmount, { compact: true }) }}</span>
            <span class="text-[var(--color-ink-soft)]">target {{ formatIDR(plan.targetAmount, { compact: true }) }}</span>
          </div>
          <BProgress
            :value="formatPercent(plan.currentAmount, plan.targetAmount)"
            :tone="planTypeColor(plan.type) as any"
            size="md"
            show-label
          />
        </div>
      </div>
    </BCard>
  </NuxtLink>
</template>
