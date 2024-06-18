import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCurrentUser } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (/*user*/) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('User has been successfully updated!')
      // if the image didn't immediately update, we can set it manually (into the React-Query cache) by doing:'
      // queryClient.setQueryData(['user'], user)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { updateUser, isUpdating }
}
