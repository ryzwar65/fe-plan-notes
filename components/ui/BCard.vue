<script setup lang="ts">
interface Props {
  tone?: 'bone' | 'cream' | 'mustard' | 'terracotta' | 'olive' | 'teal' | 'dusty' | 'ink'
  padded?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  tone: 'bone',
  padded: true,
  shadow: 'md',
})

const toneClass = computed(() => ({
  bone: 'bg-[var(--color-bone)] text-[var(--color-ink)]',
  cream: 'bg-[var(--color-cream)] text-[var(--color-ink)]',
  mustard: 'bg-[var(--color-mustard-soft)] text-[var(--color-ink)]',
  terracotta: 'bg-[var(--color-terracotta-soft)] text-[var(--color-ink)]',
  olive: 'bg-[var(--color-olive-soft)] text-[var(--color-ink)]',
  teal: 'bg-[var(--color-teal-soft)] text-[var(--color-ink)]',
  dusty: 'bg-[var(--color-dusty-blue-soft)] text-[var(--color-ink)]',
  ink: 'bg-[var(--color-ink)] text-[var(--color-cream)]',
}[props.tone]))

const shadowClass = computed(() => ({
  none: '',
  sm: 'shadow-brutal-sm',
  md: 'shadow-brutal',
  lg: 'shadow-brutal-lg',
}[props.shadow]))
</script>

<template>
  <div
    :class="[
      'border-brutal',
      toneClass,
      shadowClass,
      padded && 'p-4 md:p-5',
      interactive && 'brutal-press cursor-pointer',
    ]"
  >
    <slot />
  </div>
</template>
