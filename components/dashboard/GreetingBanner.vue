<script setup lang="ts">
import { formatDate, greetingByHour } from '~/utils/format'

const auth = useAuthStore()
const now = new Date()
</script>

<template>
  <BCard tone="cream" :padded="false">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-5">
      <div>
        <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-2">
          {{ formatDate(now, 'long') }}
        </p>
        <h1 class="font-display text-2xl md:text-3xl uppercase leading-tight">
          {{ greetingByHour(now) }}, {{ (auth.user?.name || 'Sobat').split(' ')[0] }} —<br />
          ayo catat keuanganmu hari ini.
        </h1>
      </div>
      <div class="flex gap-2 shrink-0">
        <BBadge tone="olive" size="md">Active</BBadge>
        <BBadge tone="teal" size="md">{{ formatDate(now, 'day') }}</BBadge>
      </div>
    </div>
  </BCard>
</template>
