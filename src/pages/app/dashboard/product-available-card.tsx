import { useQuery } from '@tanstack/react-query'

import { apiGetMetricsProductsAvailable } from '@/api/metrics-products-available'
import { Store04Icon } from '@/assets/icons/huge-icons'
import { Skeleton } from '@/components/skeleton'

export function ProductAvailableCard() {
  const { data: productsAvailable } = useQuery({
    queryKey: ['metrics-products-available'],
    queryFn: () => apiGetMetricsProductsAvailable(),
  })

  return (
    <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
      <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
        <Store04Icon className="size-10 text-blue-dark" />
      </div>

      <div>
        {productsAvailable ? (
          <p className="mb-2 font-bold text-title-lg text-gray-400">
            {productsAvailable.amount}
          </p>
        ) : (
          <Skeleton className="mb-2 h-7 w-14" />
        )}

        <h3 className="text-body-xs text-gray-300">Produtos anunciados</h3>
      </div>
    </div>
  )
}
