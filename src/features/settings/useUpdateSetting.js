import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting as updateSettingAPI } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export function useUpdateSetting() {
  const queryClient = useQueryClient()
  const { isPending, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'settings' })
      toast.success('Setting successfully updated')
    },
    onError: (error) => toast.error(error.message),
  })
  return { isPending, updateSetting }
}
