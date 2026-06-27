export function usePagination<T>(source: Ref<T[]>, perPage = 10) {
  const page = ref(1)

  const total = computed(() => source.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))
  const from = computed(() => total.value === 0 ? 0 : (page.value - 1) * perPage + 1)
  const to = computed(() => Math.min(page.value * perPage, total.value))

  const paginated = computed(() => {
    const start = (page.value - 1) * perPage
    return source.value.slice(start, start + perPage)
  })

  watch(source, () => { page.value = 1 })

  function setPage(n: number) {
    page.value = Math.max(1, Math.min(n, totalPages.value))
  }

  return { page, total, totalPages, paginated, from, to, setPage }
}
