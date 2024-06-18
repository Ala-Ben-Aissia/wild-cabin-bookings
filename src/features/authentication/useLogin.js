import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginAPI } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      loginAPI({ email, password }),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.setQueryData(['user'], data.user)
      // manually set the logged in user data into the React Query cache
      navigate('/dashboard', { replace: true })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { login, isLoggingIn: isPending }
}
