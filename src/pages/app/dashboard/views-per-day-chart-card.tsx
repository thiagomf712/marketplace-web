import { useQuery } from '@tanstack/react-query'
import { addDays, format } from 'date-fns'
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

import { apiGetMetricsViewsPerDay } from '@/api/metrics-views-per-day'
import { Calendar04Icon, UserMultipleIcon } from '@/assets/icons/huge-icons'
import { Spinner } from '@/components/spinner'

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
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

export function ViewsPerDayChartCard() {
  const { data: viewsPerDay } = useQuery({
    queryKey: ['metrics-views-per-day'],
    queryFn: () => apiGetMetricsViewsPerDay(),
  })

  const today = format(new Date(), "dd 'de' MMMM", { locale: ptBR })

  const startDate = format(addDays(new Date(), -30), "dd 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <div className="flex-1 rounded-2.5xl bg-white p-6 pb-5">
      <header className="mb-7 flex items-center justify-between">
        <h3 className="font-bold text-title-sm text-gray-500">Visitantes</h3>

        <div className="flex items-center gap-2">
          <Calendar04Icon className="size-4 text-blue-dark" />

          <p className="text-label-sm font-medium text-gray-300">
            {startDate} - {today}
          </p>
        </div>
      </header>

      {viewsPerDay ? (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={viewsPerDay.viewsPerDay} style={{ fontSize: 12 }}>
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
              dataKey="amount"
            />

            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
