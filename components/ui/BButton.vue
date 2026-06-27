<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'mustard' | 'olive' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  to?: string
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const variantClass = computed(() => ({
  primary: 'bg-[var(--color-ink)] text-[var(--color-cream)]',
  secondary: 'bg-[var(--color-bone)] text-[var(--color-ink)]',
  danger: 'bg-[var(--color-terracotta)] text-[var(--color-bone)]',
  ghost: 'bg-transparent text-[var(--color-ink)]',
  mustard: 'bg-[var(--color-mustard)] text-[var(--color-ink)]',
  olive: 'bg-[var(--color-olive)] text-[var(--color-bone)]',
  teal: 'bg-[var(--color-teal-retro)] text-[var(--color-bone)]',
}[props.variant]))

const sizeClass = computed(() => ({
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}[props.size]))
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide',
      'border-brutal shadow-brutal-sm brutal-press',
      variantClass,
      sizeClass,
      block && 'w-full',
      (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    ]"
  >
    <span v-if="loading" class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
    <slot />
  </component>
</template>
