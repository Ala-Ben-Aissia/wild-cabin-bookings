import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import { useCabins } from '../cabins/useCabins'
import DurationChart from './DurationChart'
import SalesChart from './SalesChart'
import Stats from './Stats'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import TodayActivities from '../check-in-out/TodayActivities'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`
export default function DashboardLayout() {
  const { recentBookings, isLoading: isLoadingBookings } =
    useRecentBookings()
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays()

  const { cabins, isLoading: isLoadingCabins } = useCabins()

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />

  const numCabins = cabins.length

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        stays={stays}
        numDays={numDays}
        numCabins={numCabins}
      />
      <TodayActivities />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
