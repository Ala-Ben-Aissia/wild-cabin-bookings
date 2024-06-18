import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'

export function useRecentStays() {
  const [searchParams] = useSearchParams()
  const numDays = Number(searchParams.get('last')) || 7
  const subDate = subDays(new Date(), numDays).toISOString()

  const { data: confirmedStays, isLoading } = useQuery({
    queryKey: ['stays', `Stays for the last ${numDays} days`],
    queryFn: () => getStaysAfterDate(subDate),
  })

  return { confirmedStays, isLoading, numDays }
}
