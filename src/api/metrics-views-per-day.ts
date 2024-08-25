import { api } from '@/lib/axios'

export interface MetricsViewsPerDayResponse {
  viewsPerDay: Array<{
    date: string
    amount: number
  }>
}

export async function apiGetMetricsViewsPerDay() {
  const response = await api.get<MetricsViewsPerDayResponse>(
    '/sellers/metrics/views/days',
  )

  return response.data
}
