import axios from 'axios'

import { AUTH_TOKEN_KEY } from '@/consts/localKeys'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
