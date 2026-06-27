<script setup lang="ts">
interface Props {
  value: number
  max?: number
  tone?: 'mustard' | 'olive' | 'terracotta' | 'teal' | 'dusty'
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}
const props = withDefaults(defineProps<Props>(), { max: 100, tone: 'mustard', size: 'md' })

const pct = computed(() => Math.max(0, Math.min(100, (props.value / (props.max || 1)) * 100)))

const toneClass = computed(() => ({
  mustard: 'bg-[var(--color-mustard)]',
  olive: 'bg-[var(--color-olive)]',
  terracotta: 'bg-[var(--color-terracotta)]',
  teal: 'bg-[var(--color-teal-retro)]',
  dusty: 'bg-[var(--color-dusty-blue)]',
}[props.tone]))

const sizeClass = computed(() => ({
  sm: 'h-3',
  md: 'h-5',
  lg: 'h-7',
}[props.size]))
</script>

<template>
  <div class="w-full">
    <div :class="['border-brutal bg-[var(--color-paper)] relative overflow-hidden', sizeClass]">
      <div
        :class="['h-full transition-all duration-500', toneClass]"
        :style="{ width: pct + '%' }"
      />
      <span
        v-if="showLabel"
        class="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold mix-blend-difference text-white"
      >
        {{ Math.round(pct) }}%
      </span>
    </div>
  </div>
</template>
