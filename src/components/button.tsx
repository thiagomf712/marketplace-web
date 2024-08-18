import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { twMergeApp, twMergeConfig } from '@/config/twMerge'

const buttonVariants = tv(
  {
    base: 'flex items-center justify-center gap-3 rounded-[10px] transition-colors duration-200 font-medium',
    variants: {
      variant: {
        primary: twMergeApp(
          'bg-orange-base hover:bg-orange-dark text-white',
          '[&>svg]:text-white',
        ),
        outline: twMergeApp(
          'border border-orange-base text-orange-base hover:text-orange-dark hover:border-orange-base',
          '[&>svg]:text-orange-base [&>svg]:hover:text-orange-dark',
        ),
      },
      size: {
        md: twMergeApp('px-5 py-4 text-action-md', '[&>svg]:size-5'),
        sm: twMergeApp('px-4 py-2.5 text-action-sm', '[&>svg]:size-4'),
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
  {
    twMergeConfig,
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  BeforeIcon?: React.FC<React.SVGProps<SVGSVGElement>>
  AfterIcon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
