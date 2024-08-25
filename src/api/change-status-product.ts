import { api } from '@/lib/axios'

import { Product, ProductStatus } from './get-products-seller'

export interface ChangeStatusProductBody {
  id: string
  status: ProductStatus
}

export interface ChangeStatusProductResponse {
  product: Product
}

export async function apiChangeStatusProduct({
  id,
  status,
}: ChangeStatusProductBody) {
  const response = await api.patch<ChangeStatusProductResponse>(
    `/products/${id}/${status}`,
  )

  return response.data.product
}
