import { type ReactNode, createContext, useContext, useState, useMemo, } from 'react'
import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next";
import type { AuthContextType, loginType } from '@/types/user'
import { authSessionKey } from '@/common/constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [session, setSession] = useState(getCookie(authSessionKey) ? JSON.parse(getCookie(authSessionKey) ?? '{}') : undefined)

  const saveSession = (user: loginType) => {
    setCookie(authSessionKey, JSON.stringify(user));
    setSession(user);
  }

  const removeSession = () => {
    if (session) {
      deleteCookie(authSessionKey);
      setSession(undefined);
    }
  }

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          session,
          isAuthenticated: hasCookie(authSessionKey),
          saveSession,
          removeSession,
        }), [session]
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}
