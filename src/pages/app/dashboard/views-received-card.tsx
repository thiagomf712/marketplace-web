import { useQuery } from '@tanstack/react-query'

import { apiGetMetricsViewsReceived } from '@/api/metrics-views-received'
import { UserMultipleIcon } from '@/assets/icons/huge-icons'
import { Skeleton } from '@/components/skeleton'

export function ViewsReceivedCard() {
  const { data: viewsReceived } = useQuery({
    queryKey: ['metrics-views-received'],
    queryFn: () => apiGetMetricsViewsReceived(),
  })

  return (
    <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
      <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
        <UserMultipleIcon className="size-10 text-gray-300" />
      </div>

      <div>
        {viewsReceived ? (
          <p className="mb-2 font-bold text-title-lg text-gray-400">
            {viewsReceived.amount}
          </p>
        ) : (
          <Skeleton className="mb-2 h-7 w-14" />
        )}

        <h3 className="text-body-xs text-gray-300">Pessoas visitantes</h3>
      </div>
    </div>
  )
}
