export const formatIDR = (n: number, opts: { compact?: boolean } = {}): string => {
  if (opts.compact && Math.abs(n) >= 1_000_000) {
    return `Rp ${(n / 1_000_000).toFixed(1)}jt`
  }
  if (opts.compact && Math.abs(n) >= 1_000) {
    return `Rp ${(n / 1_000).toFixed(0)}rb`
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export const formatDate = (input: string | Date, style: 'short' | 'long' | 'day' = 'short'): string => {
  const d = typeof input === 'string' ? new Date(input) : input
  if (style === 'long') {
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  }
  if (style === 'day') {
    return d.toLocaleDateString('id-ID', { weekday: 'short' })
  }
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const formatPercent = (value: number, target: number): number => {
  if (!target) return 0
  return Math.max(0, Math.min(100, Math.round((value / target) * 100)))
}

export const relativeTime = (input: string | Date): string => {
  const d = typeof input === 'string' ? new Date(input) : input
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`
  if (diff < 604800) return `${Math.floor(diff / 86400)}h lalu`
  return formatDate(d)
}

export const greetingByHour = (date: Date = new Date()): string => {
  const h = date.getHours()
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 19) return 'Selamat sore'
  return 'Selamat malam'
}
