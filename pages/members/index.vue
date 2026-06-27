<script setup lang="ts">
definePageMeta({ layout: 'default' })

const plans = usePlansStore()
const { isDesktop } = useAppBreakpoints()

const allMembers = ref<Array<{ planId: string; planName: string; members: any[] }>>([])
const loading = ref(false)

const loadAll = async () => {
  loading.value = true
  try {
    if (!plans.list.length) await plans.fetchAll()
    allMembers.value = []
    for (const p of plans.list) {
      await plans.fetchMembers(p.id)
      allMembers.value.push({ planId: p.id, planName: p.name, members: [...plans.members] })
    }
  } finally {
    loading.value = false
  }
  return true
}

await useAsyncData('members-all', loadAll)
</script>

<template>
  <div class="space-y-5">
    <div>
      <p class="font-mono uppercase text-[10px] tracking-widest text-[var(--color-ink-soft)] mb-1">/members</p>
      <h1 class="font-display uppercase text-3xl tracking-tight">Members</h1>
      <p class="font-body text-sm text-[var(--color-ink-soft)] mt-1">Semua kolaborator di tiap plan yang kamu ikuti.</p>
    </div>

    <div :class="['grid gap-4', isDesktop ? 'grid-cols-2' : 'grid-cols-1']">
      <BCard v-for="g in allMembers" :key="g.planId" tone="bone" :padded="false">
        <div class="px-4 py-3 border-b-2 border-[var(--color-ink)] flex items-center justify-between bg-[var(--color-mustard-soft)]">
          <NuxtLink :to="`/plans/${g.planId}`" class="font-display uppercase text-base tracking-tight hover:underline">
            {{ g.planName }}
          </NuxtLink>
          <BBadge tone="ink">{{ g.members.length }}</BBadge>
        </div>
        <div class="p-4">
          <PlanMembersList :members="g.members" />
        </div>
      </BCard>
    </div>
  </div>
</template>
