import type { PlanType } from '~/types'

export const planTypeLabel = (type: PlanType): string => {
  const labels: Record<PlanType, string> = {
    saving: 'Tabungan',
    installment: 'Cicilan',
    expense: 'Pengeluaran',
  }
  return labels[type]
}

export const planTypeColor = (type: PlanType): string => {
  const colors: Record<PlanType, string> = {
    saving: 'mustard',
    installment: 'terracotta',
    expense: 'olive',
  }
  return colors[type]
}

export const transactionTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    income: 'Pemasukan',
    expense: 'Pengeluaran',
    saving_in: 'Setor Tabungan',
    saving_out: 'Tarik Tabungan',
    installment_payment: 'Bayar Cicilan',
  }
  return labels[type] || type
}

export const transactionTypeSign = (type: string): 1 | -1 => {
  return type === 'income' || type === 'saving_in' ? 1 : -1
}

export const allowedTransactionTypesForPlan = (planType?: PlanType): string[] => {
  if (planType === 'saving') return ['saving_in', 'saving_out']
  if (planType === 'installment') return ['installment_payment']
  if (planType === 'expense') return ['expense']
  return ['income', 'expense']
}
