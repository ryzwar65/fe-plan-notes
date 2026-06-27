<script setup lang="ts">
import { LayoutDashboard, Wallet, ArrowLeftRight, MailOpen, UserCircle } from 'lucide-vue-next'

const invitations = useInvitationsStore()

const nav = computed(() => [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/plans', label: 'Plans', icon: Wallet },
  { to: '/transactions', label: 'Trx', icon: ArrowLeftRight },
  { to: '/invitations', label: 'Inbox', icon: MailOpen, badge: invitations.pendingCount },
  { to: '/profile', label: 'Akun', icon: UserCircle },
])
</script>

<template>
  <nav class="fixed bottom-0 inset-x-0 z-40 bg-[var(--color-bone)] border-t-2 border-[var(--color-ink)]">
    <div class="grid grid-cols-5">
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center justify-center gap-1 py-2.5 relative"
        active-class="bg-[var(--color-mustard)]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-mono uppercase text-[10px] tracking-wider">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="absolute top-1 right-3 min-w-4 h-4 px-1 text-[9px] font-mono bg-[var(--color-terracotta)] text-[var(--color-bone)] border border-[var(--color-ink)] flex items-center justify-center"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>
