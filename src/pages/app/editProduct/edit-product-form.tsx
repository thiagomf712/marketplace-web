import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiGetCategories } from '@/api/get-categories'
import { Product, ProductStatus } from '@/api/get-products-seller'
import { apiUpdateProduct } from '@/api/update-product'
import { apiUploadAttachments } from '@/api/upload-attachments'
import { Button } from '@/components/button'
import { FileUploadInput } from '@/components/file-upload'
import { Input } from '@/components/input'
import { ProductStatusLabel } from '@/components/product-status-label'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { queryClient } from '@/lib/react-query'

const productSchema = z.object({
  image: z
    .custom<FileList>()
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

type ProductSchema = z.infer<typeof productSchema>

export interface EditProductFormProps {
  product: {
    id: string
    title: string
    description: string
    value: number
    category: {
      id: string
      title: string
    }
    image?: { id: string; url: string }
    status: ProductStatus
  }
}

export function EditProductForm({ product }: EditProductFormProps) {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiGetCategories(),
  })

  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useMutation({
      mutationFn: apiUpdateProduct,
      onSuccess(data) {
        toast.success('Produto atualizado com sucesso')

        const cached = queryClient.getQueryData<Product[]>(['products'])

        if (cached != null) {
          queryClient.setQueryData<Product[]>(
            ['products'],
            cached.map((product) => {
              if (product.id === data.id) {
                return data
              }

              return product
            }),
          )
        }

        return { cached }
      },
      onError(error) {
        if (isAxiosError(error)) {
          switch (error.response?.status) {
            case 404:
              return toast.error('Produto não encontrado')
            case 403:
              return toast.error('Voce não é o dono deste produto')
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

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      value: (product.value / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      description: product.description,
      category: product.category.id,
    },
    disabled: product.status === 'sold' || product.status === 'cancelled',
  })

  const imgFile = watch('image')

  const disableForm =
    product.status === 'sold' || product.status === 'cancelled'

  async function handleUpdateProduct(data: ProductSchema) {
    try {
      const imagesIds: string[] = []

      if (data.image[0]) {
        const image = await uploadImage({ file: data.image })

        imagesIds.push(image.id)
      } else if (product.image) {
        imagesIds.push(product.image.id)
      }

      await updateProduct({
        attachmentsIds: imagesIds,
        categoryId: data.category,
        description: data.description,
        priceInCents: Number(data.value),
        productId: product.id,
        title: data.title,
      })
    } catch (error) {}
  }

  const options = categories?.map<{ label: string; value: string }>(
    (category) => ({
      label: category.title,
      value: category.id,
    }),
  )

  console.log(disableForm, product.status)

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProduct)}
      className="grid grid-cols-[min-content_1fr] items-start gap-6"
    >
      <FileUploadInput
        error={errors.image?.message}
        previewFile={imgFile}
        accept="image/*"
        size="lg"
        label="Selecione a imagem do produto"
        previewUrl={product.image?.url}
        {...register('image')}
      />

      <div className="rounded-2.5xl bg-white p-8">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-bold text-title-sm text-gray-300">
            Dados do produto
          </h3>

          <ProductStatusLabel productStatus={product.status} />
        </div>

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
              defaultValue={(120090 / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              onChange={(e) => {
                const newValueNumber = Number(e.target.value.replace(/\D/g, ''))

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
            {options && (
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
            )}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 items-center gap-3">
          <Button type="button" variant="outline" asChild>
            <Link to="/products">Cancelar</Link>
          </Button>

          <Button
            type="submit"
            disabled={disableForm || isUpdatingProduct || isUploadingImage}
          >
            Salvar e atualizar
          </Button>
        </div>
      </div>
    </form>
  )
}
