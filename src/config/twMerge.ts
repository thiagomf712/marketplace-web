import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        'text-title-lg',
        'text-title-md',
        'text-title-sm',
        'text-subtitle',
        'text-body-md',
        'text-body-sm',
        'text-body-xs',
        'text-label-md',
        'text-label-sm',
        'text-action-md',
        'text-action-sm',
      ],
    },
  },
}

export const twMergeApp = extendTailwindMerge(twMergeConfig)
