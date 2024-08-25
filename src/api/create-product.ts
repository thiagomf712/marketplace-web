import { api } from '@/lib/axios'

import { Product } from './get-products-seller'

export interface CreateProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export interface CreateProductResponse {
  product: Product
}

export async function apiCreateProduct(product: CreateProductBody) {
  const response = await api.post<CreateProductResponse>('/products', product)

  return response.data.product
}
