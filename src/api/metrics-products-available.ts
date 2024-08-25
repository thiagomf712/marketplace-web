import { api } from '@/lib/axios'

export interface MetricsProductsAvailableResponse {
  amount: number
}

export async function apiGetMetricsProductsAvailable() {
  const response = await api.get<MetricsProductsAvailableResponse>(
    '/sellers/metrics/products/available',
  )

  return response.data
}
