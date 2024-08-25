import { Link } from 'react-router-dom'

import { ProductStatus } from '@/api/get-products-seller'
import { ProductStatusLabel } from '@/components/product-status-label'

export interface ProductsCardProps {
  product: {
    id: string
    img: string
    title: string
    value: number
    description: string
    category: string
    status: ProductStatus
  }
}

export function ProductsCard({ product }: ProductsCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="relative block w-full rounded-2.5xl border-2 border-white bg-white p-1 hover:border-2 hover:border-blue-base"
    >
      <img
        src={product.img}
        alt=""
        className="h-[144px] w-full rounded-2xl object-cover"
      />

      <div className="absolute right-2 top-2 flex items-center justify-end gap-1">
        <ProductStatusLabel productStatus={product.status} />

        <span className="rounded-full bg-gray-400 px-2 py-1 text-label-sm font-medium uppercase text-white">
          {product.category}
        </span>
      </div>

      <div className="mt-1 px-3 pb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-subtitle font-semibold text-gray-400">
            {product.title}
          </p>

          <p className="font-bold text-title-sm text-gray-500">
            {(product.value / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>

        <p className="line-clamp-2 text-body-sm text-gray-300">
          {product.description}
        </p>
      </div>
    </Link>
  )
}
