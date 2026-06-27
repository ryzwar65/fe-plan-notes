<script setup lang="ts">
import { Plus, Filter } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const plans = usePlansStore()
const { isDesktop } = useAppBreakpoints()
const showForm = ref(false)
const typeFilter = ref<string>('')

await useAsyncData('plans-list', async () => {
  await plans.fetchAll()
  return true
})

const filtered = computed(() =>
  typeFilter.value ? plans.list.filter(p => p.type === typeFilter.value) : plans.list
)

const typeFilters = [
  { label: 'Semua', value: '' },
  { label: 'Tabungan', value: 'saving' },
  { label: 'Cicilan', value: 'installment' },
  { label: 'Pengeluaran', value: 'expense' },
]
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-1">/plans</p>
        <h1 class="font-display uppercase text-3xl tracking-tight">Semua Plan</h1>
        <p class="font-body text-sm text-[var(--color-ink-soft)] mt-1">{{ filtered.length }} plan aktif</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="f in typeFilters"
          :key="f.value"
          :class="[
            'px-3 py-1.5 border-brutal font-mono text-xs uppercase tracking-wider brutal-press shadow-brutal-sm',
            typeFilter === f.value ? 'bg-[var(--color-ink)] text-[var(--color-cream)]' : 'bg-[var(--color-bone)]',
          ]"
          @click="typeFilter = f.value"
        >
          {{ f.label }}
        </button>
        <BButton variant="mustard" @click="showForm = true">
          <Plus class="w-4 h-4" />
          Plan Baru
        </BButton>
      </div>
    </div>

    <div
      :class="[
        'grid gap-4',
        isDesktop ? 'grid-cols-3' : 'grid-cols-1',
      ]"
    >
      <PlanCard v-for="plan in filtered" :key="plan.id" :plan="plan" />
    </div>

    <PlanFormModal v-model="showForm" />
  </div>
</template>
