import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { SaleTag02Icon, Search01Icon } from '@/assets/icons/huge-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

const productsFilterSchema = z.object({
  search: z.string(),
  status: z.string(),
})

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>

const options: Array<{ label: string; value: string }> = [
  { label: 'Todos status', value: 'all' },
  { label: 'Anunciado', value: 'advised' },
  { label: 'Vendido', value: 'sold' },
  { label: 'Cancelado', value: 'cancelled' },
]

export function ProductsFilter() {
  const { register, handleSubmit, control } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
  })

  function handleSearch(data: ProductsFilterSchema) {
    console.log(data)
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
          name="search"
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
