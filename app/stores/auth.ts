import { defineStore } from 'pinia'
import type { User, AuthResponse, LoginCredentials, RegisterCredentials } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isLoading = computed(() => loading.value)
  // Actions
  const setAuth = (authData: AuthResponse) => {
    user.value = authData.user
    token.value = authData.token
    // Save to localStorage
    if (process.client) {
      localStorage.setItem('auth-token', authData.token)
      localStorage.setItem('auth-user', JSON.stringify(authData.user))
    }
  }
  const clearAuth = () => {
    user.value = null
    token.value = null
    error.value = null
    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
    }
  }
  
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<AuthResponse>('/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: credentials
      })
      setAuth(response)
      // Redirect to dashboard or intended page
      await router.push('/dashboard')
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const register = async (credentials: RegisterCredentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<AuthResponse>('/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: credentials
      })
      setAuth(response)
      await router.push('/dashboard')
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }
  const logout = async () => {
    loading.value = true

    try {
      if (token.value) {
        await $fetch('/logout', {
          baseURL: config.public.apiBase,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
          } as HeadersInit
        })
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearAuth()
      loading.value = false
      await router.push('/login')
    }
  }
  const fetchUser = async () => {
    if (!token.value) return
    loading.value = true
    try {
      const userData = await $fetch<User>('/auth/me', {
        baseURL: config.public.apiBase,
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        } as HeadersInit
      })
      user.value = userData
      if (process.client) {
        localStorage.setItem('auth-user', JSON.stringify(userData))
      }
    } catch (err: any) {
      if (err.status === 401) {
        clearAuth()
        await router.push('/login')
      }
      throw err
    } finally {
      loading.value = false
    }
  }
  const initAuth = async () => {
    if (!process.client) return
    const savedToken = localStorage.getItem('auth-token')
    const savedUser = localStorage.getItem('auth-user')
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      // Verify token is still valid
      try {
        await fetchUser()
      } catch (err) {
        clearAuth()
      }
    }
  }
  return {
    // State
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    error: readonly(error),
    // Getters
    isAuthenticated,
    isLoading,
    // Actions
    login,
    register,
    logout,
    fetchUser,
    initAuth,
    clearAuth
  }
})