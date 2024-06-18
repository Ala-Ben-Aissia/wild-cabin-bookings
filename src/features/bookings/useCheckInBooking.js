import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckIn() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkIn, isPending } = useMutation({
    // mtationFn can only receive one argument
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ active: true })
      // this will invalidate all the active queries of the page
      toast.success(`Booking #${data.id} successfully checked in`)
      navigate(`/`)
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  return { checkIn, isCheckingIn: isPending }
}
