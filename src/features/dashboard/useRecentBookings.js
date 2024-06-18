import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate as getBookingsAfterDateAPI } from '../../services/apiBookings'

export function useRecentBookings() {
  const [searchParams] = useSearchParams()

  const numDays = Number(searchParams.get('last')) || 7

  const subDate = subDays(new Date(), numDays).toISOString()

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ['bookings', `Bookings for the last ${numDays} days`],
    // aslo refetch bookings when numDays filter changes
    queryFn: () => getBookingsAfterDateAPI(subDate),
  })

  return { recentBookings, isLoading }
}
