<script setup lang="ts">
import { ArrowLeft, Pencil, Trash2, Plus } from 'lucide-vue-next'
import { formatIDR, formatPercent, formatDate } from '~/utils/format'
import { planTypeLabel, planTypeColor } from '~/utils/plan-helpers'

definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const plans = usePlansStore()
const transactions = useTransactionsStore()
const toast = useToast()
const { isDesktop } = useAppBreakpoints()

const id = computed(() => route.params.id as string)
const tab = ref<'overview' | 'transactions' | 'members'>('overview')
const showEdit = ref(false)
const showTxn = ref(false)

await useAsyncData(`plan-${id.value}`, async () => {
  await Promise.all([
    plans.fetchOne(id.value),
    plans.fetchMembers(id.value),
    transactions.fetchAll(),
  ])
  return true
})

const plan = computed(() => plans.current)

const planTransactions = computed(() =>
  transactions.list.filter(t => t.planId === id.value)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
)

const deletePlan = async () => {
  if (!confirm('Hapus plan ini?')) return
  await plans.remove(id.value)
  toast.success('Plan dihapus')
  router.push('/plans')
}
</script>

<template>
  <div v-if="plan" class="space-y-5">
    <NuxtLink to="/plans" class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
      <ArrowLeft class="w-3 h-3" /> Kembali ke Plans
    </NuxtLink>

    <BCard :tone="planTypeColor(plan.type) as any" :padded="false">
      <div class="px-5 py-5 md:px-6 md:py-6 flex flex-col md:flex-row md:items-center gap-5">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <BBadge :tone="planTypeColor(plan.type) as any">{{ planTypeLabel(plan.type) }}</BBadge>
            <BBadge tone="ink">{{ plan.status }}</BBadge>
          </div>
          <h1 class="font-display uppercase text-3xl md:text-4xl leading-tight tracking-tight">{{ plan.name }}</h1>
          <p v-if="plan.description" class="font-body text-sm text-[var(--color-ink-soft)] mt-1">{{ plan.description }}</p>
        </div>
        <div class="flex gap-2">
          <BButton variant="secondary" size="sm" @click="showEdit = true">
            <Pencil class="w-3 h-3" /> Edit
          </BButton>
          <BButton variant="danger" size="sm" @click="deletePlan">
            <Trash2 class="w-3 h-3" /> Hapus
          </BButton>
        </div>
      </div>
      <div class="px-5 md:px-6 pb-5 md:pb-6">
        <div class="flex justify-between font-mono text-sm mb-2">
          <span>{{ formatIDR(plan.currentAmount) }}</span>
          <span class="text-[var(--color-ink-soft)]">target {{ formatIDR(plan.targetAmount) }}</span>
        </div>
        <BProgress
          :value="formatPercent(plan.currentAmount, plan.targetAmount)"
          :tone="planTypeColor(plan.type) as any"
          size="lg"
          show-label
        />
        <p v-if="plan.dueDate" class="font-mono text-xs mt-2 text-[var(--color-ink-soft)]">
          Jatuh tempo: {{ formatDate(plan.dueDate, 'long') }}
        </p>
      </div>
    </BCard>

    <div class="flex border-brutal bg-[var(--color-bone)] shadow-brutal-sm overflow-x-auto">
      <button
        v-for="t in [['overview','Overview'],['transactions','Transaksi'],['members','Members']]"
        :key="t[0]"
        :class="[
          'px-5 py-3 font-display uppercase text-sm tracking-wide border-r-2 border-[var(--color-ink)] last:border-r-0 flex-1 md:flex-none',
          tab === t[0] ? 'bg-[var(--color-mustard)]' : 'hover:bg-[var(--color-cream)]',
        ]"
        @click="tab = t[0] as any"
      >
        {{ t[1] }}
      </button>
    </div>

    <div v-if="tab === 'overview'" :class="['grid gap-4', isDesktop ? 'grid-cols-3' : 'grid-cols-1']">
      <BCard tone="mustard">
        <p class="font-mono uppercase text-xs tracking-wider mb-2">Terkumpul</p>
        <p class="font-display text-3xl">{{ formatIDR(plan.currentAmount, { compact: true }) }}</p>
      </BCard>
      <BCard tone="olive">
        <p class="font-mono uppercase text-xs tracking-wider mb-2">Sisa</p>
        <p class="font-display text-3xl">{{ formatIDR(Math.max(0, plan.targetAmount - plan.currentAmount), { compact: true }) }}</p>
      </BCard>
      <BCard tone="dusty">
        <p class="font-mono uppercase text-xs tracking-wider mb-2">Member</p>
        <p class="font-display text-3xl">{{ plans.members.length }}</p>
      </BCard>
    </div>

    <div v-if="tab === 'transactions'" class="space-y-4">
      <div class="flex justify-end">
        <BButton variant="mustard" @click="showTxn = true">
          <Plus class="w-4 h-4" /> Catat Transaksi
        </BButton>
      </div>
      <TransactionTable :items="planTransactions" />
    </div>

    <div v-if="tab === 'members'" class="space-y-4">
      <InviteMemberForm :plan-id="plan.id" />
      <PlanMembersList :members="plans.members" />
    </div>

    <PlanFormModal v-model="showEdit" :plan="plan" />
    <TransactionFormModal v-model="showTxn" :default-plan-id="plan.id" />
  </div>
</template>
