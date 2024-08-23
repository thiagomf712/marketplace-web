import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import {
  Calendar04Icon,
  SaleTag02Icon,
  Store04Icon,
  UserMultipleIcon,
} from '@/assets/icons/huge-icons'

interface SampleData {
  date: string
  visitors: number
}

const sampleData: SampleData[] = [
  { date: '2024-06-26T12:00:00', visitors: 150 },
  { date: '2024-06-28T12:00:00', visitors: 20 },
  { date: '2024-06-29T12:00:00', visitors: 50 },
  { date: '2024-07-01T12:00:00', visitors: 45 },
  { date: '2024-07-03T12:00:00', visitors: 100 },
  { date: '2024-07-05T12:00:00', visitors: 46 },
  { date: '2024-07-08T12:00:00', visitors: 150 },
  { date: '2024-07-10T12:00:00', visitors: 50 },
  { date: '2024-07-12T12:00:00', visitors: 150 },
  { date: '2024-07-15T12:00:00', visitors: 50 },
]

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
  console.log(payload, label, active)

  if (active) {
    return (
      <div className="rounded-lg bg-white p-3 shadow-md">
        <p className="mb-2 text-label-sm font-medium text-gray-400">
          {format(label, "dd 'de' MMMM", { locale: ptBR })}
        </p>

        <div className="flex items-center gap-2">
          <UserMultipleIcon className="size-4 text-gray-300" />
          <span className="text-body-xs text-gray-300">
            {payload?.[0].value} visitantes
          </span>
        </div>
      </div>
    )
  }

  return null
}

export function DashboardPage() {
  return (
    <main>
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
          <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
            <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
              <SaleTag02Icon className="size-10 text-blue-dark" />
            </div>

            <div>
              <p className="mb-2 font-bold text-title-lg text-gray-400">24</p>

              <h3 className="text-body-xs text-gray-300">Produtos vendidos</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
            <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
              <Store04Icon className="size-10 text-blue-dark" />
            </div>

            <div>
              <p className="mb-2 font-bold text-title-lg text-gray-400">56</p>

              <h3 className="text-body-xs text-gray-300">
                Produtos anunciados
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2.5xl bg-white p-3 pr-7">
            <div className="flex size-20 items-center justify-center rounded-xl bg-blue-light">
              <UserMultipleIcon className="size-10 text-gray-300" />
            </div>

            <div>
              <p className="mb-2 font-bold text-title-lg text-gray-400">
                1.238
              </p>

              <h3 className="text-body-xs text-gray-300">Pessoas visitantes</h3>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-2.5xl bg-white p-6 pb-5">
          <header className="mb-7 flex items-center justify-between">
            <h3 className="font-bold text-title-sm text-gray-500">
              Visitantes
            </h3>

            <div className="flex items-center gap-2">
              <Calendar04Icon className="size-4 text-blue-dark" />

              <p className="text-label-sm font-medium text-gray-300">
                26 de junho - 25 de julho
              </p>
            </div>
          </header>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sampleData} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickFormatter={(date: string) => format(date, 'dd')}
              />

              <YAxis stroke="#888" axisLine={false} tickLine={false} />

              <CartesianGrid
                vertical={false}
                className="text-gray-200"
                strokeDasharray="5 5"
              />

              <Line
                stroke="#5EC5FD"
                type="monotone"
                strokeWidth={2}
                dataKey="visitors"
              />

              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}
