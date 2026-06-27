<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginInput } from '~/utils/schemas'

definePageMeta({ layout: 'auth', middleware: [] })

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()

const { defineField, handleSubmit, errors, isSubmitting } = useForm<LoginInput>({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: { email: 'demo@plannotes.id', password: 'demo123' },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login(values)
    toast.success('Selamat datang kembali!')
    router.push('/')
  } catch {
    toast.error('Email atau password salah')
  }
})
</script>

<template>
  <div>
    <p class="font-mono uppercase text-[10px] tracking-widest mb-2 text-[var(--color-ink-soft)]">Welcome back</p>
    <h2 class="font-display uppercase text-4xl tracking-tight mb-1">Masuk</h2>
    <p class="font-body text-sm text-[var(--color-ink-soft)] mb-6">Lanjutkan mengatur keuanganmu.</p>

    <BCard tone="bone">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <BInput v-model="email" v-bind="emailAttrs" type="email" label="Email" :error="errors.email" required />
        <BInput v-model="password" v-bind="passwordAttrs" type="password" label="Password" :error="errors.password" required />
        <BButton variant="primary" block :loading="isSubmitting" @click="onSubmit">Masuk</BButton>
      </form>
    </BCard>

    <p class="font-mono text-xs mt-5 text-center">
      Belum punya akun?
      <NuxtLink to="/auth/register" class="underline font-bold">Daftar</NuxtLink>
    </p>
  </div>
</template>
