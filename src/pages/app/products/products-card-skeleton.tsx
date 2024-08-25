import { Link } from 'react-router-dom'

import { Skeleton } from '@/components/skeleton'

export function ProductsCardSkeleton() {
  return (
    <Link
      to="/products/1"
      className="block w-full rounded-2.5xl border-2 border-white bg-white p-1"
    >
      <Skeleton className="h-[144px] w-full rounded-2xl object-cover" />

      <div className="mt-1 px-3 pb-4">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-4 w-20" />
        </div>

        <Skeleton className="h-12 w-full" />
      </div>
    </Link>
  )
}
