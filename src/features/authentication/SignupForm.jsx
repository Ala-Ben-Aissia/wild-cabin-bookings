import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignUp } from './useSignUp'
import { useLogout } from './useLogout'

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm()
  const { errors } = formState
  const { signUp, isPending } = useSignUp()
  const { logout } = useLogout()

  function onSubmit(formData) {
    const { fullName, email, password } = formData
    signUp(
      { fullName, email, password },
      {
        onSuccess: logout,
        onError: reset,
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', {
            required: 'This field is required!',
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required!',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email!',
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
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
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
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
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isPending}
          onClick={reset}
          $variation="secondary"
          type="reset"
        >
          {/* without this reset handler, the reset type will only clear the input field but not the error messages */}
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
