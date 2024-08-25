import { api } from '@/lib/axios'

export type ProductStatus = 'available' | 'sold' | 'cancelled'

export interface GetSellerProductsParams {
  status?: ProductStatus
  search?: string
}

export interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: [
    {
      id: string
      url: string
    },
  ]
}

export interface SellerProductResponse {
  products: Product[]
}

export async function apiGetSellerProducts(params: GetSellerProductsParams) {
  const response = await api.get<SellerProductResponse>('/products/me', {
    params,
  })

  return response.data.products
}
