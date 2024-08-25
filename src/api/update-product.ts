import { api } from '@/lib/axios'

import { Product } from './get-products-seller'

export interface ProductBody {
  productId: string
  title: string
  description: string
  priceInCents: number
  categoryId: string
  attachmentsIds: string[]
}

export interface UpdateProductResponse {
  product: Product
}

export async function apiUpdateProduct({ productId, ...data }: ProductBody) {
  const response = await api.put<UpdateProductResponse>(
    `/products/${productId}`,
    data,
  )

  return response.data.product
}
