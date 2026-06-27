<script setup lang="ts">
interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  error?: string
  hint?: string
  disabled?: boolean
  prefix?: string
  required?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [v: string | number] }>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <label class="block">
    <span v-if="label" class="block mb-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-ink)]">
      {{ label }}<span v-if="required" class="text-[var(--color-terracotta)] ml-0.5">*</span>
    </span>
    <div class="relative">
      <span v-if="prefix" class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-[var(--color-ink-soft)]">
        {{ prefix }}
      </span>
      <input
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full border-brutal bg-[var(--color-paper)] text-[var(--color-ink)] font-body',
          'px-3 py-2.5 outline-none placeholder:text-[var(--color-ink-soft)]',
          'focus:shadow-brutal-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition',
          prefix && 'pl-9',
          error && 'border-[var(--color-terracotta)]',
        ]"
        @input="onInput"
      />
    </div>
    <span v-if="error" class="block mt-1 text-xs font-mono text-[var(--color-terracotta)]">{{ error }}</span>
    <span v-else-if="hint" class="block mt-1 text-xs font-mono text-[var(--color-ink-soft)]">{{ hint }}</span>
  </label>
</template>
