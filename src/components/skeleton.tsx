import { HTMLAttributes } from 'react'

import { twMergeApp } from '@/config/twMerge'

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMergeApp('animate-pulse rounded-md bg-gray-100', className)}
      {...props}
    />
  )
}
