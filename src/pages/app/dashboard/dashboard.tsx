import { Helmet } from 'react-helmet-async'

import { ProductAvailableCard } from './product-available-card'
import { ProductSoldCard } from './product-sold-card'
import { ViewsPerDayChartCard } from './views-per-day-chart-card'
import { ViewsReceivedCard } from './views-received-card'

export function DashboardPage() {
  return (
    <main>
      <Helmet title="Dashboard" />

      <header className="mb-10">
        <h2 className="mb-2 font-bold text-title-md text-gray-500">
          Últimos 30 dias
        </h2>

        <p className="text-body-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </header>

      <div className="flex gap-6">
        <div className="flex max-w-[240px] flex-col gap-4">
          <ProductSoldCard />

          <ProductAvailableCard />

          <ViewsReceivedCard />
        </div>

        <ViewsPerDayChartCard />
      </div>
    </main>
  )
}
