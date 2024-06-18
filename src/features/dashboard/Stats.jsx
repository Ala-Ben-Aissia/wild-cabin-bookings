import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
import Stat from './Stat'

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  numCabins,
}) {
  const numBookings = bookings.length
  const sales = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0,
  )
  const checkins = confirmedStays.length

  const checkedInNights = confirmedStays.reduce(
    (acc, stay) => acc + stay.numNights,
    0,
  )
  const availableNights = numDays * numCabins

  const occupancyRate = (
    (checkedInNights / availableNights) *
    100
  ).toFixed(1)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupancyRate} %`}
      />
    </>
  )
}
