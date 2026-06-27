<script setup lang="ts">
import { Bell } from 'lucide-vue-next'

const auth = useAuthStore()
</script>

<template>
  <header class="sticky top-0 z-30 bg-[var(--color-bone)] border-b-2 border-[var(--color-ink)]">
    <div class="flex items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="font-display text-xl uppercase tracking-tight">Plan/Notes</NuxtLink>
      <div class="flex items-center gap-2">
        <button class="w-9 h-9 border-brutal bg-[var(--color-bone)] flex items-center justify-center shadow-brutal-sm relative">
          <Bell class="w-4 h-4" />
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-terracotta)] border border-[var(--color-ink)] rounded-full" />
        </button>
        <NuxtLink to="/profile">
          <BAvatar :name="auth.user?.name || 'Guest'" :src="auth.user?.avatarUrl" size="sm" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
