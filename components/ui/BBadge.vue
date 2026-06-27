<script setup lang="ts">
interface Props {
  tone?: 'mustard' | 'olive' | 'terracotta' | 'teal' | 'dusty' | 'ink' | 'bone'
  size?: 'sm' | 'md'
}
const props = withDefaults(defineProps<Props>(), { tone: 'mustard', size: 'sm' })

const toneClass = computed(() => ({
  mustard: 'bg-[var(--color-mustard)] text-[var(--color-ink)]',
  olive: 'bg-[var(--color-olive)] text-[var(--color-bone)]',
  terracotta: 'bg-[var(--color-terracotta)] text-[var(--color-bone)]',
  teal: 'bg-[var(--color-teal-retro)] text-[var(--color-bone)]',
  dusty: 'bg-[var(--color-dusty-blue)] text-[var(--color-bone)]',
  ink: 'bg-[var(--color-ink)] text-[var(--color-cream)]',
  bone: 'bg-[var(--color-bone)] text-[var(--color-ink)]',
}[props.tone]))

const sizeClass = computed(() => ({
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}[props.size]))
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 font-mono uppercase tracking-wider border-brutal',
      toneClass,
      sizeClass,
    ]"
  >
    <slot />
  </span>
</template>
