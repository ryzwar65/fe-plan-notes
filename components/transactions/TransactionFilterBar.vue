<script setup lang="ts">
import type { TransactionFilters } from '~/types'

interface Props { modelValue: TransactionFilters }
const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [v: TransactionFilters] }>()

const plans = usePlansStore()
onMounted(() => {
  if (!plans.list.length) plans.fetchAll().catch(() => {})
})

const update = (patch: Partial<TransactionFilters>) =>
  emit('update:modelValue', { ...props.modelValue, ...patch })

const typeOptions = [
  { label: 'Semua tipe', value: '' },
  { label: 'Pemasukan', value: 'income' },
  { label: 'Pengeluaran', value: 'expense' },
  { label: 'Setor Tabungan', value: 'saving_in' },
  { label: 'Tarik Tabungan', value: 'saving_out' },
  { label: 'Bayar Cicilan', value: 'installment_payment' },
]

const planOptions = computed(() => [
  { label: 'Semua plan', value: '' },
  ...plans.list.map(p => ({ label: p.name, value: p.id })),
])
</script>

<template>
  <BCard tone="cream">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <BSelect
        :model-value="modelValue.type || ''"
        :options="typeOptions"
        label="Tipe"
        @update:model-value="v => update({ type: (v || undefined) as any })"
      />
      <BSelect
        :model-value="modelValue.planId || ''"
        :options="planOptions"
        label="Plan"
        @update:model-value="v => update({ planId: v || undefined })"
      />
      <BInput
        :model-value="modelValue.from || ''"
        type="date"
        label="Dari"
        @update:model-value="v => update({ from: (v as string) || undefined })"
      />
      <BInput
        :model-value="modelValue.to || ''"
        type="date"
        label="Sampai"
        @update:model-value="v => update({ to: (v as string) || undefined })"
      />
    </div>
  </BCard>
</template>
