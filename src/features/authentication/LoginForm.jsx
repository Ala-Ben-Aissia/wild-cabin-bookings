import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { useLogin } from './useLogin'
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoggingIn } = useLogin()

  function handleSubmit(event) {
    event.preventDefault()
    if (!email || !password) return
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          required
          disabled={isLoggingIn}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          required
          disabled={isLoggingIn}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
