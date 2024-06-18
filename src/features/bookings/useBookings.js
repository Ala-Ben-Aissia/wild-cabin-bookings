import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

function useBookings() {
  const [searchParams] = useSearchParams()

  const queryClient = useQueryClient()

  // Filter
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue /*, method: ' eq | gte | lte...'*/,
        }

  // Sort
  const sort = searchParams.get('sortBy') ?? 'startDate-desc'
  const [sortField, order] = sort.split('-')

  const sortBy = !sort
    ? null
    : {
        field: sortField,
        order,
      }

  // Pagination
  const page = !searchParams.get('page')
    ? 1
    : +searchParams.get('page')

  const {
    data: { bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // seems like deps of useQuery
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  })

  const pageCount = Math.ceil(count / PAGE_SIZE)

  // Pre-Fetch
  // prepare page X+1 data at the page X

  if (page < pageCount) {
    // for a pageCount of 5, don't pre-fetch inexistent page 6
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () =>
        getAllBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () =>
        getAllBookings({
          filter,
          sortBy,
          page: page - 1,
        }),
    })
  }

  return { bookings, error, isLoading, count }
}

export default useBookings
