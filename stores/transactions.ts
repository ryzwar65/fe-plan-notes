import { defineStore } from 'pinia'
import type { Transaction, TransactionFilters, TransactionSummary } from '~/types'
import type { TransactionInput } from '~/utils/schemas'
import { transactionTypeSign } from '~/utils/plan-helpers'

export const useTransactionsStore = defineStore('transactions', () => {
  const list = ref<Transaction[]>([])
  const summary = ref<TransactionSummary | null>(null)
  const filters = ref<TransactionFilters>({})
  const loading = ref(false)

  const api = () => useApi()

  const filtered = computed(() => {
    return list.value.filter(t => {
      if (filters.value.type && t.type !== filters.value.type) return false
      if (filters.value.planId && t.planId !== filters.value.planId) return false
      if (filters.value.search) {
        const q = filters.value.search.toLowerCase()
        if (!t.description.toLowerCase().includes(q)) return false
      }
      if (filters.value.from && t.occurredAt < filters.value.from) return false
      if (filters.value.to && t.occurredAt > filters.value.to) return false
      return true
    })
  })

  const recent = computed(() => [...list.value].sort((a, b) =>
    b.occurredAt.localeCompare(a.occurredAt)).slice(0, 5))

  const monthly = computed(() => {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const income = list.value
      .filter(t => t.occurredAt >= monthStart && t.type === 'income')
      .reduce((s, t) => s + t.amount, 0)
    const expense = list.value
      .filter(t => t.occurredAt >= monthStart && (t.type === 'expense' || t.type === 'installment_payment'))
      .reduce((s, t) => s + t.amount, 0)
    const balance = list.value.reduce((s, t) => s + transactionTypeSign(t.type) * t.amount, 0)
    return { income, expense, balance }
  })

  const fetchAll = async () => {
    loading.value = true
    try {
      list.value = await api().get<Transaction[]>('/transactions')
    } finally {
      loading.value = false
    }
  }

  const fetchSummary = async () => {
    summary.value = await api().get<TransactionSummary>('/transactions/summary')
  }

  const create = async (input: TransactionInput) => {
    const txn = await api().post<Transaction>('/transactions', input)
    list.value.unshift(txn)
    return txn
  }

  const remove = async (id: string) => {
    await api().del(`/transactions/${id}`)
    list.value = list.value.filter(t => t.id !== id)
  }

  const setFilters = (f: TransactionFilters) => { filters.value = f }
  const resetFilters = () => { filters.value = {} }

  return {
    list, summary, filters, loading,
    filtered, recent, monthly,
    fetchAll, fetchSummary, create, remove, setFilters, resetFilters,
  }
})
