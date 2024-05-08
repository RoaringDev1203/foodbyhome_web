import { Suspense, type ReactNode } from 'react'
import { Footer, FooterLinks, Navbar, Preloader } from '@/components'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <Suspense>
        <Navbar />
      </Suspense>

      <Suspense fallback={<Preloader />}>
        {children}
      </Suspense>

      <Suspense>
        <FooterLinks />
      </Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  )
}

export default ClientLayout
