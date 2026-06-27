import { useBreakpoints as vueUseBreakpoints, useWindowSize } from '@vueuse/core'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const useAppBreakpoints = () => {
  const bp = vueUseBreakpoints(BREAKPOINTS)
  const { width, height } = useWindowSize()

  return {
    isMobile: bp.smaller('md'),
    isTablet: bp.between('md', 'lg'),
    isDesktop: bp.greaterOrEqual('lg'),
    isLargeDesktop: bp.greaterOrEqual('xl'),
    width,
    height,
    current: bp.current(),
  }
}
