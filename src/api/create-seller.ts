import { api } from '@/lib/axios'

export interface CreateSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

export interface CreateSellerResponse {
  id: string
  name: string
  phone: string
  email: string
  avatar: {
    id: string
    url: string
  }
}

export async function apiCreateSeller({
  avatarId,
  email,
  name,
  password,
  passwordConfirmation,
  phone,
}: CreateSellerBody) {
  return await api.post<CreateSellerResponse>('/sellers', {
    avatarId,
    email,
    name,
    password,
    passwordConfirmation,
    phone,
  })
}
