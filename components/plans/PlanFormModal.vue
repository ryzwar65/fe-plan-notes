<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { planSchema, type PlanInput } from '~/utils/schemas'
import type { Plan } from '~/types'

interface Props {
  modelValue: boolean
  plan?: Plan | null
}
const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [v: boolean]
  saved: [plan: Plan]
}>()

const plans = usePlansStore()
const toast = useToast()

const { defineField, handleSubmit, errors, resetForm, isSubmitting } = useForm<PlanInput>({
  validationSchema: toTypedSchema(planSchema),
  initialValues: {
    name: '', description: '', type: 'saving', targetAmount: 0, dueDate: null, color: 'mustard',
  },
})

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [type, typeAttrs] = defineField('type')
const [targetAmount, targetAttrs] = defineField('targetAmount')
const [dueDate, dueAttrs] = defineField('dueDate')

watch(() => props.plan, (p) => {
  if (p) {
    resetForm({ values: {
      name: p.name,
      description: p.description || '',
      type: p.type,
      targetAmount: p.targetAmount,
      dueDate: p.dueDate || null,
      color: p.color,
    }})
  } else {
    resetForm({ values: { name: '', description: '', type: 'saving', targetAmount: 0, dueDate: null, color: 'mustard' }})
  }
}, { immediate: true })

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = props.plan
      ? await plans.update(props.plan.id, values)
      : await plans.create(values)
    toast.success(props.plan ? 'Plan diperbarui' : 'Plan dibuat')
    emit('saved', result)
    emit('update:modelValue', false)
  } catch {
    toast.error('Gagal menyimpan plan')
  }
})

const typeOptions = [
  { label: 'Tabungan', value: 'saving' },
  { label: 'Cicilan', value: 'installment' },
  { label: 'Pengeluaran (budget)', value: 'expense' },
]
</script>

<template>
  <BModal :model-value="modelValue" :title="plan ? 'Edit Plan' : 'Buat Plan Baru'" @update:model-value="emit('update:modelValue', $event)">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BInput v-model="name" v-bind="nameAttrs" label="Nama Plan" placeholder="Contoh: Dana Darurat" :error="errors.name" required />
      <BInput v-model="description" v-bind="descriptionAttrs" label="Deskripsi" placeholder="Opsional" :error="errors.description" />
      <div class="grid grid-cols-2 gap-3">
        <BSelect v-model="type" v-bind="typeAttrs" label="Tipe" :options="typeOptions" :error="errors.type" />
        <BInput v-model.number="targetAmount" v-bind="targetAttrs" type="number" label="Target (Rp)" prefix="Rp" :error="errors.targetAmount" required />
      </div>
      <BInput v-model="dueDate" v-bind="dueAttrs" type="date" label="Jatuh Tempo (opsional)" :error="errors.dueDate" />
    </form>
    <template #footer>
      <div class="flex justify-end gap-2">
        <BButton variant="secondary" @click="emit('update:modelValue', false)">Batal</BButton>
        <BButton variant="primary" :loading="isSubmitting" @click="onSubmit">{{ plan ? 'Simpan' : 'Buat Plan' }}</BButton>
      </div>
    </template>
  </BModal>
</template>
