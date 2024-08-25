import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { ProductStatus } from '@/api/get-products-seller'
import { SaleTag02Icon, Search01Icon } from '@/assets/icons/huge-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

const productsFilterSchema = z.object({
  search: z.string(),
  status: z.string(),
})

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>

const options: Array<{ label: string; value: ProductStatus | 'all' }> = [
  { label: 'Todos status', value: 'all' },
  { label: 'Anunciado', value: 'available' },
  { label: 'Vendido', value: 'sold' },
  { label: 'Cancelado', value: 'cancelled' },
]

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const { register, handleSubmit, control } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
    defaultValues: {
      search: search || '',
      status: status || 'all',
    },
  })

  function handleSearch(data: ProductsFilterSchema) {
    setSearchParams((state) => {
      state.set('search', data.search)
      state.set('status', data.status)

      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <h3 className="mb-6 font-bold text-title-sm text-gray-300">Filtro</h3>

      <div className="mb-10 grid gap-5">
        <Input
          {...register('search')}
          placeholder="Pesquisar"
          Icon={Search01Icon}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              options={options}
              Icon={SaleTag02Icon}
              placeholder="Status"
              defaultValue={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Aplicar filtro
      </Button>
    </form>
  )
}
