<script setup lang="ts">
interface Props {
  page: number
  totalPages: number
  from: number
  to: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:page': [page: number] }>()

const pages = computed<(number | '...')[]>(() => {
  const t = props.totalPages
  const c = props.page

  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)

  const result: (number | '...')[] = [1]

  if (c > 3) result.push('...')

  for (let i = Math.max(2, c - 1); i <= Math.min(t - 1, c + 1); i++) {
    result.push(i)
  }

  if (c < t - 2) result.push('...')

  result.push(t)

  return result
})
</script>

<template>
  <div class="flex items-center justify-between px-3 py-2.5 border-t-2 border-[var(--color-ink)]">
    <span class="font-mono text-xs text-[var(--color-ink-soft)] uppercase tracking-wider">
      {{ total === 0 ? 'Tidak ada data' : `${from}–${to} / ${total}` }}
    </span>

    <div v-if="total > 0" class="flex items-center gap-1">
      <button
        :disabled="page === 1"
        class="w-7 h-7 border-brutal font-display text-sm flex items-center justify-center brutal-press shadow-brutal-sm bg-[var(--color-bone)] disabled:opacity-40 disabled:pointer-events-none"
        @click="emit('update:page', page - 1)"
      >
        ‹
      </button>

      <template v-for="p in pages" :key="`${p}`">
        <span
          v-if="p === '...'"
          class="w-7 h-7 flex items-center justify-center font-mono text-xs text-[var(--color-ink-soft)]"
        >…</span>
        <button
          v-else
          :class="[
            'w-7 h-7 border-brutal font-display text-xs flex items-center justify-center brutal-press shadow-brutal-sm',
            p === page ? 'bg-[var(--color-mustard)]' : 'bg-[var(--color-bone)]',
          ]"
          @click="emit('update:page', p as number)"
        >
          {{ p }}
        </button>
      </template>

      <button
        :disabled="page === totalPages"
        class="w-7 h-7 border-brutal font-display text-sm flex items-center justify-center brutal-press shadow-brutal-sm bg-[var(--color-bone)] disabled:opacity-40 disabled:pointer-events-none"
        @click="emit('update:page', page + 1)"
      >
        ›
      </button>
    </div>
  </div>
</template>
