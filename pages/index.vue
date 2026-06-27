<script setup lang="ts">
import { Wallet, TrendingDown, TrendingUp } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const plans = usePlansStore()
const transactions = useTransactionsStore()
const { isDesktop } = useAppBreakpoints()

await useAsyncData('dashboard', async () => {
  await Promise.all([
    plans.fetchAll(),
    transactions.fetchAll(),
    transactions.fetchSummary(),
  ])
  return true
})

const stats = computed(() => transactions.monthly)
const trendData = computed(() => transactions.summary?.byDay || [])
const topPlans = computed(() => plans.active.slice(0, 4))
</script>

<template>
  <div class="overflow-hidden space-y-5">
    <GreetingBanner />

    <div
      :class="[
        'grid gap-5',
        isDesktop ? 'grid-cols-12' : 'grid-cols-1',
      ]"
    >
      <div :class="isDesktop ? 'col-span-8 space-y-5' : 'space-y-5'">
        <div
          :class="[
            'grid gap-4',
            isDesktop ? 'grid-cols-3' : 'grid-cols-1',
          ]"
        >
          <StatCard
            label="Saldo Total"
            :amount="stats.balance"
            tone="dusty"
            delta="+10% minggu ini"
            :icon="Wallet"
            highlight
          />
          <StatCard
            label="Pemasukan Bulan Ini"
            :amount="stats.income"
            tone="olive"
            delta="bulan berjalan"
            :icon="TrendingUp"
          />
          <StatCard
            label="Pengeluaran Bulan Ini"
            :amount="stats.expense"
            tone="terracotta"
            delta="bulan berjalan"
            :icon="TrendingDown"
          />
        </div>

        <BalanceTrendChart :data="trendData" />

        <RecentTransactions :items="transactions.recent" />
      </div>

      <div :class="isDesktop ? 'col-span-4 space-y-5' : 'space-y-5'">
        <PlanProgressList :plans="topPlans" />
        <ScheduleCard :plans="plans.list" />
      </div>
    </div>
  </div>
</template>
