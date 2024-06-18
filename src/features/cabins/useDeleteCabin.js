import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'

export function useDeleteCabin() {
  const queryClient = useQueryClient()
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      toast.success('Cabin has been deleted!')
      // invalidate and refetch query
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { isDeleting, deleteCabin }
}
