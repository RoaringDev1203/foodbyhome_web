
import { Link } from 'react-router-dom'
import { AuthFormLayout, PageTitle } from '@/components'
import { useAuthContext } from '@/context'

const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Kom venligst tilbage og
    <Link to="/auth/login" className="ms-1 text-primary">
      <span className="font-medium">Login</span>
    </Link>
  </p>
)

const Logout = () => {
  const { removeSession } = useAuthContext()

  removeSession()

  return (
    <AuthFormLayout
      authTitle="Log ud"
      helpText="Vi er kede af at se dig gå, kom venligst snart tilbage. 😢"
      bottomLink={<BottomLink />}
    >
      <PageTitle title='Log ud' />
      <div></div>
    </AuthFormLayout>
  )
}

export default Logout
