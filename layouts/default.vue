<script setup lang="ts">
const { isDesktop } = useAppBreakpoints()
const auth = useAuthStore()
const invitations = useInvitationsStore()

onMounted(async () => {
  if (auth.token && !auth.user) {
    await auth.fetchMe()
  }
  if (auth.isAuthenticated) {
    invitations.fetchInbox()
  }
})
</script>

<template>
  <div class="relative h-screen flex flex-col md:flex-row">
    <AppSidebar v-if="isDesktop" />

    <div class="flex-1 flex h-full overflow-hidden flex-col min-w-0">
      <AppTopbar v-if="isDesktop" />
      <MobileHeader v-else />

      <main class="flex-1 overflow-hidden min-h-0 grid-paper">
        <div
          :class="[
            'h-full px-4 py-5 md:px-6 md:py-6 overflow-y-auto',
            !isDesktop && 'pb-24',
          ]"
        >
          <slot />
        </div>
      </main>
    </div>

    <MobileBottomNav v-if="!isDesktop" />
    <BToastHost />
  </div>
</template>
