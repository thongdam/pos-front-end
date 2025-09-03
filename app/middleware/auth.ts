export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})