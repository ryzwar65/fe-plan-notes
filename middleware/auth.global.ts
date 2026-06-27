export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')
  const isAuthRoute = to.path.startsWith('/auth')

  if (!token.value && !isAuthRoute) {
    return navigateTo('/auth/login')
  }
  if (token.value && isAuthRoute) {
    return navigateTo('/')
  }
})
