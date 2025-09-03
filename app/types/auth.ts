export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
  expires_in?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}