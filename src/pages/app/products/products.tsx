import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { apiGetSellerProducts, ProductStatus } from '@/api/get-products-seller'

import { ProductsCard } from './products-card'
import { ProductsCardSkeleton } from './products-card-skeleton'
import { ProductsFilter } from './products-filter'

export function ProductsPage() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['orders', search, status],
    queryFn: () =>
      apiGetSellerProducts({
        search: search || undefined,
        status: status === 'all' ? undefined : (status as ProductStatus),
      }),
  })

  return (
    <main>
      <header className="mb-10">
        <h2 className="mb-2 font-bold text-title-md text-gray-500">
          Seus produtos
        </h2>

        <p className="text-body-sm text-gray-300">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </header>

      <div className="relative grid grid-cols-[330px_1fr] items-start gap-6">
        <div className="sticky top-4 rounded-2.5xl bg-white p-6">
          <ProductsFilter />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {isLoadingProducts &&
            Array.from({ length: 6 }).map((_, index) => (
              <ProductsCardSkeleton key={index} />
            ))}

          {products &&
            products.map((product) => (
              <ProductsCard
                key={product.id}
                product={{
                  ...product,
                  category: product.category.title,
                  img: product.attachments[0].url,
                  value: product.priceInCents,
                }}
              />
            ))}
        </div>
      </div>
    </main>
  )
}
