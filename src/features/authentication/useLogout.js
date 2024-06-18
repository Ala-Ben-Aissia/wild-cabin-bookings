import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutAPI } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isPending: isLogginOut, mutate: logout } = useMutation({
    mutationFn: logoutAPI,
    onSuccess() {
      queryClient.removeQueries()
      // make sure that the set user is deleted from the cache (setQueriesData)
      navigate('/login', { replace: true })
    },
  })
  return { logout, isLogginOut }
}
