import { api } from '@/lib/axios'

export interface MetricsViewsReceivedResponse {
  amount: number
}

export async function apiGetMetricsViewsReceived() {
  const response = await api.get<MetricsViewsReceivedResponse>(
    '/sellers/metrics/views',
  )

  return response.data
}
