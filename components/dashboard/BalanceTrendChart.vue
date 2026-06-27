<script setup lang="ts">
import { Line } from 'vue-chartjs'

interface Props {
  data: Array<{ date: string; income: number; expense: number }>
}
const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.data.map(d => d.date.slice(5)),
  datasets: [
    {
      label: 'Pemasukan',
      data: props.data.map(d => d.income),
      borderColor: '#7A8450',
      backgroundColor: 'rgba(122,132,80,0.18)',
      borderWidth: 3,
      tension: 0.3,
      pointBackgroundColor: '#7A8450',
      pointBorderColor: '#1A1814',
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: true,
    },
    {
      label: 'Pengeluaran',
      data: props.data.map(d => d.expense),
      borderColor: '#C75B12',
      backgroundColor: 'rgba(199,91,18,0.15)',
      borderWidth: 3,
      tension: 0.3,
      pointBackgroundColor: '#C75B12',
      pointBorderColor: '#1A1814',
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: { family: 'Space Mono', size: 11, weight: 700 },
        color: '#1A1814',
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#1A1814',
      titleFont: { family: 'Archivo Black' },
      bodyFont: { family: 'Space Mono' },
      borderColor: '#1A1814',
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(26,24,20,0.08)' },
      ticks: { font: { family: 'Space Mono', size: 10 }, color: '#4A4540' },
    },
    y: {
      grid: { color: 'rgba(26,24,20,0.08)' },
      ticks: {
        font: { family: 'Space Mono', size: 10 },
        color: '#4A4540',
        callback: (v: any) => 'Rp' + Number(v).toLocaleString('id-ID'),
      },
    },
  },
}
</script>

<template>
  <BCard tone="bone">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-display uppercase text-base tracking-tight">Tren Keuangan 30 Hari</h3>
      <BBadge tone="ink">Live</BBadge>
    </div>
    <div class="h-64">
      <ClientOnly>
        <Line :data="chartData" :options="chartOptions" />
      </ClientOnly>
    </div>
  </BCard>
</template>
