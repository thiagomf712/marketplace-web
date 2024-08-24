import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/button'
import { FileUploadInput } from '@/components/file-upload'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

const newProductSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((file) => file[0] != null, { message: 'Campo obrigatório' })
    .refine(
      (file) => !file[0] || (!!file[0] && file[0].size <= 5 * 1024 * 1024),
      {
        message: 'O tamanho da imagem deve ser menor que 5MB',
      },
    )
    .refine(
      (file) => !file[0] || (!!file[0] && file[0].type?.startsWith('image')),
      {
        message: 'Somente imagens são permitidas',
      },
    ),
  title: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .transform((value) => value.replace(/\D/, ''))
    .refine((value) => value != null && !Number.isNaN(Number(value)), {
      message: 'Digite um valor válido',
    }),
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  category: z.string().min(1, { message: 'Campo obrigatório' }),
})

type NewProductSchema = z.infer<typeof newProductSchema>

const options: Array<{ label: string; value: string }> = [
  { label: 'Brinquedo', value: 'Brinquedo' },
  { label: 'Móvel', value: 'Móvel' },
  { label: 'Papelaria', value: 'Papelaria' },
  { label: 'Saúde & Beleza', value: 'Saúde & Beleza' },
  { label: 'Utensílio', value: 'Utensílio' },
  { label: 'Vestuário', value: 'Vestuário' },
]

export function NewProductPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema),
  })

  const imgFile = watch('image')

  function handleCreateProduct(data: NewProductSchema) {
    console.log(data)
  }

  return (
    <main>
      <header className="mb-10">
        <h2 className="mb-2 font-bold text-title-md text-gray-500">
          Novo produto
        </h2>

        <p className="text-body-sm text-gray-300">
          Cadastre um produto para venda no marketplace
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        className="grid grid-cols-[min-content_1fr] items-start gap-6"
      >
        <FileUploadInput
          error={errors.image?.message}
          previewFile={imgFile}
          accept="image/*"
          size="lg"
          {...register('image')}
          label="Selecione a imagem do produto"
        />

        <div className="rounded-2.5xl bg-white p-8">
          <h3 className="mb-8 font-bold text-title-sm text-gray-300">
            Dados do produto
          </h3>

          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <Input
                type="text"
                placeholder="Nome do produto"
                label="Título"
                error={errors.title?.message}
                {...register('title')}
              />
            </div>

            <div className="col-span-2">
              <Input
                type="text"
                placeholder="0,00"
                label="Valor"
                Prefix={<p className="text-gray-400">R$</p>}
                error={errors.value?.message}
                {...register('value')}
                onChange={(e) => {
                  const newValueNumber = Number(
                    e.target.value.replace(/\D/g, ''),
                  )

                  const newValueString = (newValueNumber / 100).toLocaleString(
                    'pt-BR',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )

                  e.target.value = newValueString
                  register('value').onChange(e)
                }}
              />
            </div>

            <div className="col-span-5">
              <Textarea
                error={errors.description?.message}
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                rows={4}
                {...register('description')}
              />
            </div>

            <div className="col-span-5">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    options={options}
                    placeholder="Selecione"
                    label="Categoria"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 items-center gap-3">
            <Button type="button" variant="outline">
              Cancelar
            </Button>

            <Button type="submit">Salvar e publicar</Button>
          </div>
        </div>
      </form>
    </main>
  )
}
