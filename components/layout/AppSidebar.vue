<script setup lang="ts">
import {
  LayoutDashboard, Wallet, ArrowLeftRight, Users, MailOpen, UserCircle, LogOut,
} from 'lucide-vue-next'

const auth = useAuthStore()
const invitations = useInvitationsStore()

const nav = computed(() => [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/plans', label: 'Plans', icon: Wallet },
  { to: '/transactions', label: 'Transaksi', icon: ArrowLeftRight },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/invitations', label: 'Undangan', icon: MailOpen, badge: invitations.pendingCount },
  { to: '/profile', label: 'Profil', icon: UserCircle },
])
</script>

<template>
  <aside class="w-64 shrink-0 h-full justify-between border-r-2 border-b-2 border-[var(--color-ink)] bg-[var(--color-bone)] flex flex-col">
    <div class="px-5 py-5 border-b-2 border-[var(--color-ink)] bg-[var(--color-olive-soft)]">
      <div class="font-display text-2xl uppercase tracking-tight leading-none">Plan<br />Notes</div>
      <p class="font-mono text-[10px] uppercase tracking-widest mt-2 text-[var(--color-ink-soft)]">Finance brutalism</p>
    </div>

    <nav class="flex-1 p-3 flex flex-col gap-1.5">
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 border-2 border-transparent font-display uppercase text-sm tracking-wide brutal-press"
        active-class="border-[var(--color-ink)] bg-[var(--color-mustard)] shadow-brutal-sm"
      >
        <component :is="item.icon" class="w-4 h-4 shrink-0" />
        <span class="flex-1">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-mono bg-[var(--color-terracotta)] text-[var(--color-bone)] border border-[var(--color-ink)]"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </nav>

    <div class="p-3 border-t-2 border-[var(--color-ink)]">
      <button
        class="w-full flex items-center gap-2 px-3 py-2 font-display uppercase text-sm border-brutal bg-[var(--color-cream)] brutal-press shadow-brutal-sm"
        @click="auth.logout"
      >
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>
  </aside>
</template>
