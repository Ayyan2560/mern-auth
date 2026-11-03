import { createContext, useContext, useState, useEffect } from 'react'

import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://backend-six-azure-94.vercel.app/api')
).replace(/\/+$/, '')

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Automatically attach JWT token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check logged-in user
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    API.get('/auth/me')
      .then(res => {
        setUser(res.data.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      })

      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
      }

      setUser(res.data.user)
      toast.success(res.data.message)

      return res.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.'

      toast.error(message)
      throw error
    }
  }

  // Login
  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      })

      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)

      toast.success(res.data.message)

      return res.data
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.'

      toast.error(message)
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      await API.post('/auth/logout')
    } catch (error) {
      console.error('Logout request failed:', error.message)
    }

    localStorage.removeItem('token')
    setUser(null)

    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
