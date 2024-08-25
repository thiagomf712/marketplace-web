import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiCreateProduct } from '@/api/create-product'
import { apiGetCategories } from '@/api/get-categories'
import { Product } from '@/api/get-products-seller'
import { apiUploadAttachments } from '@/api/upload-attachments'
import { Button } from '@/components/button'
import { FileUploadInput } from '@/components/file-upload'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { queryClient } from '@/lib/react-query'

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

export function NewProductPage() {
  const navigate = useNavigate()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiGetCategories(),
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema),
  })

  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useMutation({
      mutationFn: apiCreateProduct,
      onSuccess(data) {
        toast.success('Produto criado com sucesso')

        queryClient.setQueryData<Product[]>(['products'], (cached) =>
          cached ? [data, ...cached] : [data],
        )

        navigate('/products')
      },
      onError(error) {
        if (isAxiosError(error)) {
          switch (error.response?.status) {
            case 404:
              return toast.error('Categoria ou imagem não encontrada')
          }
        }

        toast.error('Erro ao tentar atualizar o produto')
      },
    })

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useMutation(
    {
      mutationFn: apiUploadAttachments,
      onError() {
        toast.error('Erro ao tentar fazer upload da imagem')
      },
    },
  )

  const imgFile = watch('image')

  async function handleCreateProduct(data: NewProductSchema) {
    try {
      const image = await uploadImage({ file: data.image })

      await createProduct({
        attachmentsIds: [image.id],
        categoryId: data.category,
        description: data.description,
        priceInCents: Number(data.value),
        title: data.title,
      })
    } catch (error) {}
  }

  const options =
    categories?.map<{ label: string; value: string }>((category) => ({
      label: category.title,
      value: category.id,
    })) ?? []

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
            <Button type="button" variant="outline" asChild>
              <Link to="/products">Cancelar</Link>
            </Button>

            <Button
              type="submit"
              disabled={isCreatingProduct || isUploadingImage}
            >
              Salvar e publicar
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
