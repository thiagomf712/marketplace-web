import { api } from '@/lib/axios'

export interface SellerProfile {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar?: {
      id: string
      url: string
    }
  }
}

export async function apiGetSellerProfile() {
  const response = await api.get<SellerProfile>('/sellers/me')

  return response.data.seller
}
