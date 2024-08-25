import { ProductStatus } from '@/api/get-products-seller'
import { twMergeApp } from '@/config/twMerge'

const statusLabel: Record<ProductStatus, { color: string; label: string }> = {
  available: { color: 'bg-blue-dark', label: 'Anunciado' },
  sold: { color: 'bg-success', label: 'Vendido' },
  cancelled: { color: 'bg-gray-300', label: 'Desativado' },
}

export interface ProductStatusLabel {
  productStatus: ProductStatus
}

export function ProductStatusLabel({ productStatus }: ProductStatusLabel) {
  return (
    <span
      className={twMergeApp(
        'rounded-full px-2 py-1 text-label-sm font-medium uppercase text-white',
        statusLabel[productStatus].color,
      )}
    >
      {statusLabel[productStatus].label}
    </span>
  )
}
