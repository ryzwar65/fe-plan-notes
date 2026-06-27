<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { transactionSchema, type TransactionInput } from '~/utils/schemas'
import { allowedTransactionTypesForPlan, transactionTypeLabel } from '~/utils/plan-helpers'

interface Props { modelValue: boolean; defaultPlanId?: string | null }
const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [v: boolean] }>()

const transactions = useTransactionsStore()
const plans = usePlansStore()
const toast = useToast()

onMounted(() => {
  if (!plans.list.length) plans.fetchAll().catch(() => {})
})

const { defineField, handleSubmit, errors, resetForm, isSubmitting, values } = useForm<TransactionInput>({
  validationSchema: toTypedSchema(transactionSchema),
  initialValues: {
    type: 'expense',
    amount: 0,
    description: '',
    planId: props.defaultPlanId || null,
    occurredAt: new Date().toISOString().slice(0, 10),
  },
})

const [type, typeAttrs] = defineField('type')
const [amount, amountAttrs] = defineField('amount')
const [description, descriptionAttrs] = defineField('description')
const [planId, planIdAttrs] = defineField('planId')
const [occurredAt, occurredAtAttrs] = defineField('occurredAt')

const selectedPlan = computed(() => plans.list.find(p => p.id === values.planId))

const availableTypes = computed(() =>
  allowedTransactionTypesForPlan(selectedPlan.value?.type as any)
    .map(t => ({ label: transactionTypeLabel(t), value: t }))
)

watch(() => values.planId, () => {
  const allowed = availableTypes.value.map(t => t.value)
  if (allowed.length && !allowed.includes(values.type)) {
    type.value = allowed[0] as any
  }
})

const planOptions = computed(() => [
  { label: '— Tanpa Plan —', value: '' },
  ...plans.list.map(p => ({ label: p.name, value: p.id })),
])

const onSubmit = handleSubmit(async (v) => {
  try {
    await transactions.create({ ...v, planId: v.planId || null })
    toast.success('Transaksi tersimpan')
    resetForm()
    emit('update:modelValue', false)
  } catch {
    toast.error('Gagal menyimpan transaksi')
  }
})
</script>

<template>
  <BModal :model-value="modelValue" title="Catat Transaksi" @update:model-value="emit('update:modelValue', $event)">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BSelect v-model="planId" v-bind="planIdAttrs" label="Plan" :options="planOptions" :error="errors.planId" />
      <BSelect v-model="type" v-bind="typeAttrs" label="Tipe Transaksi" :options="availableTypes" :error="errors.type" />
      <BInput v-model.number="amount" v-bind="amountAttrs" type="number" label="Nominal" prefix="Rp" :error="errors.amount" required />
      <BInput v-model="description" v-bind="descriptionAttrs" label="Deskripsi" placeholder="Contoh: Belanja bulanan" :error="errors.description" required />
      <BInput v-model="occurredAt" v-bind="occurredAtAttrs" type="date" label="Tanggal" :error="errors.occurredAt" required />
    </form>
    <template #footer>
      <div class="flex justify-end gap-2">
        <BButton variant="secondary" @click="emit('update:modelValue', false)">Batal</BButton>
        <BButton variant="primary" :loading="isSubmitting" @click="onSubmit">Simpan</BButton>
      </div>
    </template>
  </BModal>
</template>
