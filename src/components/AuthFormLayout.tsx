import { Link } from 'react-router-dom'

import { type ReactNode } from 'react'

import { logoDarkImg, logoLightImg, googleIconImg, facebookIconImg } from '@/assets/data/images'

type AuthFormLayoutProps = {
  authTitle: string
  helpText?: string
  hasThirdPartyAuth?: boolean
  children: ReactNode
  bottomLink?: ReactNode
}

const AuthFormLayout = ({ authTitle, helpText, children, bottomLink, hasThirdPartyAuth }: AuthFormLayoutProps) => {
  return (
    <div className="flex items-center justify-center lg:max-w-lg">
      <div className="flex h-full flex-col">
        <div className="shrink">
          <div>
            <Link to="/" className="flex items-center">
              <img width={156} height={78} src={logoDarkImg} alt="logo" className="flex h-20 dark:hidden" />
              <img width={156} height={78} src={logoLightImg} alt="logo" className="hidden h-20 dark:flex" />
            </Link>
          </div>
          <div className="py-10">
            <h1 className="mb-2 text-3xl font-semibold text-default-800">{authTitle}</h1>
            <p className="max-w-md text-sm text-default-500">{helpText}</p>
          </div>

          {children}

          {hasThirdPartyAuth && (
            <div className="my-6 flex items-center justify-center gap-4">
              <img height={32} width={32} alt="social-login-google" src={googleIconImg} className="h-8 w-8" />
              <img height={32} width={32} alt="social-login-facebook" src={facebookIconImg} className="h-8 w-8" />
            </div>
          )}
        </div>

        {bottomLink && <div className="mt-16 flex grow items-end justify-center">{bottomLink}</div>}
      </div>
    </div>
  )
}

export default AuthFormLayout
