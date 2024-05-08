
import { Link } from 'react-router-dom'
import { AuthFormLayout, PageTitle } from '@/components'
import ResetPasswordForm from './ResetPasswordForm'

const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Back to{' '}
    <Link to="/auth/login" className="ms-1 text-primary">
      <span className="font-medium">Login</span>
    </Link>
  </p>
)

const ResetPassword = () => {
  return (
    <AuthFormLayout authTitle="Reset Password" helpText="Create a new strong password" bottomLink={<BottomLink />} hasThirdPartyAuth>
      <PageTitle title='Reset Password' />
      <ResetPasswordForm />
    </AuthFormLayout>
  )
}

export default ResetPassword
