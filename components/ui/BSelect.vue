<script setup lang="ts">
interface Option { label: string; value: string | number }
interface Props {
  modelValue?: string | number
  options: Option[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}
defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [v: string] }>()
</script>

<template>
  <label class="block">
    <span v-if="label" class="block mb-1.5 text-xs font-mono uppercase tracking-wider">{{ label }}</span>
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full border-brutal bg-[var(--color-paper)] text-[var(--color-ink)] font-body',
        'px-3 py-2.5 outline-none appearance-none cursor-pointer',
        'focus:shadow-brutal-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition',
        error && 'border-[var(--color-terracotta)]',
      ]"
      @change="e => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <span v-if="error" class="block mt-1 text-xs font-mono text-[var(--color-terracotta)]">{{ error }}</span>
  </label>
</template>
