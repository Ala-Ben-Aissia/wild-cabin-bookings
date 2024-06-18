import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { signUp as signUpAPI } from '../../services/apiAuth'

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpAPI,
    onSuccess() {
      toast.success(
        'Account successfully created! Please check your email inbox for verification.',
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { signUp, isPending }
}
