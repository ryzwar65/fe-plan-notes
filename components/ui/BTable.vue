<script setup lang="ts" generic="T extends Record<string, any>">
interface Column<R> {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
  width?: string
  render?: (row: R) => string | number
}

interface Props {
  rows: T[]
  columns: Column<T>[]
  empty?: string
}
defineProps<Props>()
defineSlots<{
  cell(props: { row: T; column: Column<T> }): any
  empty(): any
  footer(): any
}>()
</script>

<template>
  <div class="w-full border-brutal bg-[var(--color-paper)] shadow-brutal-sm">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align || 'left', width: col.width }"
              class="px-3 py-2.5 font-display uppercase text-xs tracking-wider"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!rows.length">
            <td :colspan="columns.length" class="px-3 py-8 text-center font-mono text-sm text-[var(--color-ink-soft)]">
              <slot name="empty">{{ empty || 'Belum ada data' }}</slot>
            </td>
          </tr>
          <tr
            v-for="(row, i) in rows"
            :key="i"
            class="border-t border-[var(--color-ink)]/20 hover:bg-[var(--color-cream)]/60"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align || 'left' }"
              class="px-3 py-2.5 text-sm"
            >
              <slot name="cell" :row="row" :column="col">
                {{ col.render ? col.render(row) : row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="footer" />
  </div>
</template>
