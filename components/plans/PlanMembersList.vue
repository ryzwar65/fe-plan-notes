<script setup lang="ts">
import type { PlanMember } from '~/types'
import { formatDate } from '~/utils/format'

interface Props { members: PlanMember[] }
defineProps<Props>()

const roleTone = (role: string) => ({
  owner: 'ink',
  editor: 'olive',
  viewer: 'dusty',
}[role] || 'bone')
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="m in members"
      :key="m.id"
      class="border-brutal bg-[var(--color-bone)] p-3 flex items-center gap-3 shadow-brutal-sm"
    >
      <BAvatar :name="m.user.name" :src="m.user.avatarUrl" size="md" />
      <div class="flex-1 min-w-0">
        <p class="font-display uppercase text-sm tracking-tight">{{ m.user.name }}</p>
        <p class="font-mono text-xs text-[var(--color-ink-soft)] truncate">{{ m.user.email }}</p>
      </div>
      <div class="flex items-center gap-2">
        <BBadge :tone="roleTone(m.role) as any">{{ m.role }}</BBadge>
        <span class="font-mono text-[10px] text-[var(--color-ink-soft)] hidden md:inline">{{ formatDate(m.joinedAt) }}</span>
      </div>
    </div>
  </div>
</template>
