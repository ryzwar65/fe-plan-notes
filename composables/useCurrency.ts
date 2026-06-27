import { formatIDR } from '~/utils/format'

export const useCurrency = () => {
  return {
    format: formatIDR,
    parse: (input: string): number => {
      const cleaned = input.replace(/[^\d-]/g, '')
      const n = parseInt(cleaned, 10)
      return Number.isFinite(n) ? n : 0
    },
  }
}
