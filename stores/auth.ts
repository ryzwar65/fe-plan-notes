import { defineStore } from 'pinia'
import type { User, AuthSession } from '~/types'
import type { LoginInput, RegisterInput } from '~/utils/schemas'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie<string | null>('auth_token', { default: () => null, maxAge: 60 * 60 * 24 * 7 })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const api = () => useApi()

  const login = async (input: LoginInput) => {
    loading.value = true
    error.value = null
    try {
      const res = await api().post<AuthSession>('/auth/login', input)
      token.value = res.token
      user.value = res.user
      return res
    } catch (e: any) {
      error.value = e?.data?.error || e?.data?.message || 'Gagal login'
      throw e
    } finally {
      loading.value = false
    }
  }

  const register = async (input: RegisterInput) => {
    loading.value = true
    error.value = null
    try {
      const res = await api().post<AuthSession>('/auth/register', input)
      token.value = res.token
      user.value = res.user
      return res
    } catch (e: any) {
      error.value = e?.data?.error || e?.data?.message || 'Gagal mendaftar'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchMe = async () => {
    if (!token.value) return null
    try {
      const res = await api().get<User>('/auth/me')
      user.value = res
      return res
    } catch {
      token.value = null
      user.value = null
      return null
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/auth/login')
  }

  return { user, token, loading, error, isAuthenticated, login, register, fetchMe, logout }
})
