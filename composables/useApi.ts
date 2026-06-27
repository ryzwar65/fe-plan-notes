import type { FetchOptions } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('auth_token', { default: () => null })

  const baseURL = config.public.apiBase

  const apiFetch = async <T = unknown>(
    path: string,
    options: FetchOptions = {},
  ): Promise<T> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    if (authToken.value) {
      headers.Authorization = `Bearer ${authToken.value}`
    }

    return await $fetch<T>(path, {
      baseURL,
      ...options,
      headers,
    }) as T
  }

  return {
    get: <T>(path: string, opts?: FetchOptions) => apiFetch<T>(path, { ...opts, method: 'GET' }),
    post: <T>(path: string, body?: unknown, opts?: FetchOptions) =>
      apiFetch<T>(path, { ...opts, method: 'POST', body }),
    patch: <T>(path: string, body?: unknown, opts?: FetchOptions) =>
      apiFetch<T>(path, { ...opts, method: 'PATCH', body }),
    del: <T>(path: string, opts?: FetchOptions) => apiFetch<T>(path, { ...opts, method: 'DELETE' }),
  }
}
