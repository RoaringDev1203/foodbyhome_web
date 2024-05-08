import { Link } from 'react-router-dom'

import ForgotPasswordForm from './ForgotPasswordForm'
import { AuthFormLayout, PageTitle } from '@/components'


const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Back to{' '}
    <Link to="/auth/login" className="ms-1 text-primary">
      <span className="font-medium">Login</span>
    </Link>
  </p>
)

const RecoverPassword = () => {
  return (
    <AuthFormLayout
      authTitle="Forgot Password"
      helpText="Enter your email address and we'll send you an email with instructions to reset your password."
      bottomLink={<BottomLink />}
    >
      <PageTitle title='Recover Password' />
      <ForgotPasswordForm />
    </AuthFormLayout>
  )
}

export default RecoverPassword
