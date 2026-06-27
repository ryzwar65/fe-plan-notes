<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
}
const props = withDefaults(defineProps<Props>(), { size: 'md' })
const emit = defineEmits<{ 'update:modelValue': [v: boolean] }>()

const close = () => emit('update:modelValue', false)

const sizeClass = computed(() => ({
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
}[props.size]))

watch(() => props.modelValue, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-100"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(26,24,20,0.4)]"
        @click.self="close"
      >
        <div
          :class="[
            'w-full border-brutal-thick bg-[var(--color-bone)] shadow-brutal-lg',
            sizeClass,
          ]"
        >
          <div
            v-if="title"
            class="flex items-center justify-between px-5 py-3 border-b-2 border-[var(--color-ink)] bg-[var(--color-mustard)]"
          >
            <h3 class="font-display uppercase text-lg tracking-tight">{{ title }}</h3>
            <button
              class="w-8 h-8 border-brutal bg-[var(--color-bone)] flex items-center justify-center brutal-press"
              @click="close"
            >
              ✕
            </button>
          </div>
          <div class="p-5"><slot /></div>
          <div v-if="$slots.footer" class="px-5 py-3 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream)]">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
