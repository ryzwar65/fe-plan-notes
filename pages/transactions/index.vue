<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const transactions = useTransactionsStore()
const showForm = ref(false)

await useAsyncData('transactions-list', async () => {
  await transactions.fetchAll()
  return true
})

const filters = computed({
  get: () => transactions.filters,
  set: (v) => transactions.setFilters(v),
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-1">/transactions</p>
        <h1 class="font-display uppercase text-3xl tracking-tight">Catatan Keuangan</h1>
        <p class="font-body text-sm text-[var(--color-ink-soft)] mt-1">
          {{ transactions.filtered.length }} transaksi
        </p>
      </div>
      <BButton variant="mustard" @click="showForm = true">
        <Plus class="w-4 h-4" /> Catat Transaksi
      </BButton>
    </div>

    <TransactionFilterBar v-model="filters" />
    <TransactionTable :items="transactions.filtered" />

    <TransactionFormModal v-model="showForm" />
  </div>
</template>
