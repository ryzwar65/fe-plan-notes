<script setup lang="ts">
import type { Transaction } from '~/types'
import { formatIDR, formatDate } from '~/utils/format'
import { transactionTypeLabel, transactionTypeSign } from '~/utils/plan-helpers'

interface Props { items: Transaction[] }
const props = defineProps<Props>()

const toneByType = (type: string) => ({
  income: 'olive', expense: 'terracotta', saving_in: 'mustard', saving_out: 'dusty', installment_payment: 'teal',
}[type] || 'ink')

const columns = [
  { key: 'occurredAt', label: 'Tanggal' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'planName', label: 'Plan' },
  { key: 'type', label: 'Tipe' },
  { key: 'amount', label: 'Nominal', align: 'right' as const },
]

const source = computed(() => props.items)
const { page, total, totalPages, paginated, from, to, setPage } = usePagination(source)
</script>

<template>
  <BTable :columns="columns" :rows="paginated" empty="Belum ada transaksi">
    <template #cell="{ row, column }">
      <template v-if="column.key === 'occurredAt'">
        <span class="font-mono text-xs uppercase">{{ formatDate(row.occurredAt) }}</span>
      </template>
      <template v-else-if="column.key === 'planName'">
        <span class="font-mono text-xs">{{ row.planName || '—' }}</span>
      </template>
      <template v-else-if="column.key === 'type'">
        <BBadge :tone="toneByType(row.type) as any">{{ transactionTypeLabel(row.type) }}</BBadge>
      </template>
      <template v-else-if="column.key === 'amount'">
        <span :class="['font-mono font-bold', transactionTypeSign(row.type) > 0 ? 'text-[var(--color-olive)]' : 'text-[var(--color-terracotta)]']">
          {{ transactionTypeSign(row.type) > 0 ? '+' : '-' }}{{ formatIDR(row.amount) }}
        </span>
      </template>
      <template v-else>{{ row[column.key] }}</template>
    </template>

    <template #footer>
      <BPagination
        :page="page"
        :total-pages="totalPages"
        :from="from"
        :to="to"
        :total="total"
        @update:page="setPage"
      />
    </template>
  </BTable>
</template>
