import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUpdateCabin as createUpdateCabinAPI } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateUpdateCabin(cabin) {
  const quertClient = useQueryClient()
  const isEditing = Boolean(cabin)
  const { isPending, mutate: createUpdateCabin } = useMutation({
    mutationFn: createUpdateCabinAPI,
    onSuccess: () => {
      quertClient.invalidateQueries({ queryKey: ['cabins'] })
      const toastMsg = `Cabin successfully ${
        isEditing ? 'updated!' : 'created!'
      }`
      toast.success(toastMsg)
      // for a better ux display the toast after queries invalidation
      // refetch => re-render <CabinTable /> as well as its child <CabinRow /> (useQuery state has changed)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isPending, createUpdateCabin }
}
