import { twMergeApp } from '@/config/twMerge'

const statusLabel = {
  advised: { color: 'bg-blue-dark', label: 'anunciado' },
  sold: { color: 'bg-success', label: 'vendido' },
  cancelled: { color: 'bg-gray-300', label: 'Desativado' },
} as const

export interface ProductStatusLabel {
  productStatus: keyof typeof statusLabel
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
