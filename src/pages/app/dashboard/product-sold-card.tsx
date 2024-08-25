import { useQuery } from '@tanstack/react-query'

import { apiGetMetricsProductsSold } from '@/api/metrics-products-sold'
import { SaleTag02Icon } from '@/assets/icons/huge-icons'
import { Skeleton } from '@/components/skeleton'

export function ProductSoldCard() {
  const { data: productsSold } = useQuery({
    queryKey: ['metrics-products-sold'],
    queryFn: () => apiGetMetricsProductsSold(),
  })

  return (
    <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
      <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
        <SaleTag02Icon className="size-10 text-blue-dark" />
      </div>

      <div>
        {productsSold ? (
          <p className="mb-2 font-bold text-title-lg text-gray-400">
            {productsSold.amount}
          </p>
        ) : (
          <Skeleton className="mb-2 h-7 w-14" />
        )}

        <h3 className="text-body-xs text-gray-300">Produtos vendidos</h3>
      </div>
    </div>
  )
}
