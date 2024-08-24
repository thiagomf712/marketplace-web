import * as SelectPrimitive from '@radix-ui/react-select'
import { forwardRef, useId } from 'react'

import {
  AlertCircleIcon,
  ArrowDown01Icon,
  Tick02Icon,
} from '@/assets/icons/huge-icons'
import { twMergeApp } from '@/config/twMerge'

export interface SelectProps extends SelectPrimitive.SelectProps {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  label?: string
  error?: string
  placeholder?: string
  options: Array<{ label: string; value: string }>
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    { label, Icon, error, placeholder, options, ...props }: SelectProps,
    ref,
  ) => {
    const id = useId()

    return (
      <div className="group flex w-full flex-col-reverse">
        {error && (
          <div className="mt-1.5 flex items-center justify-start gap-1">
            <AlertCircleIcon className="size-4 text-danger" />

            <p className="text-body-xs text-danger" role="alert">
              {error}
            </p>
          </div>
        )}

        <SelectPrimitive.Root {...props}>
          <SelectPrimitive.Trigger
            id={id}
            ref={ref}
            className="group peer flex w-full items-center justify-start gap-2 border-b border-b-gray-100 px-0.5 py-3 text-gray-400 group-focus-within:border-b-gray-400 data-[placeholder]:text-gray-200"
          >
            {Icon && (
              <Icon
                className={twMergeApp(
                  'size-6 text-gray-200 group-data-[state=open]:text-orange-base',
                  error && 'text-danger',
                )}
              />
            )}

            <SelectPrimitive.Value placeholder={placeholder} />

            <SelectPrimitive.Icon asChild>
              <ArrowDown01Icon className="ml-auto size-6 text-gray-300" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={4}
              className="w-[--radix-select-trigger-width] overflow-hidden rounded-lg border border-shape bg-white py-2 shadow-md"
            >
              <SelectPrimitive.Viewport>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className="group flex items-center justify-between p-4 text-body-sm text-gray-300 hover:text-orange-dark data-[highlighted]:text-orange-dark data-[state=checked]:text-orange-base"
                  >
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>

                    <SelectPrimitive.ItemIndicator>
                      <Tick02Icon className="size-6 text-orange-base" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {label && (
          <label
            className="text-label-md font-medium uppercase text-gray-300 peer-data-[state=open]:text-orange-base"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
