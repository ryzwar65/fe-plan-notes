<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterInput } from '~/utils/schemas'

definePageMeta({ layout: 'auth', middleware: [] })

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()

const { defineField, handleSubmit, errors, isSubmitting } = useForm<RegisterInput>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: { name: '', email: '', password: '' },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.register(values)
    toast.success('Akun berhasil dibuat')
    router.push('/')
  } catch {
    toast.error('Pendaftaran gagal')
  }
})
</script>

<template>
  <div>
    <p class="font-mono uppercase text-[10px] tracking-widest mb-2 text-[var(--color-ink-soft)]">Start your journey</p>
    <h2 class="font-display uppercase text-4xl tracking-tight mb-1">Daftar</h2>
    <p class="font-body text-sm text-[var(--color-ink-soft)] mb-6">Buat akun baru untuk mulai mencatat.</p>

    <BCard tone="bone">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <BInput v-model="name" v-bind="nameAttrs" label="Nama lengkap" :error="errors.name" required />
        <BInput v-model="email" v-bind="emailAttrs" type="email" label="Email" :error="errors.email" required />
        <BInput v-model="password" v-bind="passwordAttrs" type="password" label="Password" :error="errors.password" hint="Minimal 6 karakter" required />
        <BButton variant="primary" block :loading="isSubmitting" @click="onSubmit">Daftar</BButton>
      </form>
    </BCard>

    <p class="font-mono text-xs mt-5 text-center">
      Sudah punya akun?
      <NuxtLink to="/auth/login" class="underline font-bold">Masuk</NuxtLink>
    </p>
  </div>
</template>
