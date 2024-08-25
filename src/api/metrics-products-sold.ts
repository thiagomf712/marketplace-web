import { api } from '@/lib/axios'

export interface MetricsProductsSoldResponse {
  amount: number
}

export async function apiGetMetricsProductsSold() {
  const response = await api.get<MetricsProductsSoldResponse>(
    '/sellers/metrics/products/sold',
  )

  return response.data
}
