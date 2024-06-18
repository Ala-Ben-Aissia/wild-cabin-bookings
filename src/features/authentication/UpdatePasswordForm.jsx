import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUpdateUser } from './useUpdateUser'

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm()
  const { errors } = formState

  const { updateUser, isUpdating } = useUpdateUser()

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New password" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required!',
            minLength: {
              value: 8,
              message:
                'Password should contain at least 8 characters',
            },
          })}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required!',
            validate: (passwordConfirm) =>
              passwordConfirm === getValues('password') ||
              'Passwords do not match!',
          })}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating} onClick={reset}>
          Update password
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
