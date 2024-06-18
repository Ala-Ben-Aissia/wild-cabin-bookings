import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckOut() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkOut, isPending } = useMutation({
    // mtationFn can only receive one argument
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ active: true })
      // this will invalidate all the active queries of the page
      toast.success(`Booking #${data.id} successfully checked out`)
      navigate(`/`)
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  return { checkOut, isCheckingOut: isPending }
}
