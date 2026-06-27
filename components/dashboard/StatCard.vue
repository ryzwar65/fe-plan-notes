<script setup lang="ts">
import { formatIDR } from '~/utils/format'
import type { Component } from 'vue'

interface Props {
  label: string
  amount: number
  delta?: string
  tone?: 'mustard' | 'olive' | 'terracotta' | 'teal' | 'dusty'
  icon?: Component
  highlight?: boolean
}
const props = withDefaults(defineProps<Props>(), { tone: 'mustard', highlight: false })

const toneClass = computed(() => ({
  mustard: 'bg-[var(--color-mustard-soft)]',
  olive: 'bg-[var(--color-olive-soft)]',
  terracotta: 'bg-[var(--color-terracotta-soft)]',
  teal: 'bg-[var(--color-teal-soft)]',
  dusty: 'bg-[var(--color-dusty-blue-soft)]',
}[props.tone]))

const iconBg = computed(() => ({
  mustard: 'bg-[var(--color-mustard)]',
  olive: 'bg-[var(--color-olive)] text-[var(--color-bone)]',
  terracotta: 'bg-[var(--color-terracotta)] text-[var(--color-bone)]',
  teal: 'bg-[var(--color-teal-retro)] text-[var(--color-bone)]',
  dusty: 'bg-[var(--color-dusty-blue)] text-[var(--color-bone)]',
}[props.tone]))
</script>

<template>
  <div :class="['border-brutal shadow-brutal-sm relative overflow-hidden', highlight ? toneClass : 'bg-[var(--color-bone)]']">
    <div class="p-5">
      <div class="flex items-start justify-between mb-6">
        <div :class="['w-11 h-11 border-brutal flex items-center justify-center shadow-brutal-sm', iconBg]">
          <component :is="icon" class="w-5 h-5" />
        </div>
        <div class="text-right font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">
          {{ delta }}
        </div>
      </div>
      <p class="font-mono uppercase text-xs tracking-wider mb-1.5">{{ label }}</p>
      <p class="font-display text-3xl md:text-4xl leading-none tracking-tight">{{ formatIDR(amount, { compact: true }) }}</p>
    </div>
    <svg
      class="absolute bottom-0 left-0 w-full h-12 opacity-40"
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
    >
      <path
        d="M0,30 Q25,10 50,20 T100,15 T150,25 T200,18 L200,40 L0,40 Z"
        fill="var(--color-ink)"
        fill-opacity="0.08"
      />
      <path
        d="M0,30 Q25,10 50,20 T100,15 T150,25 T200,18"
        stroke="var(--color-ink)"
        stroke-width="1.5"
        fill="none"
      />
    </svg>
  </div>
</template>
