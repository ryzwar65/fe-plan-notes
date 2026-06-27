<script setup lang="ts">
const { toasts, dismiss } = useToast()

const toneClass = (type: string) => ({
  success: 'bg-[var(--color-olive)] text-[var(--color-bone)]',
  error: 'bg-[var(--color-terracotta)] text-[var(--color-bone)]',
  info: 'bg-[var(--color-mustard)] text-[var(--color-ink)]',
}[type])
</script>

<template>
  <div class="fixed top-4 right-4 z-[60] flex flex-col gap-2 max-w-xs">
    <TransitionGroup
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-150"
      enter-from-class="opacity-0 translate-x-4"
      leave-to-class="opacity-0 translate-x-4"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="['border-brutal shadow-brutal-sm px-4 py-2.5 flex items-center justify-between gap-3 font-mono text-sm', toneClass(t.type)]"
      >
        <span>{{ t.message }}</span>
        <button class="opacity-70 hover:opacity-100" @click="dismiss(t.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>
