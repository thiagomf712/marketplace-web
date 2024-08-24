import { forwardRef, InputHTMLAttributes, useId } from 'react'

import { AlertCircleIcon, ImageUploadIcon } from '@/assets/icons/huge-icons'
import { twMergeApp } from '@/config/twMerge'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  file?: FileList
  size?: 'sm' | 'lg'
}

const FileUploadInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, size = 'sm', className, file, ...props }: InputProps,
    ref,
  ) => {
    const id = useId()

    let fileUrl = ''

    if (file != null) {
      try {
        fileUrl = URL.createObjectURL(file[0])
      } catch {}
    }

    return (
      <div>
        <label
          htmlFor={id}
          className={twMergeApp(
            'group relative flex items-center justify-center overflow-hidden rounded-xl bg-shape',
            size === 'sm' && 'size-30',
            size === 'lg' && 'h-[340px] w-[415px]',
            className,
          )}
        >
          <div className="absolute inset-0 z-10 hidden bg-[rgba(0,0,0,0.6)] group-hover:block" />

          {fileUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={fileUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div
            className={twMergeApp(
              'z-20 flex max-w-[160px] flex-col items-center gap-4',
              fileUrl !== '' && 'sr-only group-hover:not-sr-only',
            )}
          >
            <ImageUploadIcon
              className={twMergeApp(
                'text-orange-base group-hover:text-white',
                size === 'sm' && 'size-8',
                size === 'lg' && 'size-10',
              )}
            />

            {label != null ? (
              <p className="text-center text-body-sm text-gray-300 group-hover:text-white">
                {label}
              </p>
            ) : (
              <span className="sr-only">Fazer upload de uma imagem</span>
            )}
          </div>

          <input ref={ref} id={id} type="file" className="hidden" {...props} />
        </label>

        {error && (
          <div className="mt-1.5 flex items-center justify-start gap-1">
            <AlertCircleIcon className="size-4 text-danger" />

            <p className="text-body-xs text-danger" role="alert">
              {error}
            </p>
          </div>
        )}
      </div>
    )
  },
)
FileUploadInput.displayName = 'FileUploadInput'

export { FileUploadInput }
