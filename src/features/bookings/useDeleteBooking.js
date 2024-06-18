import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings'

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteBooking } =
    useMutation({
      mutationFn: deleteBookingAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookings'] })
        toast.success('booking has been successfully deleted!')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  return { isDeleting, deleteBooking }
}
