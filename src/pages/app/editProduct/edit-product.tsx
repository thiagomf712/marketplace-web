import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { apiChangeStatusProduct } from '@/api/change-status-product'
import { apiGetProductById } from '@/api/get-product-by-id'
import { Product, ProductStatus } from '@/api/get-products-seller'
import {
  ArrowLeft02Icon,
  Tick02Icon,
  UnavailableIcon,
} from '@/assets/icons/huge-icons'
import { Spinner } from '@/components/spinner'
import { queryClient } from '@/lib/react-query'

import { EditProductForm } from './edit-product-form'

export function EditProductPage() {
  const params = useParams<{ productId: string }>()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.productId],
    queryFn: () => apiGetProductById(params.productId ?? ''),
  })

  const { mutateAsync: changeStatusProduct, isPending: isChangingStatus } =
    useMutation({
      mutationFn: apiChangeStatusProduct,
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

        queryClient.setQueryData<Product>(['product', data.id], () => data)

        return { cached }
      },
      onError(error) {
        if (isAxiosError(error)) {
          switch (error.response?.status) {
            case 404:
              return toast.error('Produto não encontrado')
            case 403:
              return toast.error(
                'Voce não é o dono deste produto ou o produto já está com o status solicitado',
              )
          }
        }

        toast.error('Erro ao tentar atualizar o produto')
      },
    })

  async function handleChangeStatus(status: ProductStatus) {
    if (
      product == null ||
      product.status === status ||
      product.status !== 'available'
    ) {
      return
    }

    await changeStatusProduct({
      id: product.id,
      status,
    })
  }

  return (
    <main>
      <header className="mb-10 flex w-full items-end justify-between gap-6">
        <div>
          <Link
            to="/products"
            className="group mb-2 flex items-center gap-2 text-action-sm font-medium text-orange-base hover:text-orange-dark"
          >
            <ArrowLeft02Icon className="size-5 text-orange-base group-hover:text-orange-dark" />
            Voltar
          </Link>

          <h2 className="mb-2 font-bold text-title-md text-gray-500">
            Editar produto
          </h2>

          <p className="text-body-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="group flex items-center gap-2 text-action-sm font-medium text-orange-base hover:enabled:text-orange-dark disabled:cursor-not-allowed"
            disabled={product?.status !== 'available' || isChangingStatus}
            onClick={() => handleChangeStatus('sold')}
          >
            <Tick02Icon className="size-5 text-orange-base group-hover:enabled:text-orange-dark" />
            Marcar como vendido
          </button>

          <button
            type="button"
            className="group flex items-center gap-2 text-action-sm font-medium text-orange-base hover:enabled:text-orange-dark disabled:cursor-not-allowed"
            disabled={product?.status !== 'available' || isChangingStatus}
            onClick={() => handleChangeStatus('cancelled')}
          >
            <UnavailableIcon className="size-5 text-orange-base group-hover:enabled:text-orange-dark" />
            Desativar anúncio
          </button>
        </div>
      </header>

      {isLoading && <Spinner />}

      {product && (
        <EditProductForm
          product={{
            ...product,
            image: product.attachments[0],
            value: product.priceInCents,
          }}
        />
      )}
    </main>
  )
}
