import { useParams } from 'react-router-dom'
import { getBooking } from '../../services/apiBookings'
import { useQuery } from '@tanstack/react-query'

export function useBooking() {
  const { bookingId } = useParams()

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // 3 => retry 3 times in case it fails at the beginning.
    // retry: false => not finding the booking data means it doesn't even exist.
    // => No point in retrying
  })

  return { booking, isLoading }
}
