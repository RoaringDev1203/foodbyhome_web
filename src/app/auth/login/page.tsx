import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'
import { AuthFormLayout, PageTitle } from '@/components'

const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Don’t have an account ?{' '}
    <Link to="/auth/register" className="ms-1 text-primary">
      <span className="font-medium">Register</span>
    </Link>
  </p>
)

const Login = () => {
  return (
    <AuthFormLayout authTitle="Login" helpText="Enter your credentials to access Foodbyhome." bottomLink={<BottomLink />} hasThirdPartyAuth>
      <PageTitle title='Login' />
      <LoginForm />
    </AuthFormLayout>
  )
}

export default Login
