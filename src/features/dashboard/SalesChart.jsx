import {
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from 'date-fns'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import { useDarkMode } from '../../context/useDarkMode'
import Heading from '../../ui/Heading'
import DashboardBox from './DashboardBox'

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

export default function SalesChart({ bookings, numDays }) {
  const [isDarkMode] = useDarkMode()

  const days = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })

  const data = days.map((day) => ({
    label: format(day, 'MMM dd'),
    totalSales: bookings
      .filter((booking) =>
        isSameDay(new Date(booking.createdAt), day),
      )
      .reduce((acc, booking) => acc + booking.totalPrice, 0),
    extrasSales: bookings
      .filter((booking) =>
        isSameDay(new Date(booking.createdAt), day),
      )
      .reduce((acc, booking) => acc + booking.extrasPrice, 0),
  }))

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      }

  return (
    <StyledSalesChart>
      <Heading as="h2" style={{ display: 'flex' }}>
        Sales
        <span
          style={{
            display: 'flex',
            margin: 'auto',
          }}
        >
          {format(days.at(1), 'dd MMM yyyy')} &mdash;
          {format(days.at(-1), 'dd MMM yyyy')}
        </span>
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            dataKey="totalSales"
            unit=" $"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit=" $"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras"
            unit=" $"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}
