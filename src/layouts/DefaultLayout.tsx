import { Suspense, type ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}

export default DefaultLayout