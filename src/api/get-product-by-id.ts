import { api } from '@/lib/axios'

import { Product } from './get-products-seller'

export interface ProductResponse {
  product: Product
}

export async function apiGetProductById(productId: string) {
  const response = await api.get<ProductResponse>(`/products/${productId}`)

  return response.data.product
}
