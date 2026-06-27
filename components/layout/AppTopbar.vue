<script setup lang="ts">
import { Search, Bell, Settings } from 'lucide-vue-next'

const auth = useAuthStore()
const search = ref('')
</script>

<template>
  <header class="border-b-2 border-[var(--color-ink)] bg-[var(--color-bone)]">
    <div class="flex items-center gap-4 px-5 py-3">
      <div class="flex-1 max-w-2xl relative">
        <!-- <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]" />
        <input
          v-model="search"
          type="text"
          placeholder="Cari plan, transaksi, atau member..."
          class="w-full pl-9 pr-3 py-2 border-brutal bg-[var(--color-paper)] font-body outline-none focus:shadow-brutal-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition"
        /> -->
      </div>
      <div class="flex space-x-3">
        <button class="w-10 h-10 border-brutal bg-[var(--color-bone)] flex items-center justify-center brutal-press shadow-brutal-sm">
            <Settings class="w-4 h-4" />
        </button>
        <button class="w-10 h-10 border-brutal bg-[var(--color-bone)] flex items-center justify-center brutal-press shadow-brutal-sm relative">
            <Bell class="w-4 h-4" />
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-terracotta)] border border-[var(--color-ink)] rounded-full" />
        </button>
        <NuxtLink to="/profile" class="flex items-center gap-2">
            <BAvatar :name="auth.user?.name || 'Guest'" :src="auth.user?.avatarUrl" size="md" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
