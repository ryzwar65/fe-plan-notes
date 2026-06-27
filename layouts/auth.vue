<script setup lang="ts">
const { isDesktop } = useAppBreakpoints()
</script>

<template>
  <div class="min-h-screen flex">
    <aside
      v-if="isDesktop"
      class="w-1/2 bg-[var(--color-mustard)] border-r-4 border-[var(--color-ink)] grid-paper relative overflow-hidden flex items-center justify-center p-10"
    >
      <div class="max-w-md">
        <p class="font-mono uppercase text-xs tracking-widest mb-4">// Plan Notes — Vintage Finance OS</p>
        <h1 class="font-display text-5xl xl:text-6xl leading-none uppercase mb-6">Catat. Atur.<br />Capai target.</h1>
        <p class="font-serif text-xl text-[var(--color-ink-soft)] mb-10">
          Kelola pemasukan, pengeluaran, dan plan keuangan bersama tim — semua dalam satu tempat brutal yang manis.
        </p>
        <div class="flex gap-3 flex-wrap">
          <BBadge tone="olive">tabungan</BBadge>
          <BBadge tone="terracotta">cicilan</BBadge>
          <BBadge tone="teal">kolaboratif</BBadge>
          <BBadge tone="dusty">retro</BBadge>
        </div>
      </div>
      <div class="absolute -bottom-8 -right-8 w-48 h-48 bg-[var(--color-terracotta)] border-brutal-thick rotate-12" />
      <div class="absolute top-8 right-12 w-24 h-24 bg-[var(--color-olive)] border-brutal-thick -rotate-6" />
    </aside>

    <main class="flex-1 flex items-center justify-center p-6 md:p-10 bg-[var(--color-cream)]">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>

    <BToastHost />
  </div>
</template>
