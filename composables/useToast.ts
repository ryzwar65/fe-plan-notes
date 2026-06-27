export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const push = (message: string, type: Toast['type'] = 'info', duration = 3500) => {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, message, type, duration })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    success: (m: string) => push(m, 'success'),
    error: (m: string) => push(m, 'error'),
    info: (m: string) => push(m, 'info'),
    dismiss: (id: string) => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    },
  }
}
