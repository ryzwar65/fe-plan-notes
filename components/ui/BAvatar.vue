<script setup lang="ts">
interface Props {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
}
const props = withDefaults(defineProps<Props>(), { size: 'md' })

const initials = computed(() =>
  props.name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]?.toUpperCase()).join('')
)

const sizeClass = computed(() => ({
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
}[props.size]))

const bgClasses = [
  'bg-[var(--color-mustard)]',
  'bg-[var(--color-olive)]',
  'bg-[var(--color-terracotta)]',
  'bg-[var(--color-teal-retro)]',
  'bg-[var(--color-dusty-blue)]',
]
const colorClass = computed(() => {
  const hash = props.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return bgClasses[hash % bgClasses.length]
})
</script>

<template>
  <div
    :class="[
      'border-brutal shadow-brutal-sm font-display flex items-center justify-center text-[var(--color-ink)] uppercase overflow-hidden',
      sizeClass,
      !src && colorClass,
    ]"
  >
    <img v-if="src" :src="src" :alt="name" class="w-full h-full object-cover" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
