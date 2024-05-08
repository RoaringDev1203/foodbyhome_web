import { Link } from 'react-router-dom'

import { AuthFormLayout, PageTitle } from '@/components'
import RegisterForm from './RegisterForm'

const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Already have an account ?{' '}
    <Link to="/auth/login" className="ms-1 text-primary">
      <span className="font-medium">Login</span>
    </Link>
  </p>
)

const Register = () => {
  return (
    <AuthFormLayout
      authTitle="Register"
      helpText="Don't have an account? Create your account, it takes less than a minute at Foodbyhome"
      bottomLink={<BottomLink />}
      hasThirdPartyAuth
    >
      <PageTitle title='Register' />
      <RegisterForm />
    </AuthFormLayout>
  )
}

export default Register
