<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { inviteSchema, type InviteInput } from '~/utils/schemas'

interface Props { planId: string }
const props = defineProps<Props>()

const plans = usePlansStore()
const toast = useToast()

const { defineField, handleSubmit, errors, resetForm, isSubmitting } = useForm<InviteInput>({
  validationSchema: toTypedSchema(inviteSchema),
  initialValues: { email: '', role: 'editor' },
})

const [email, emailAttrs] = defineField('email')
const [role, roleAttrs] = defineField('role')

const onSubmit = handleSubmit(async (values) => {
  try {
    await plans.invite(props.planId, values)
    toast.success(`Undangan dikirim ke ${values.email}`)
    resetForm()
  } catch {
    toast.error('Gagal mengirim undangan')
  }
})

const roleOptions = [
  { label: 'Editor (bisa edit & catat)', value: 'editor' },
  { label: 'Viewer (lihat saja)', value: 'viewer' },
]
</script>

<template>
  <BCard tone="mustard">
    <h4 class="font-display uppercase text-base tracking-tight mb-3">Undang Member</h4>
    <form class="flex flex-col md:flex-row gap-3 items-start" @submit.prevent="onSubmit">
      <div class="flex-1 w-full">
        <BInput v-model="email" v-bind="emailAttrs" type="email" placeholder="email@contoh.com" :error="errors.email" />
      </div>
      <div class="w-full md:w-52">
        <BSelect v-model="role" v-bind="roleAttrs" :options="roleOptions" :error="errors.role" />
      </div>
      <BButton variant="primary" :loading="isSubmitting" @click="onSubmit">Kirim</BButton>
    </form>
  </BCard>
</template>
