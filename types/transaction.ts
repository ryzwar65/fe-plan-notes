export type TransactionType =
  | 'income'
  | 'expense'
  | 'saving_in'
  | 'saving_out'
  | 'installment_payment'

export interface Transaction {
  id: string
  userId: string
  planId?: string | null
  planName?: string | null
  type: TransactionType
  amount: number
  description: string
  categoryId?: string | null
  occurredAt: string
  createdAt: string
}

export interface TransactionFilters {
  type?: TransactionType
  planId?: string
  from?: string
  to?: string
  search?: string
}

export interface TransactionSummary {
  income: number
  expense: number
  net: number
  byDay: Array<{ date: string; income: number; expense: number }>
}
