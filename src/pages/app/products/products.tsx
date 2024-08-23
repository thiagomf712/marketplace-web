import { ProductsCard } from './products-card'
import { ProductsFilter } from './products-filter'

export function ProductsPage() {
  return (
    <main>
      <header className="mb-10">
        <h2 className="mb-2 font-bold text-title-md text-gray-500">
          Seus produtos
        </h2>

        <p className="text-body-sm text-gray-300">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </header>

      <div className="relative grid grid-cols-[330px_1fr] items-start gap-6">
        <div className="sticky top-4 rounded-2.5xl bg-white p-6">
          <ProductsFilter />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductsCard
              key={index}
              product={{
                category: 'móvel',
                description:
                  'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
                img: 'https://github.com/thiagomf712.png',
                status: 'advised',
                title: 'Sofá',
                value: 120090,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
