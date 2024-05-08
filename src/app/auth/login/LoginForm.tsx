
import { Link } from 'react-router-dom'
import { LuCopy, LuLock, LuMail, LuShield, LuUser } from 'react-icons/lu'
import useLogin from './useLogin'
import { PasswordFormInput, TextFormInput } from '@/components'

const LoginForm = () => {
  const { loading, login, control } = useLogin()

  return (
    <>
      <form onSubmit={login}>
        <TextFormInput name="username" control={control} type="email" className='bg-white' placeholder="Enter your email" label="Email" containerClassName="mb-6" fullWidth />

        <PasswordFormInput
          name="password"
          control={control}
          label="Password"
          labelClassName="block text-sm font-medium text-default-900 mb-2"
          containerClassName="mb-1"
          fullWidth
        />

        <Link to="/auth/forgot-password" className="float-right text-end text-sm text-default-600 underline">
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"
          disabled={loading}
        >
          Log In
        </button>
      </form>
    </>
  )
}

export default LoginForm
