import { api } from '@/lib/axios'

export async function apiSignOut() {
  return await api.post('/sign-out')
}
